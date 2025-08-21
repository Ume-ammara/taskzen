import React from "react";
import Hero from "@/components/homedesign/Hero"; // adjust path if needed
import Features from "@/components/homedesign/Features";
import Footer from "@/components/homedesign/Footer";

const LandingPage = () => {
  return (
    <div className="bg-background overflow-x-hidden ">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
