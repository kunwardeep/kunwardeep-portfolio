import type { NextConfig } from "next";
import { Header } from "next/dist/lib/load-custom-routes";

// const headerFn: () => Promise<Header[]> = () => {
//   return Promise.resolve([
//     {
//       source: "/",
//       headers: [
//         {
//           key: "Access-Control-Allow-Origin",
//           value: "*", // Set your origin
//         },
//         {
//           key: "Access-Control-Allow-Methods",
//           value: "GET, POST, PUT, DELETE, OPTIONS",
//         },
//         {
//           key: "Access-Control-Allow-Headers",
//           value: "Content-Type, Authorization",
//         },
//       ],
//     },
//   ]);
// };

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
