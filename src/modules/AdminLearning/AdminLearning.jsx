import React, { useEffect, useState } from "react";

import {
  Grid,
  List,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import style from "./adminStyle.module.css";
import { useUserContext } from "../../contexts/UserContext/UserContext";

export default function AdminLearning() {
  const [openUser, setOpenUser] = useState(true);

  const handleClickUser = () => {
    setOpenUser(!openUser);
  };
  const [openMovie, setOpenMovie] = useState(true);

  const handleClickMovie = () => {
    setOpenMovie(!openMovie);
  };
  //Outlet
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    if (location.pathname !== "/admin") {
      setShowWelcome(false);
    }
  }, [location.pathname]);

  const { currentUser, handleSignout } = useUserContext();
  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      <div
        style={{
          display: "flex",
          backgroundColor: "#003366",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px 0 10px",
          height: "6vh",
        }}
      >
        <img
          src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
          alt="Logo"
          style={{ width: "180px" }}
        />
        <div style={{ textAlign: "center" }}>
          <span className={style.header_signin}>
            <a href="">
              <AccountBoxIcon />
              {currentUser.hoTen}
            </a>{" "}
            |
            <a href="/log-in-admin" onClick={handleSignout}>
              <LogoutIcon />
              Log out
            </a>
          </span>
        </div>
      </div>
      <Grid container>
        <Grid item xs={2}>
          <List
            sx={{
              width: "100%",
              maxWidth: 2900,
              bgcolor: "#003366",
              height: "100vh",
              color: "#fff",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <div className={style.headerAdmin}>
              <a href="/admin">
                <h1 style={{ textAlign: "center" }}>ADMIN</h1>
              </a>
              <a href="/">
                <p style={{ textAlign: "center" }}>Return to the Home page</p>
              </a>
            </div>
            <hr />
            <ListItemButton onClick={handleClickUser}>
              <ListItemIcon>
                <PersonIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="User" />
              {openUser ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="users-list"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="List of users" />
                  </ListItemButton>
                </Link>
                <Link
                  to="add-user"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Add user" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            <hr />
            <ListItemButton onClick={handleClickMovie}>
              <ListItemIcon>
                <LocalMoviesIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Courses" />
              {openMovie ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openMovie} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="courses-list"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Course List" />
                  </ListItemButton>
                </Link>
                <Link
                  to="add-course"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Add course" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </List>
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            backgroundImage: `url("https://img.freepik.com/premium-vector/online-education-doodle-seamless-vector-illustration-elearning-pattern-blue-background_582123-6.jpg?w=826")`, // Thay đổi đường dẫn ảnh theo đường dẫn thật của bạn
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh", // Điều chỉnh chiều cao theo nhu cầu của bạn
          }}
        >
          {showWelcome && (
            <div className={style.adminWelcome}>
              <img src="../../../public/img/giphy.gif" alt="" width="300px" />
              <h1 style={{ fontSize: "100px", color: "white" }}>
                Welcome Admin!
              </h1>
            </div>
          )}
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}
