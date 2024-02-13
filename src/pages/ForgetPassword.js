import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8085/api/v1/user/forgotPassword",
        values  // Assuming your API endpoint for forget password expects only the email
      );
      dispatch(hideLoading());

      if (response.status === 200) {
        toast.success("Password reset instructions sent to your email");
        navigate("/login");
      } else {
        toast.error("Email not found");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title" style={{ backgroundColor: '#FF6F61' }}>Password Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          {/* Removed Name and Password fields */}
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            Forget Password
          </Button>

          <Link to="/login" className="anchor mt-2">
          LOGIN ?
          </Link>

        </Form>
      </div>
    </div>
  );
}

export default ForgetPassword;
