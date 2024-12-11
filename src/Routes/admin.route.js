import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainComponent from "../Components/Main.component";
import HomePage from "../pages/Home/Home.page";
import EmployeesPage from "../pages/TeamWork/TeamWork.page";
import Chat from "../pages/chat/Chat";
import SocialMediaPage from "../pages/SocialMedia/SocialMedia.page";
import CategoriesPage from "../pages/Categorys/Categories.page";

function AdminRoute(props) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainComponent>
            <HomePage />
          </MainComponent>
        }
      />
      <Route
        // path="/teamwork"
        path="/teamwork"
        element={
          <MainComponent>
            <EmployeesPage />
          </MainComponent>
        }
      />
      <Route
        path="/chats"
        element={
          <MainComponent>
            <Chat />
          </MainComponent>
        }
      />
      <Route
        path="/analyser"
        element={
          <MainComponent>
            <div className={"p-10"}> analyser </div>
          </MainComponent>
        }
      />
      <Route
        path="/categories"
        element={
          <MainComponent>
            <CategoriesPage />
          </MainComponent>
        }
      />
      <Route
        path="/social-media"
        element={
          <MainComponent>
            <SocialMediaPage type={"admin"} />
          </MainComponent>
        }
      />
      <Route
        path="/settings"
        element={
          <MainComponent>
            <div className={"p-10"}> settings </div>
          </MainComponent>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AdminRoute;
