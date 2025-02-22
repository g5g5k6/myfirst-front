import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">7000單</h1>
        <Link to="/study" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          開始學習
        </Link>
      </div>
    </div>
  );
}

export default HomePage;