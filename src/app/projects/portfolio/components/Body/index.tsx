import React from "react";

const Body = () => {
  return (
    <div className="hero bg-base-200 h-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="avatar">
          <div className="w-64 rounded-full">
            <img src="https://avatars.githubusercontent.com/u/13211086?v=4" />
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
