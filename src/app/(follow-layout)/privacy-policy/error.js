"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container" style={{ padding: "300px 0" }}>
      <h1 className="text-center">Something went wrong!</h1>
    </div>
  );
}
