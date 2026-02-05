import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="glass rounded-xl overflow-hidden">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-32 bg-[#1F232D]"
        />
        <div className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-full bg-[#1F232D]"
            />
            <div className="flex-1 space-y-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-4 bg-[#1F232D] rounded w-3/4"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                className="h-3 bg-[#1F232D] rounded w-1/2"
              />
            </div>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="h-3 bg-[#1F232D] rounded"
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="h-3 bg-[#1F232D] rounded w-5/6"
          />
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl overflow-hidden"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
              className="aspect-[3/4] bg-[#1F232D]"
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
