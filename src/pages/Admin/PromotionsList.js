import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table, Button } from "antd";
import moment from "moment";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'; 

function PromotionsList() {
  const [Promotions, setPromotions] = useState([]);
  const dispatch = useDispatch();
  const getPromotionsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("http://localhost:8085/api/v1/promotion", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.status === 200) {
        setPromotions(resposne.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPromotionsData();
  }, []);

  const columns = [
    {
      title: "anneePro",
      dataIndex: "anneePro",
    },
    {
      title: "siglePro",
      dataIndex: "siglePro",
    },
    {
      title: "dateRentree",
      dataIndex: "dateRentree",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),

    },
    {
      title: "lieuRentree",
      dataIndex: "lieuRentree",
    },
    {
      title: "nbEtuSouhaite",
      dataIndex: "nbEtuSouhaite",
      //render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
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
        <h1 className="page-header">Promotions </h1>
        <Button className="primary-button"><Link to ="/admin/add-promotion">
          <PlusOutlined /> Ajouter Promotion </Link>
        </Button>
      </div>
      <hr />
      <Table columns={columns} dataSource={Promotions}/>
    </Layout>
  );
}

export default PromotionsList;
