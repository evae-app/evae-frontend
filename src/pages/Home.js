import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import {
  BookOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Table } from "antd";
import Layout from "../components/Layout";
import "./Home.css";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



function Home() {

  const { user } = useSelector((state) => state.user);

  const [Users, setUsers] = useState([]);
  const [Insights, setInsights] = useState({ nbrFormations: 0, nbrPromotions: 0, nbrEtudiants: 0 });
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("http://localhost:8085/api/v1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.status === 200) {
        setUsers(resposne.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getHomeInsights = async () => {
    try {
      const resposne = await axios.get("http://localhost:8085/api/v1/home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("insights : ", resposne.data);
      if (resposne.status === 200) {
        setInsights(resposne.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsersData();
    getHomeInsights();
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "#38598b";
      case "etudiant":
        return "#005555";
      case "enseignant":
        return "#ff895d";
      default:
        return "transparent";
    }
  };
  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "Prenom",
      dataIndex: "prenom",
    },
    {
      title: "Date Inscription",
      dataIndex: "dateInscription",
      render: (record, text) => moment(record.dateInscription).format("DD-MM-YYYY"),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <span style={{
          backgroundColor: getRoleColor(record.role),
          color: "white",
          borderRadius: "15px",
          padding: "3px 12px"
        }}>
          {text}
        </span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button style={{ border: 'none', background: 'none' }} onClick={() => console.log('Edit', record)}>
            <EditOutlined />
          </button>
          <button style={{ border: 'none', background: 'none' }} onClick={() => console.log('Delete', record)}>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    { title: "Formation", icon: <BookOutlined />, count: Insights.nbrFormations },
    { title: "Promotion", icon: <TrophyOutlined />, count: Insights.nbrPromotions },
    { title: "Etudiant", icon: <UserOutlined />, count: Insights.nbrEtudiants },
  ];


  return (
    <Layout>
      <div>
        {user && user.role === 'admin' && (
          <div>
            <h2>Tableau de Bord Admin</h2>
            <hr />
            <Row gutter={[16, 16]}>
              {data.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                  <Card className="custom-card">
                    <div className="card-content">
                      <div className="icon-container">
                        <div className="icon-background">
                          {item.icon}
                        </div>
                      </div>
                      <div className="text-content">
                        <h3>{item.title}</h3>
                        <p>{`${item.count} Instances`}</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="page-header">Utilisateurs Récents </h3>
              </div>
              <hr />
              <Table columns={columns} dataSource={Users} />
            </div>
          </div>
        )}

        {user && user.role === 'etudiant' && (
          <div>
            <h2>Espace Étudiant</h2>
            <p>Bienvenue dans votre espace étudiant ! Consultez vos cours, vos notes et les annonces récentes.</p>
            <hr />
            <Row gutter={[16, 16]}>
              {data.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                  <Card className="custom-card">
                    <div className="card-content">
                      <div className="icon-container">
                        <div className="icon-background">
                          {item.icon}
                        </div>
                      </div>
                      <div className="text-content">
                        <h3>{item.title}</h3>
                        <p>{`${item.count} Instances`}</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {user && user.role === 'enseignant' && (
          <div>
            <h2>Espace Enseignant</h2>
            <p>Bienvenue dans votre espace enseignant ! Ici, vous pouvez gérer vos cours, suivre les progrès de vos étudiants et communiquer avec eux.</p>
          </div>
        )}


      </div>
    </Layout>
  );

}

export default Home;
