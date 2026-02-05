import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Calendar, Tag, TrendingUp, Megaphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { mockCommunityPosts } from '../data/mockData';

const CommunityBoard = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const allTags = ['All', ...new Set(mockCommunityPosts.flatMap(post => post.tags))];
  const postTypes = ['All', 'Open Call', 'Project Update'];

  const filteredPosts = mockCommunityPosts.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesType = selectedType === 'All' || post.type === selectedType;
    return matchesTag && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-6xl font-bold text-[#F4F4F9] mb-4">
            Community Board
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Stay updated with open calls, project announcements, and community conversations.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          {/* Post Type Filter */}
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <Megaphone className="w-4 h-4 text-[#9CA3AF] mr-2" />
              <label className="text-sm font-medium text-[#9CA3AF]">Post Type</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {postTypes.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant={selectedType === type ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type
                    ? 'bg-[#6366F1] hover:bg-[#5558E3] text-white'
                    : 'border-[#1F232D] text-[#9CA3AF] hover:text-[#F4F4F9] hover:bg-[#1F232D]'}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <div className="flex items-center mb-3">
              <Tag className="w-4 h-4 text-[#9CA3AF] mr-2" />
              <label className="text-sm font-medium text-[#9CA3AF]">Tags</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  size="sm"
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  onClick={() => setSelectedTag(tag)}
                  className={selectedTag === tag
                    ? 'bg-[#6366F1] hover:bg-[#5558E3] text-white'
                    : 'border-[#1F232D] text-[#9CA3AF] hover:text-[#F4F4F9] hover:bg-[#1F232D]'}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass rounded-2xl p-6 hover:bg-[#1F232D]/30 transition-colors cursor-pointer"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-[#F4F4F9]">{post.author}</h3>
                    <div className="flex items-center space-x-2 text-xs text-[#9CA3AF]">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.type === 'Open Call'
                      ? 'bg-[#6366F1]/10 text-[#6366F1]'
                      : 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                  }`}
                >
                  {post.type}
                </span>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h2 className="font-playfair text-2xl font-bold text-[#F4F4F9] mb-3">
                  {post.title}
                </h2>
                <p className="text-[#9CA3AF] leading-relaxed">{post.content}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#1F232D] text-[#9CA3AF] rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1F232D]">
                <div className="flex items-center space-x-6 text-sm text-[#9CA3AF]">
                  <button className="flex items-center space-x-2 hover:text-[#6366F1] transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-[#6366F1] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-[#6366F1] hover:text-[#5558E3] hover:bg-transparent"
                >
                  Read More
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <TrendingUp className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
            <h3 className="font-playfair text-2xl font-bold text-[#F4F4F9] mb-2">No posts found</h3>
            <p className="text-[#9CA3AF]">Try adjusting your filters</p>
          </motion.div>
        )}

        {/* Create Post CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="font-playfair text-2xl font-bold text-[#F4F4F9] mb-3">
              Have something to share?
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              Post open calls, project updates, or start a conversation with the community.
            </p>
            <Button className="bg-[#6366F1] hover:bg-[#5558E3] text-white px-8">
              Create Post
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityBoard;
