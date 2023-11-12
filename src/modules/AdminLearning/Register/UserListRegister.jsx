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
      title: "Họ tên",
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
      title: "Tài khoản",
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
      title: "Bí danh",
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
      title: "Họ tên",
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
      title: "Tài khoản",
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
      title: "Bí danh",
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
      title: "Hủy ghi danh",
      dataIndex: "huyGhiDanh",
      render: (text, user) => {
        return (
          <>
            <NavLink
              onClick={() => {
                if (
                  window.confirm(
                    "Bạn có chắc muốn hủy " + user.hoTen + " khỏi khóa học này?"
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
              className="bg-red-700 text-white p-2 rounded"
            >
              <DeleteOutlined />
            </NavLink>
          </>
        );
      },
    },
  ];

  const columns3 = [
    {
      title: "Họ tên",
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
      title: "Tài khoản",
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
      title: "Bí danh",
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
      title: "Ghi danh",
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
              className="bg-black text-white mr-2 p-2 rounded"
            >
              <EditOutlined />
            </NavLink>
          </>
        );
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: `Chưa ghi danh`,
      children: (
        <Table
          className="mt-4 mb-8"
          columns={columns1}
          dataSource={userNotRegister}
          pagination={false}
        />
      ),
    },
    {
      key: "2",
      label: `Đã ghi danh`,
      children: (
        <Table
          className="mt-4 mb-8"
          columns={columns2}
          dataSource={userRegistered}
          pagination={false}
        />
      ),
    },
    {
      key: "3",
      label: `Chờ xét duyệt`,
      children: (
        <Table
          className="mt-4 mb-8"
          columns={columns3}
          dataSource={userApprove}
          pagination={false}
        />
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl py-8">Danh sách người dùng dựa vào khóa học</h1>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default UserListRegister;
