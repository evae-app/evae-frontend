import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from 'react-hot-toast';
import axios from "axios";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'; // Importing icons
import moment from "moment";
import { Link } from 'react-router-dom';



function FormationsList() {
  const [Formations, setFormations] = useState([]);
  const dispatch = useDispatch();
  const getFormationsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("http://localhost:8085/api/v1/formation", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.status === 200) {
        setFormations(response.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Consider showing an error message using toast here
    }
  };

  useEffect(() => {
    getFormationsData();
  }, []);

  const columns = [
    {
      title: "Formation",
      dataIndex: "Formation",
      render: (text, record) => (
        <span>
          {record.nomFormation} - {record.codeFormation}
        </span>
      ),
    },
    {
      title: "Diplome",
      dataIndex: "diplome",
    },
    {
      title: "Double Diplome",
      dataIndex: "doubleDiplome",
    },
    {
      title: "n0Annee",
      dataIndex: "n0Annee",
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

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="page-header">Formations </h1>
        <Button className="primary-button"><Link to ="/admin/add-formation">
          <PlusOutlined /> Ajouter Formation </Link>
        </Button>
      </div>      <hr />
      <Table columns={columns} dataSource={Formations} />
    </Layout>
  );
}

export default FormationsList;
