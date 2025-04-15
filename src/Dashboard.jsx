import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        🎉 Welcome to JoyVerse! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Select a game to play:
      </motion.p>

      <motion.div
        className="game-buttons"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Link to="/quiz">
          <motion.button whileHover={{ scale: 1.1 }}>🧠 Quiz Game</motion.button>
        </Link>
        <Link to="/syllable">
          <motion.button whileHover={{ scale: 1.1 }}>🥁 Syllable Tap</motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
