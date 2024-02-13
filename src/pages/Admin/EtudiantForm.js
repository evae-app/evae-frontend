import { Button, Col, Form, Input, Row, DatePicker, Select } from "antd";
import moment from "moment";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';



function EtudiantForm({ initialValues }) {
    const dateFormat = "YYYY-MM-DD";
    const navigate = useNavigate();
    const [promotionYears, setPromotionYears] = useState([]);

    useEffect(() => {
        const fetchPromotionYears = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/v1/promotion", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200) {
                    const years = response.data.map(promotion => promotion.anneePro);
                    setPromotionYears(years);
                }
            } catch (error) {
                console.error("Error fetching promotion years: ", error);
            }
        };

        fetchPromotionYears();
    }, []);

    const onFinish = async (values) => {
        const formData = {
            ...values,
            dateNaissance: values.dateNaissance ? values.dateNaissance.format(dateFormat) : undefined,
        };

        try {
            const response = await axios.post("http://localhost:8085/api/v1/etudiant/ajouter", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.status === 200) {
                toast.success("Etudiant ajouté avec succès");
                navigate("/admin/etudiantslist");
            }

        } catch (error) {
            toast.error('Erreur lors de la soumission');
            console.error("Erreur lors de l'ajout de l'étudiant: ", error);
        }
    };


    return (
        <Layout>
            <h1 className="page-title">Ajouter Etudiant</h1>
            <hr />
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    ...initialValues,
                    debutHabilitation: initialValues?.debutHabilitation ? moment(initialValues.debutHabilitation) : null,
                    finHabilitation: initialValues?.finHabilitation ? moment(initialValues.finHabilitation) : null,
                }}
            >
                <Row gutter={20}>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="No Etudiant Nat"
                            name="noEtudiantNat"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="No Etudiant Nat" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Année Promotion"
                            name="anneePro"
                            rules={[{ required: true, message: 'Veuillez sélectionner une année de promotion' }]}
                        >
                            <Select placeholder="Sélectionner une année de promotion">
                                {promotionYears.map(year => (
                                    <Select.Option key={year} value={year}>{year}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Code Com"
                            name="codeCom"
                        >
                            <Input placeholder="Code Com" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="No Etudiant UBO"
                            name="noEtudiantUbo"
                        >
                            <Input placeholder="No Etudiant UBO" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Sexe"
                            name="sexe"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Sexe" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Nom"
                            name="nom"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Nom" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Prénom"
                            name="prenom"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Prénom" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Date de Naissance"
                            name="dateNaissance"
                            rules={[{ required: true }]}
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Lieu de Naissance"
                            name="lieuNaissance"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Lieu de Naissance" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Situation"
                            name="situation"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Situation" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Nationalité"
                            name="nationalite"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Nationalité" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Téléphone Portable"
                            name="telPort"
                        >
                            <Input placeholder="Téléphone Portable" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Téléphone Fixe"
                            name="telFixe"
                        >
                            <Input placeholder="Téléphone Fixe" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Adresse Actuelle"
                            name="actuAdresse"
                        >
                            <Input placeholder="Adresse Actuelle" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Code Postal Actuel"
                            name="actuCp"
                        >
                            <Input placeholder="Code Postal Actuel" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Ville Actuelle"
                            name="actuVille"
                        >
                            <Input placeholder="Ville Actuelle" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Pays Actuel"
                            name="actuPays"
                        >
                            <Input placeholder="Pays Actuel" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Adresse Permanente"
                            name="permAdresse"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Adresse Permanente" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Code Postal Permanent"
                            name="permCp"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Code Postal Permanent" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Ville Permanente"
                            name="permVille"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Ville Permanente" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Pays Permanent"
                            name="permPays"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Pays Permanent" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Dernier Diplôme"
                            name="dernierDiplome"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Dernier Diplôme" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Université"
                            name="universite"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Université" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Sigle Etudiant"
                            name="sigleEtu"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Sigle Etudiant" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Compte CRI"
                            name="compteCri"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Compte CRI" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Est Diplomé"
                            name="estDiplome"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Select">
                                <Select.Option value="Y">Yes</Select.Option>
                                <Select.Option value="N">No</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Email UBO"
                            name="uboEmail"
                        >
                            <Input placeholder="Email UBO" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end">
                    <Button className="primary-button" htmlType="submit">
                        SUBMIT
                    </Button>
                </div>
            </Form>
        </Layout>
    );
}

export default EtudiantForm;
