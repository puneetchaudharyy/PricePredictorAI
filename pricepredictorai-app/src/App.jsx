import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Header from "./components/Header/Header.jsx";
import MainBody from "./components/MainBody/MainBody.jsx";
import About from "./components/About/About.jsx";
import HowToUse from "./components/How-to-use/HowToUse.jsx";
import Footer from "./components/Footer/Footer.jsx";
import web from "../../../client_info.json";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={web.web.client_id}>
      <div>
        <Navbar />
        <Header />
        <MainBody />
        <About />
        <HowToUse />
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
