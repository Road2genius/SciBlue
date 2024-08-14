import React, { Suspense } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateRequest from "./pages/CreateRequest";
import RequestsList from "./pages/RequestsList";
import RequestDetails from "./pages/RequestDetails";
import Footer from "./components/LandingPage/Footer/Footer";
import EditRequest from "./pages/EditRequest";
import Feedback from "./pages/Feedback";
import Community from "./pages/Community";

// const Navbar: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./components/Navbar/Navbar")
// );
// const Footer: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./components/LandingPage/Footer/Footer")
// );
// const Home: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./pages/Home")
// );

// const Login: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./pages/Login")
// );

// const Signup: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./pages/Signup")
// );

// const CreateRequest: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./pages/CreateRequest")
// );

// const RequestsList: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./pages/RequestsList")
// );

// const RequestDetails: React.LazyExoticComponent<React.FC<object>> = lazy(
//   () => import("./pages/RequestDetails")
// );

const MainLayout = (): JSX.Element => <Outlet />;

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/request/create"
            element={<PrivateRoute element={<CreateRequest />} />}
          />
          <Route
            path="/request/edit/:id"
            element={<PrivateRoute element={<EditRequest />} />}
          />
          <Route path="/request/list" element={<RequestsList />} />
          <Route
            path="/request/details/:id"
            element={<PrivateRoute element={<RequestDetails />} />}
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
