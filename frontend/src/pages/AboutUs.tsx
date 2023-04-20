import React from "react";
import "./AboutUs.css";

export const AboutUs = () => {
  return (
    <div className="AboutUs min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-white mb-8">About Us</h1>
      <p className="text-2xl font-medium text-white mb-8 w-4/5 lg:w-1/2 text-center">
        The "Schedule-a-Doc" group will create a webapp that would ideally be
        used by a doctor's office and its clients.
      </p>
      <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4">
        <div className="text-2xl font-semibold text-white">Daniel Lobo</div>
        <div className="text-2xl font-semibold text-white">Franco Krepel</div>
        <div className="text-2xl font-semibold text-white">Richard Mercado</div>
        <div className="text-2xl font-semibold text-white">Divyanshi Saini</div>
      </div>
    </div>
  );
};
export default AboutUs;
