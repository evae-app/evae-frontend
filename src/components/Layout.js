import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import 'remixicon/fonts/remixicon.css';
import { Avatar, Dropdown, Menu } from "antd";
import logo from "../assets/logo_UBO.png"

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    }
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Formations",
      path: "/admin/formationslist",
      icon: "ri-book-open-line",
    },
    {
      name: "Promotions",
      path: "/admin/promotionslist",
      icon: "ri-medal-line",
    },
    {
      name: "Etudiants",
      path: "/admin/etudiantslist",
      icon: "ri-group-line",
    },
  ];

  const onMenuClick = ({ key }) => {
    switch (key) {
      case "logout":
        localStorage.clear();
        navigate("/login");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  const menuToBeRendered = user?.role === "admin" ? adminMenu : user?.role === "enseignant" ? doctorMenu : userMenu;
  const role = user?.role === "admin" ? "Admin" : user?.role === "etudiant" ? "Etudiant" : "Enseignant";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">SH</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`d-flex menu-item ${isActive && "active-menu-item"
                    }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="header-logo">
              <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
            </div>
            <div className="header-account" style={{ marginRight: '20px' }}>
              <Dropdown overlay={menu}>
                <Avatar icon={<i className="ri-user-3-line"></i>} style={{ backgroundColor: '#005555' }} />
              </Dropdown>
              <span style={{ marginLeft: '10px' }}> <b>Bonjour</b> {user?.name} </span>
            </div>

          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
