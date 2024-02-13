import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notifications from "./pages/Notifications";
import PromotionsList from "./pages/Admin/PromotionsList";
import FormationsList from "./pages/Admin/FormationsList";
import Profile from "./pages/Profile";
import FormationForm from "./pages/Admin/FormationForm";
import PromotionForm from "./pages/Admin/PromotionForm";
import EtudiantForm from "./pages/Admin/EtudiantForm";
import Appointments from "./pages/Appointments";
import EtudiantsList from "./pages/Admin/EtudiantsList";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <PublicRoute>
              <ForgetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/etudiantslist"
          element={
            <ProtectedRoute>
              <EtudiantsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/promotionslist"
          element={
            <ProtectedRoute>
              <PromotionsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/formationslist"
          element={
            <ProtectedRoute>
              <FormationsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-formation"
          element={
            <ProtectedRoute>
              <FormationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-promotion"
          element={
            <ProtectedRoute>
              <PromotionForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-etudiant"
          element={
            <ProtectedRoute>
              <EtudiantForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
