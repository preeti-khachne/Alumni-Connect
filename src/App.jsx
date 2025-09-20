import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/Toaster";

// screens
// import CodingScreen from "./screens/CodingScreen";
import HomeScreen from "./screens/HomeScreen.jsx";
// import AboutScreen from "./screens/AboutScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import Layout from "./screens/Layout";
// import ContactScreen from "./screens/ContactScreen";
// import PrivacyScreen from "./screens/PrivacyScreen";
// import TermsScreen from "./screens/TermsScreen";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
// import FeedbackScreen from "./screens/FeedbackScreen";
// import PrivateRoute from "./components/PrivateRoute";
// import HeaderLayout from "./screens/HeaderLayout";
// import FeedbackDetailScreen from "./screens/FeedbackDetailScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import ResetPasswordScreen from "./screens/ResetPasswordScreen";
// import DashboardScreen from "./screens/DashboardScreen";
// import ScheduleInterviewScreen from "./screens/ScheduleInterviewScreen";
// import InterviewScreen from "./screens/InterviewScreen";
import { sendAnalytics } from "./utils/firebase";
import logger from "./utils/logger";
// import JobDetailsScreen from "./screens/JobDetailsScreen";
// import JobsScreen from "./screens/JobsScreen";
// import ProblemsScreen from "./screens/ProblemsScreen";

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
     
  "/": "Alumni Data Management System | Centralized Alumni Database & Networking",
  "/login": "Login | Alumni Data Management System",
  "/register": "Register | Alumni Data Management System",
  "/forgot-password": "Forgot Password | Alumni Data Management System",
  "/contact": "Contact Us | Alumni Data Management System",
  "/about": "About Us | Alumni Data Management System",
  "/privacy": "Privacy Policy | Alumni Data Management System",
  "/terms": "Terms & Conditions | Alumni Data Management System",
  "/dashboard": "Dashboard | Alumni Data Management System",
  "/profile": "Alumni Profile | Alumni Data Management System",
  "/resumes": "Alumni Resumes & Career Tracking | Alumni Data Management System",
  "/jobs": "Explore Job Opportunities & Career Growth | Alumni Data Management System",
};

    logger({ location });

    if (titles[location.pathname]) document.title = titles[location.pathname];
  }, [location]);
};

export default function App() {
  usePageTitle();
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout element={<HomeScreen />} />} />
        {/* <Route path="/about" element={<Layout element={<AboutScreen />} />} />
        <Route
          path="/contact"
          element={<Layout element={<ContactScreen />} />}
        />
        <Route
          path="/privacy"
          element={<Layout element={<PrivacyScreen />} />}
        />
        <Route path="/terms" element={<Layout element={<TermsScreen />} />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/jobs" element={<Layout element={<JobDetailsScreen />} />} />
        <Route path="/jobs/:id" element={<Layout element={<JobsScreen />} />} /> */}
        {/* <Route
          path="/reset-password/:token"
          element={<ResetPasswordScreen />}
        /> */}

        {/* Protected Routes */}
        {/* <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={<HeaderLayout element={<DashboardScreen />} />}
          />
          <Route
            path="/interviews/schedule"
            element={<HeaderLayout element={<ScheduleInterviewScreen />} />}
          />
          <Route
            path="/feedback"
            element={<HeaderLayout element={<FeedbackScreen />} />}
          />
          <Route
            path="/feedback/:id"
            element={<HeaderLayout element={<FeedbackDetailScreen />} />}
          />
          <Route
            path="/interview/:id"
            element={<HeaderLayout element={<InterviewScreen />} />}
          />
          <Route
            path="/practice"
            element={<Layout element={<ProblemsScreen />} />}
          />
          <Route
            path="/practice/:id"
            element={<HeaderLayout element={<CodingScreen />} />}
          />
          <Route
            path="/profile"
            element={<HeaderLayout element={<ProfileScreen />} />}
          /> */}
        {/* </Route> */}

        {/* Catch-all */}
        <Route path="*" element={<Layout element={<NotFoundScreen />} />} />
      </Routes>
    </>
  );
}
