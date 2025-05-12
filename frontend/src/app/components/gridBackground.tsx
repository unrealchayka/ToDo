'use client'
import React from "react";
import { motion } from "framer-motion";

const GridBackground = () => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundSize: "10px 10px",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255, 0.04) 1px, transparent 1px)
          `,
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 30% 50%, rgba(255, 50, 150, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 50%, rgba(50, 255, 150, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 50%, rgba(255, 50, 150, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </motion.div>
  );
};

export default GridBackground;