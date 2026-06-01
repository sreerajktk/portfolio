import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="section-bg-gradient min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 grid-glow-bg">
      <div className="max-w-md w-full text-center z-10">
        
        {/* Animated glowing alert emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex p-5 bg-rose-500/10 rounded-3xl border border-rose-500/25 text-rose-500 mb-6 animate-float"
        >
          <AlertCircle className="h-10 w-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-7xl font-extrabold text-slate-800 dark:text-white"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl font-bold mt-2 text-slate-700 dark:text-slate-300"
        >
          Configuration Path Unreachable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed"
        >
          The page or dynamic administrative module you are looking for is either private, removed, or has changed locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-primary-500/20"
          >
            <Home className="h-4.5 w-4.5" />
            <span>Return to Portfolio</span>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default NotFound;
