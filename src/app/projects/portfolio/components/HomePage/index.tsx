import React from "react";
import Image from "next/image";
import avatar from "@/app/projects/portfolio/assets/images/avatar.png";
import useApi from "@/app/utils/useApi";

interface IJoke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

const HomePage = () => {
  const { loading, data } = useApi<IJoke>(
    "https://official-joke-api.appspot.com/random_joke"
  );

  return (
    <div className="hero bg-base-200 h-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="avatar">
          <div className="w-64 rounded-full">
            <Image
              priority
              src={avatar}
              alt="GitHub Avatar"
              width={200}
              height={100}
            />
          </div>
        </div>

        <div>
          <h1 className="w-150 text-5xl font-bold">
            {loading && <progress className="progress w-100"></progress>}
            {data && data.setup}
          </h1>
          <p className="py-6 text-2xl">
            {loading && <progress className="progress w-75"></progress>}
            {data && data.punchline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
