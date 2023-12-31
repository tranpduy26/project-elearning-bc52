import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  cancelCourseRegisterAction,
  confirmUserRegisterCourseAction,
  fetchUserListApproveAction,
  fetchUserListNotRegisterAction,
  fetchUserListRegisteredAction,
} from "./redux/actions";

const UserListRegister = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { userNotRegister } = useSelector((state) => state.registerReducer);
  const { userRegistered } = useSelector((state) => state.registerReducer);
  const { userApprove } = useSelector((state) => state.registerReducer);

  useEffect(() => {
    dispatch(fetchUserListNotRegisterAction({ maKhoaHoc: id }));
    dispatch(fetchUserListRegisteredAction({ maKhoaHoc: id }));
    dispatch(fetchUserListApproveAction({ maKhoaHoc: id }));
  }, []);

  const onChange = (key) => {};

  const columns1 = [
    {
      title: "Full name",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
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
      title: "Full name",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
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
    {
      title: "Cancel registration",
      dataIndex: "huyGhiDanh",
      render: (text, user) => {
        return (
          <>
            <NavLink
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to cancel " +
                      user.hoTen +
                      " from this course?"
                  )
                ) {
                  dispatch(
                    cancelCourseRegisterAction({
                      maKhoaHoc: id,
                      taiKhoan: user.taiKhoan,
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
      title: "Full name",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: "Account",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
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
    {
      title: "Register",
      dataIndex: "ghiDanh",
      render: (text, user) => {
        return (
          <>
            <NavLink
              onClick={() => {
                dispatch(
                  confirmUserRegisterCourseAction({
                    maKhoaHoc: id,
                    taiKhoan: user.taiKhoan,
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
          dataSource={userNotRegister}
          pagination={true}
        />
      ),
    },
    {
      key: "2",
      label: `Enrolled`,
      children: (
        <Table
          className="mt-4 mb-8 text-white"
          columns={columns2}
          dataSource={userRegistered}
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
          dataSource={userApprove}
          pagination={true}
        />
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl py-3 px-3 text-white">
        List of users based on course
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

export default UserListRegister;
