import { useState, createContext, useContext } from "react";

const AdminUserContext = createContext();

const AdminUserProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("adminUser"));
    return user || null;
  });

  const handleAdminSignin = (user) => {
    setAdminUser(user);
    localStorage.setItem("adminUser", JSON.stringify(user));
  };

  const handleAdminSignout = () => {
    setAdminUser(null);
    localStorage.removeItem("adminUser");
  };

  return (
    <AdminUserContext.Provider
      value={{
        adminUser,
        handleAdminSignin,
        handleAdminSignout,
      }}
    >
      {children}
    </AdminUserContext.Provider>
  );
};

export const useAdminUserContext = () => {
  const value = useContext(AdminUserContext);
  return value;
};

export default AdminUserProvider;
