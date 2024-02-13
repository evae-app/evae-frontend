import { Button, Col, Form, Input, Row, DatePicker, Select } from "antd";
import React from "react";
import moment from "moment";
import Layout from "../../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';



function FormationForm({ initialValues }) {
    const dateFormat = "YYYY-MM-DD";
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        const dataToSend = {
            ...values,
            debutHabilitation: values.debutHabilitation ? values.debutHabilitation.format(dateFormat) : undefined,
            finHabilitation: values.finHabilitation ? values.finHabilitation.format(dateFormat) : undefined,
        };

        try {
            const response = await axios.post("http://localhost:8085/api/v1/formation/ajouter", dataToSend, config);

            if (response.status === 200) {
                toast.success("Formation ajouté avec succès");
                navigate("/admin/formationslist");
            }


        } catch (error) {
            toast.error('Erreur lors de la soumission');
            console.error('Erreur lors de la soumission:', error);
        }
    };

    return (
        <Layout>
            <h1 className="page-title">Ajouter Formation </h1>
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
                            label="Code Formation"
                            name="codeFormation"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Code Formation" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Diplome"
                            name="diplome"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Diplome" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Nom Formation"
                            name="nomFormation"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Nom Formation" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="N0 Annee"
                            name="n0Annee"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="N0 Annee" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Double Diplome"
                            name="doubleDiplome"
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
                            required
                            label="Debut Habilitation"
                            name="debutHabilitation"
                            rules={[{ required: true }]}
                        >
                            <DatePicker format={dateFormat} />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} sm={24} lg={12}>
                        <Form.Item
                            required
                            label="Fin Habilitation"
                            name="finHabilitation"
                            rules={[{ required: true }]}
                        >
                            <DatePicker format={dateFormat} />
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

export default FormationForm;
