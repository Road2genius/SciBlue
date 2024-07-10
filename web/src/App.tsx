import React, { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const Navbar: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("./components/Navbar/Navbar")
);
const Footer: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("./components/LandingPage/Footer/Footer")
);
const Home: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("./pages/Home")
);

const Login: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("./pages/Login")
);

const Signup: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("./pages/Signup")
);

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
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;
