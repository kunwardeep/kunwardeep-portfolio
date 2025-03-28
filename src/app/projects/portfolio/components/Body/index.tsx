import React from "react";
import Image from "next/image";
import avatar from "@/app/projects/portfolio/assets/images/avatar.png";

const Body = () => {
  return (
    <div className="hero bg-base-200 h-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="avatar">
          <div className="w-64 rounded-full">
            <Image src={avatar} alt="GitHub Avatar" width={200} height={100} />
          </div>
        </div>

        <div>
          <h1 className="text-5xl font-bold">Better days are coming!</h1>
          <p className="py-6">This is where i write nice things about me.</p>
        </div>
      </div>
    </div>
  );
};

export default Body;
