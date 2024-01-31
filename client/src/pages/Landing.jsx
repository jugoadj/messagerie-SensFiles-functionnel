import './Landing.css';
import React from "react";
import Navbar from "../components/landing/Navbar";
import Home from "../components/landing/Home";
import About from "../components/landing/About";
import Work from "../components/landing/Work";
import Testimonial from "../components/landing/Testimonial";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";
import { Element } from "react-scroll";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Element name="home">
          <Home />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <Element name="work">
          <Work />
        </Element>
        <Element name="testimonials">
          <Testimonial />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
