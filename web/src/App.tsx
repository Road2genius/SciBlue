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
import ProfileInformation from "./pages/ProfileInformation";
import CreateQuestion from "./pages/CreateQuestion";
import QuestionsList from "./pages/QuestionsList";
import QuestionDetail from "./pages/QuestionDetail";
import EditQuestion from "./pages/EditQuestion";

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
            path="/user/profile/:userId"
            element={<ProfileInformation />}
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
          <Route
            path="/question/create"
            element={<PrivateRoute element={<CreateQuestion />} />}
          />
          <Route path="/discussions/list" element={<QuestionsList />} />
          <Route
            path="/question/details/:questionId"
            element={<PrivateRoute element={<QuestionDetail />} />}
          />
          <Route
            path="/question/edit/:questionId"
            element={<PrivateRoute element={<EditQuestion />} />}
          />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
