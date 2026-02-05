import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Palette, Award } from 'lucide-react';
import Masonry from 'react-masonry-css';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import NexusCard from '../components/NexusCard';
import { mockUsers } from '../mockData';

const Connectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');

  const mediums = ['All', 'Digital', 'Canvas', 'Sculpture'];
  const experiences = ['All', 'Emerging', 'Mid-Career', 'Professional'];

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMedium = selectedMedium === 'All' || user.medium === selectedMedium;
    const matchesExperience = selectedExperience === 'All' || user.experience === selectedExperience;
    
    return matchesSearch && matchesMedium && matchesExperience;
  });

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-6xl font-bold text-[#F4F4F9] mb-4">
            The Connectory
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Discover and connect with artists from around the world. Filter by medium, location, and experience level.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <Input
              type="text"
              placeholder="Search artists by name, username, or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 bg-[#1F232D] border-[#1F232D] text-[#F4F4F9] placeholder:text-[#6B7280] focus:border-[#6366F1] rounded-xl"
            />
          </div>

          {/* Filters */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 text-[#6366F1] mr-2" />
              <span className="font-inter font-semibold text-[#F4F4F9]">Filters</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medium Filter */}
              <div>
                <div className="flex items-center mb-3">
                  <Palette className="w-4 h-4 text-[#9CA3AF] mr-2" />
                  <label className="text-sm font-medium text-[#9CA3AF]">Medium</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mediums.map((medium) => (
                    <Button
                      key={medium}
                      size="sm"
                      variant={selectedMedium === medium ? 'default' : 'outline'}
                      onClick={() => setSelectedMedium(medium)}
                      className={selectedMedium === medium
                        ? 'bg-[#6366F1] hover:bg-[#5558E3] text-white'
                        : 'border-[#1F232D] text-[#9CA3AF] hover:text-[#F4F4F9] hover:bg-[#1F232D]'}
                    >
                      {medium}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div>
                <div className="flex items-center mb-3">
                  <Award className="w-4 h-4 text-[#9CA3AF] mr-2" />
                  <label className="text-sm font-medium text-[#9CA3AF]">Experience</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experiences.map((exp) => (
                    <Button
                      key={exp}
                      size="sm"
                      variant={selectedExperience === exp ? 'default' : 'outline'}
                      onClick={() => setSelectedExperience(exp)}
                      className={selectedExperience === exp
                        ? 'bg-[#6366F1] hover:bg-[#5558E3] text-white'
                        : 'border-[#1F232D] text-[#9CA3AF] hover:text-[#F4F4F9] hover:bg-[#1F232D]'}
                    >
                      {exp}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-[#9CA3AF]">
            Showing <span className="text-[#6366F1] font-semibold">{filteredUsers.length}</span> artists
          </p>
        </motion.div>

        {/* Artists Grid - Masonry Layout */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="mb-4"
            >
              <NexusCard user={user} compact />
            </motion.div>
          ))}
        </Masonry>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-[#F4F4F9] mb-2">No artists found</h3>
            <p className="text-[#9CA3AF]">Try adjusting your filters or search query</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Connectory;
