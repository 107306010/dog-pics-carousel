import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/breed-image-proxy",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        pathname: "/breeds/**",
      }
    ]
  },
};

export default nextConfig;
