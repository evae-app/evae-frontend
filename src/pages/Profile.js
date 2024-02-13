import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";
import { Button, Form, Input, Card, Row, Col, Tabs } from "antd";
import { hideLoading, showLoading } from "../redux/alertsSlice";


const { TabPane } = Tabs;

function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("http://localhost:8085/api/v1/user/changePassword",values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.status === 200) {               
                toast.success("Password changé avec succès");
            }

        } catch (error) {
            dispatch(hideLoading());
            toast.error('Old Password pas Correct');
        }
    };

    return (
        <Layout>
            <div className="profile-container">
                <Card className="profile-header-card">
                    <Row align="middle">
                        <Col flex="auto" className="profile-user-info">
                            <h4 className="user-name">{user.name} {user.prenom}</h4>
                            <h6 className="text-muted">{user.email}</h6>
                            <div className="user-location">
                                <i className="fas fa-map-marker-alt"></i> {user.adresse}
                            </div>
                        </Col>
                        <Col flex="none" className="profile-btn">
                            <Button className="primary-button">Edit</Button>
                        </Col>
                    </Row>
                </Card>

                <Card className="profile-menu-card">
                    <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: 0 }} type="card" size="large" >
                        <TabPane tab={
                            <span style={{ color: "#005555" }}>About</span>}
                            key="1"
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Card>
                                        <h5 className="card-title d-flex justify-content-between">
                                            <span>Personal Details</span>
                                            <a className="edit-link" data-bs-toggle="modal" href="#edit_personal_details" style={{ color: "#005555" , fontSize:"18px"}}>
                                                <i className=" far fa-edit me-1"></i>Edit
                                            </a>
                                        </h5>
                                        <hr/>
                                        <Row>
                                            <Col span={9}>
                                                <p className="text-muted  mb-0 mb-sm-3"><b>Name</b></p>
                                                <p>{user.name} {user.prenom}</p>
                                            </Col>
                                            <Col span={9}>
                                                <p className="text-muted  mb-0 mb-sm-3"><b>Date Inscription</b></p>
                                                <p>{user.dateInscription}</p>
                                            </Col>
                                            <Col span={6}>
                                                <p className="text-muted  mb-0 mb-sm-3"><b>Role</b></p>
                                                <p><span style={{ backgroundColor: "#005555", color: "white" , padding:"8px"}}> {user.role} </span></p>
                                            </Col>

                                        </Row>
                                    </Card>
                                </Col>
                                
                            </Row>
                        </TabPane>
                        <TabPane tab={<span style={{ color: "#005555" }}>Password</span>} key="2">
                            <br></br>
                            <div className="authentication-form  p-3">
                                <h1 className="card-title" >Changer Password</h1>
                                <hr/>
                                <Form layout="vertical" onFinish={onFinish}>
                                    <Form.Item label="OldPassword" name="oldPassword">
                                        <Input placeholder="OldPassword" type="password" />
                                    </Form.Item>
                                    <Form.Item label="NewPassword" name="newPassword">
                                        <Input placeholder="NewPassword" type="password" />
                                    </Form.Item>


                                    <Button className="primary-button my-2 full-width-button" htmlType="submit">
                                        Changer Password
                                    </Button>


                                </Form>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        </Layout>
    );
}

export default Profile;
