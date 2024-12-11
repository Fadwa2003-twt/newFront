import React from "react";
import { useSelector } from "react-redux";
import AdminRoute from "./admin.route";
import ContentwritingRoute from "./Contentwriting.route";
import PublisherRoute from "./Publisher.route";
import AdvancePublisherRoute from "./AdvancePublisher.route";
import AdvancePublisherUploadRoute from "./AdvancePublisherUpload.route";
import PublisherWriterRoute from "./PublisherWriter.route";
import ManagerRoute from "./Manager.route";
import AuthRoute from "./Auth.route";
import { roles } from "./roles";

function AppRoute() {
  const userStore = useSelector((store) => store.user);
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is null or if user.data doesn't exist
  // if (!user || !user.data) {
  //   return <AuthRoute />;
  // }

  const hasUserStore = userStore && userStore.isSuccess;
  const hasUserData = user && user.data;
  if (hasUserData || hasUserStore) {
    // If user data is present and the store operation was successful
    switch (user.data.role) {
      case roles.admin:
        return <AdminRoute />;
      case roles.writer:
        return <ContentwritingRoute />;
      case roles.publisher:
        return <AdminRoute />;
      case roles.advancePublisher:
        return <AdminRoute />;
      case roles.advancePublisherUpload:
        return <AdminRoute />;
      case roles.publisherWriter:
        return <AdminRoute />;
      case roles.manager:
        return <AdminRoute />;
      default:
        return <AdminRoute />;
    }
  } else {
    // If the user data is not valid, return to the authentication route
    return <AuthRoute />;
  }
}

export default AppRoute;
