import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  getCourses,
  deleteCourse,
  updateCourse,
} from "../../../../apis/CourseAPI";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterOutlined } from "@ant-design/icons";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";

export default function CourseList() {
  // Snackbar
  const { enqueueSnackbar } = useSnackbar();
  const handleSnackbar = (message, variant) => () => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  // List of courses
  const [users, setUsers] = useState([]);
  const queryClient = useQueryClient();

  const {
    data: listCourse = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getCourses,
    refetchOnWindowFocus: false,
  });
  console.log(listCourse);

  // Pagination
  const [currentPage, setCurentPage] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleChangePage = (evt, newPage) => {
    setCurentPage(newPage);
  };

  const handleChangeItemsPerPage = (evt) => {
    setCurentPage(evt.target.value);
    setCurentPage(0);
  };

  // Delete user
  const { mutate: handleDeleteCourse } = useMutation({
    mutationFn: (idCourse) => deleteCourse(idCourse),
    onSuccess: () => {
      handleSnackbar("Delete the Success course!", "success")();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      handleSnackbar("Delete failed course!", "error")();
    },
  });

  // Update user
  const navigate = useNavigate();

  const handleUpdateCourse = (courseId) => {
    navigate(`/admin/update-course/${courseId}`);
  };

  // Search user
  const [searchCourse, setSearchCourse] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = (evt) => {
    setSearchCourse(evt.target.value);
  };

  useEffect(() => {
    return () =>
      clearTimeout(
        setTimeout(() => {
          setUserData(searchCourse);
        }, 300)
      );
  }, [searchCourse]);

  return (
    <div>
      <div style={{ margin: "0 0 0 10px" }}>
        <SearchIcon
          sx={{
            color: "white",
            marginLeft: 2,
            marginRight: 1,
            fontSize: "30px",
          }}
        />
        <InputBase
          sx={{
            color: "black",
            backgroundColor: "white",
            marginTop: 2,
            width: "50vh",
            borderRadius: 2,
          }}
          onChange={handleSearch}
          value={searchCourse}
          placeholder="Search for courses..."
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <h1 className="text-white py-2 text-center">Course List</h1>

      <Paper
        sx={{
          width: "98%",
          overflow: "hidden",
          marginLeft: 2,
          borderRadius: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID Course</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell style={{ textAlign: "center" }}>Image</TableCell>
                <TableCell>Date Created</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Describe</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCourse
                .filter((value) => {
                  return searchCourse.toLowerCase() === ""
                    ? value
                    : value.tenKhoaHoc.toLowerCase().includes(searchCourse);
                })
                .slice(
                  currentPage * itemsPerPage,
                  currentPage * itemsPerPage + itemsPerPage
                )
                .map((course, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={course.maKhoaHoc}
                  >
                    <TableCell>{course.maKhoaHoc}</TableCell>
                    <TableCell>{course.tenKhoaHoc}</TableCell>
                    <TableCell>
                      <div>
                        <img
                          className="rounded"
                          width={150}
                          height={150}
                          src={course.hinhAnh}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{course.ngayTao}</TableCell>
                    <TableCell>
                      <div>
                        <b>Account: </b>
                        {course.nguoiTao?.taiKhoan}
                      </div>
                      <div>
                        <b>Name: </b> {course.nguoiTao?.hoTen}
                      </div>
                    </TableCell>
                    <TableCell>{course.moTa}</TableCell>
                    <TableCell>
                      {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleUpdateCourse(course.maKhoaHoc)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteCourse(course.maKhoaHoc)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <NavLink
                        to={`/admin/register/user-list/${course.taiKhoan}`}
                        className="bg-black text-white ml-2 p-2 rounded"
                      >
                        <FilterOutlined />
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeItemsPerPage}
          component="div"
          count={listCourse.length}
          rowsPerPage={itemsPerPage}
          page={currentPage}
        />
      </Paper>
    </div>
  );
}