import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Instagram, Twitter, Globe, Heart, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const NexusCard = ({ user, compact = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="glass rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="relative h-32 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20">
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#6366F1]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <h3 className="font-inter font-semibold text-[#F4F4F9] truncate">{user.name}</h3>
                {user.verified && <CheckCircle className="w-4 h-4 text-[#6366F1] flex-shrink-0" />}
              </div>
              <p className="text-xs text-[#9CA3AF]">@{user.username}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-[#F4F4F9] line-clamp-2">{user.bio}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-[#9CA3AF]">
            <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{user.location}</span>
            <span className="flex items-center"><Heart className="w-3 h-3 mr-1" />{user.followers.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto" style={{ perspective: '2000px' }}>
      <motion.div
        animate={isFlipped ? 'back' : 'front'}
        variants={cardVariants}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full"
        style={{ 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Front of Card */}
        <div
          className="glass rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative h-48 bg-gradient-to-br from-[#6366F1]/30 to-[#8B5CF6]/30">
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
          </div>
          
          <div className="p-6 -mt-16 relative z-10">
            <div className="flex items-end justify-between mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#0B0E14] shadow-xl"
              />
              <Button
                size="sm"
                onClick={() => setIsFlipped(true)}
                className="bg-[#6366F1] hover:bg-[#5558E3] text-white"
              >
                View Details
              </Button>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <h2 className="font-playfair text-2xl font-bold text-[#F4F4F9]">{user.name}</h2>
              {user.verified && <CheckCircle className="w-5 h-5 text-[#6366F1]" />}
            </div>
            <p className="text-[#9CA3AF] mb-1">@{user.username}</p>
            <p className="text-sm text-[#F4F4F9] mb-4 leading-relaxed">{user.bio}</p>

            <div className="flex items-center space-x-4 text-sm text-[#9CA3AF] mb-4">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{user.location}</span>
              <span className="px-3 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded-full">{user.medium}</span>
              <span>{user.experience}</span>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-sm text-[#F4F4F9] font-medium">{user.followers.toLocaleString()}</span>
              <span className="text-sm text-[#9CA3AF]">followers</span>
            </div>

            <div className="flex items-center space-x-3">
              {user.social.instagram && (
                <a href="#" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {user.social.twitter && (
                <a href="#" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {user.social.website && (
                <a href="#" className="text-[#9CA3AF] hover:text-[#6366F1] transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="glass rounded-2xl overflow-hidden absolute top-0 left-0 w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="p-6 h-full flex flex-col">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsFlipped(false)}
              className="self-end mb-4 text-[#F4F4F9] hover:text-[#6366F1]"
            >
              Back
            </Button>

            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="bg-white p-4 rounded-xl">
                <QRCodeSVG
                  value={`https://flowart.app/artist/${user.username}`}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>
              
              <div className="text-center">
                <p className="font-playfair text-xl font-bold text-[#F4F4F9] mb-1">{user.name}</p>
                <p className="text-sm text-[#9CA3AF] mb-4">Scan to connect</p>
              </div>

              <div className="w-full space-y-3">
                {user.social.website && (
                  <a
                    href="#"
                    className="flex items-center justify-between w-full p-3 glass-dark rounded-lg hover:bg-[#6366F1]/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-[#6366F1]" />
                      <span className="text-sm text-[#F4F4F9]">{user.social.website}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
                  </a>
                )}
                {user.social.instagram && (
                  <a
                    href="#"
                    className="flex items-center justify-between w-full p-3 glass-dark rounded-lg hover:bg-[#6366F1]/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Instagram className="w-5 h-5 text-[#6366F1]" />
                      <span className="text-sm text-[#F4F4F9]">{user.social.instagram}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#9CA3AF]" />
                  </a>
                )}
              </div>

              <Button className="w-full bg-[#6366F1] hover:bg-[#5558E3] text-white">
                <Heart className="w-4 h-4 mr-2" />
                Support My Work
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NexusCard;
