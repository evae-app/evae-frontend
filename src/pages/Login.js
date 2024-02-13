import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("http://localhost:8085/api/v1/user/login", values);
      dispatch(hideLoading());
      if (response.data.token) {
        toast.success("Login Successfully");        
        localStorage.setItem('token', response.data.token);       
        navigate("/");
      } else {
        toast.error("User Not Found !");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title" style={{ backgroundColor: '#FF6F61' }}>Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>

          <Link to="/forgetpassword" className="anchor mt-2">
          MOT DE PASSE OUBLIÉ ?
          </Link>
         
        </Form>
      </div>
    </div>
  );
}

export default Login;
