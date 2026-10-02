import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Dummy catalogue photography is served from Unsplash. Add your own CDN here later.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
