import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Table, Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  cancelCourseRegisterAction,
  confirmUserRegisterCourseAction,
  fetchCourseListApprovedAction,
  fetchCourseListNotRegisterAction,
  fetchCourseListWaitApproveAction,
} from "./redux/actions";

const CourseListRegister = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { courseNotRegister } = useSelector((state) => state.registerReducer);
  const { courseApproved } = useSelector((state) => state.registerReducer);
  const { courseWaitApprove } = useSelector((state) => state.registerReducer);
  console.log(courseWaitApprove);

  useEffect(() => {
    dispatch(fetchCourseListNotRegisterAction(id));
    dispatch(fetchCourseListApprovedAction({ taiKhoan: id }));
    dispatch(fetchCourseListWaitApproveAction({ taiKhoan: id }));
  }, []);

  const onChange = (key) => {};

  const columns1 = [
    {
      title: "CourseID",
      dataIndex: "maKhoaHoc",
      sorter: (a, b) => {
        let maKhoaHocA = a.maKhoaHoc.toLowerCase().trim();
        let maKhoaHocB = b.maKhoaHoc.toLowerCase().trim();
        if (maKhoaHocA > maKhoaHocB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Course name",
      dataIndex: "tenKhoaHoc",
      sorter: (a, b) => {
        let tenKhoaHocA = a.tenKhoaHoc.toLowerCase().trim();
        let tenKhoaHocB = b.tenKhoaHoc.toLowerCase().trim();
        if (tenKhoaHocA > tenKhoaHocB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Aliases",
      dataIndex: "biDanh",
      sorter: (a, b) => {
        let biDanhA = a.biDanh.toLowerCase().trim();
        let biDanhB = b.biDanh.toLowerCase().trim();
        if (biDanhA > biDanhB) {
          return 1;
        }
        return -1;
      },
    },
  ];

  const columns2 = [
    {
      title: "CourseID",
      dataIndex: "maKhoaHoc",
      sorter: (a, b) => {
        let maKhoaHocA = a.maKhoaHoc.toLowerCase().trim();
        let maKhoaHocB = b.maKhoaHoc.toLowerCase().trim();
        if (maKhoaHocA > maKhoaHocB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Course name",
      dataIndex: "tenKhoaHoc",
      sorter: (a, b) => {
        let tenKhoaHocA = a.tenKhoaHoc.toLowerCase().trim();
        let tenKhoaHocB = b.tenKhoaHoc.toLowerCase().trim();
        if (tenKhoaHocA > tenKhoaHocB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Cancel registration",
      dataIndex: "huyDangKy",
      render: (text, course) => {
        return (
          <>
            <NavLink
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this " +
                      course.tenKhoaHoc +
                      " course?"
                  )
                ) {
                  dispatch(
                    cancelCourseRegisterAction({
                      maKhoaHoc: course.maKhoaHoc,
                      taiKhoan: id,
                    })
                  );
                }
              }}
            >
              <DeleteOutlined
                style={{
                  color: "white",
                  backgroundColor: "red",
                  padding: "10px",
                  borderRadius: "25%",
                  fontSize: "18px",
                }}
              />
            </NavLink>
          </>
        );
      },
    },
  ];

  const columns3 = [
    {
      title: "CourseID",
      dataIndex: "maKhoaHoc",
      sorter: (a, b) => {
        let maKhoaHocA = a.maKhoaHoc.toLowerCase().trim();
        let maKhoaHocB = b.maKhoaHoc.toLowerCase().trim();
        if (maKhoaHocA > maKhoaHocB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Course name",
      dataIndex: "tenKhoaHoc",
      sorter: (a, b) => {
        let tenKhoaHocA = a.tenKhoaHoc.toLowerCase().trim();
        let tenKhoaHocB = b.tenKhoaHoc.toLowerCase().trim();
        if (tenKhoaHocA > tenKhoaHocB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Enroll in the course",
      dataIndex: "ghiDanh",
      render: (text, course) => {
        return (
          <>
            <NavLink
              onClick={() => {
                dispatch(
                  confirmUserRegisterCourseAction({
                    maKhoaHoc: course.maKhoaHoc,
                    taiKhoan: id,
                  })
                );
              }}
            >
              <EditOutlined
                style={{
                  color: "white",
                  backgroundColor: "blue",
                  padding: "10px",
                  borderRadius: "25%",
                  fontSize: "18px",
                }}
              />
            </NavLink>
          </>
        );
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: `Not registered`,
      children: (
        <Table
          className="mt-4 mb-8"
          columns={columns1}
          dataSource={courseNotRegister}
          pagination={true}
        />
      ),
    },
    {
      key: "2",
      label: `Enrolled`,
      children: (
        <Table
          className="mt-4 mb-8"
          columns={columns2}
          dataSource={courseApproved}
          pagination={true}
        />
      ),
    },
    {
      key: "3",
      label: `Waiting for review`,
      children: (
        <Table
          className="mt-4 mb-8"
          columns={columns3}
          dataSource={courseWaitApprove}
          pagination={true}
        />
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl py-3 px-3 text-white">
        List of enrolled courses
      </h1>
      <Tabs
        style={{ margin: "0 15px 0 15px", overflow: "hidden" }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default CourseListRegister;
