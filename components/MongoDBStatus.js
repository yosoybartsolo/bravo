"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

function MongoDBStatus({ isConnected }) {
  useEffect(() => {
    if (isConnected) {
      toast.success("MongoDB connected successfully!");
    } else {
      toast.error(
        "Failed to connect to MongoDB. Please check your configuration."
      );
    }
  }, [isConnected]);

  return null;
}

export default MongoDBStatus;
