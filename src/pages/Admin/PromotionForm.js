import { Button, Col, Form, Input, Row, DatePicker, Select } from "antd";
import moment from "moment";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';




function PromotionForm({ initialValues }) {
    // Configuration for DatePicker format
    const dateFormat = "YYYY-MM-DD";
    const navigate = useNavigate();
    const [formationCodes, setFormationCodes] = useState([]);

    useEffect(() => {
        const fetchFormationCodes = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/v1/formation", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200) {
                    const years = response.data.map(formation => formation.codeFormation);
                    setFormationCodes(years);
                }
            } catch (error) {
                console.error("Error fetching promotion years: ", error);
            }
        };

        fetchFormationCodes();
    }, []);

    const onFinish = async (values) => {
        try {
            const formattedValues = {
                ...values,
                dateRentree: values.dateRentree ? values.dateRentree.format(dateFormat) : null,
            };

            const response = await axios.post("http://localhost:8085/api/v1/promotion/ajouter", formattedValues, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                toast.success("Promotion ajouté avec succès");
                navigate("/admin/promotionslist");
            }
        } catch (error) {
            toast.error('Erreur lors de la soumission');
            console.error("Erreur lors de l'ajout de la promotion: ", error);
        }
    };

    return (
        <Layout>
            <h1 className="page-title">Ajouter Promotion </h1>
            <hr />
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    ...initialValues,
                    debutHabilitation: initialValues?.debutHabilitation ? moment(initialValues.debutHabilitation) : null,
                    finHabilitation: initialValues?.finHabilitation ? moment(initialValues.finHabilitation) : null,
                    dateRentree: initialValues?.dateRentree ? moment(initialValues.dateRentree) : null,
                    dateReponseLp: initialValues?.dateReponseLp ? moment(initialValues.dateReponseLp) : null,
                    dateReponseLalp: initialValues?.dateReponseLalp ? moment(initialValues.dateReponseLalp) : null,
                }}
            >
                <Row gutter={20}>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Année Promotion"
                            name="anneePro"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Année Professionnelle" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Code Formation"
                            name="codeFormation"
                            rules={[{ required: true, message: 'Veuillez sélectionner un code de formation' }]}
                        >
                            <Select placeholder="Sélectionner un code de formation">
                                {formationCodes.map(code => (
                                    <Select.Option key={code} value={code}>{code}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Sigle Professionnel"
                            name="siglePro"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Sigle Professionnel" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Nombre d'Étudiants Souhaité"
                            name="nbEtuSouhaite"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Nombre d'Étudiants Souhaité" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="État de Préselection"
                            name="etatPreselection"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="État de Préselection" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Date de Rentree"
                            name="dateRentree"
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Lieu de Rentree"
                            name="lieuRentree"
                        >
                            <Input placeholder="Lieu de Rentree" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Date de Réponse LP"
                            name="dateReponseLp"
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Processus de Stage"
                            name="processusStage"
                        >
                            <Input placeholder="Processus de Stage" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Date de Réponse LALP"
                            name="dateReponseLalp"
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            label="Commentaire"
                            name="commentaire"
                        >
                            <Input.TextArea rows={4} placeholder="Commentaire" />
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

export default PromotionForm;
