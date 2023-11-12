import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./contexts/UserContext/UserContext";
import AdminUserProvider from "./contexts/AdminContext/AdminContext";
import AdminProtectedRoute from "./routers/AdminProtectedRoute/AdminProtectedRoute";
import AdminLearning from "./modules/AdminLearning/AdminLearning";
import UserList from "./modules/AdminLearning/AdminUsers/UserList/UserList";
import AddUser from "./modules/AdminLearning/AdminUsers/AddUser/AddUser";
import LoginAdmin from "./modules/Auth/LoginAdmin/LoginAdmin";
import CourseList from "./modules/AdminLearning/AdminCourses/CourseList/CourseList";
import AddCourse from "./modules/AdminLearning/AdminCourses/AddCourse/AddCourse";
import UpdateCourse from "./modules/AdminLearning/AdminCourses/UpdateCourse/UpdateCourse";
import NotFound from "./components/NotFound/NotFound";
import UserListRegister from "./modules/AdminLearning/Register/UserListRegister";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Home */}

          {/* Admin */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLearning />}>
              {/* User */}
              <Route path="users-list" element={<UserList />} />
              <Route path="add-user" element={<AddUser />} />
              {/* Course */}
              <Route path="courses-list" element={<CourseList />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route
                path="update-course/:courseId"
                element={<UpdateCourse />}
              />
              <Route
                path="/admin/register/user-list/:id"
                exact
                element={<UserListRegister />}
              />
            </Route>
          </Route>
          <Route path="log-in-admin" element={<LoginAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
