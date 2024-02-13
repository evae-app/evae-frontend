import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from 'react-hot-toast'
import axios from "axios";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'; 
import { Link } from 'react-router-dom';


function EtudiantsList() {
    const [Etudiants, setEtudiants] = useState([]);
    const dispatch = useDispatch();
    const getEtudiantsData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("http://localhost:8085/api/v1/etudiant", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (resposne.status === 200) {
                setEtudiants(resposne.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    useEffect(() => {
        getEtudiantsData();
    }, []);

    const columns = [
        {
            title: "No Etudiant Nat",
            dataIndex: "noEtudiantNat",
        },
        {
            title: "Etudiant",
            dataIndex: "Etudiant",
            render: (text, record) => (
                <span>
                    {record.nom} - {record.prenom}
                </span>
            ),
        },
        {
            title: "No Etudiant Ubo",
            dataIndex: "noEtudiantUbo",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Dernier Diplome",
            dataIndex: "dernierDiplome",
        },
        {
            title: "Universite",
            dataIndex: "universite",
        },
        {
            title: "Est Diplome",
            dataIndex: "estDiplome",
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
                <h3 className="page-header">Etudiants </h3>
                <Button className="primary-button"><Link to="/admin/add-etudiant">
                    <PlusOutlined /> Ajouter Etudiant </Link>
                </Button>
            </div>
            <hr />
            <Table columns={columns} dataSource={Etudiants} />
        </Layout>
    );
}

export default EtudiantsList;
