import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { mockArtworks } from '../mockData';
import { usersAPI } from '../services/api';

const HomePage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 0]);

  const isInView = useInView(featuredRef, { once: true, amount: 0.3 });

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        const data = await usersAPI.getUsers({ limit: 4 });
        setFeaturedArtists(data);
      } catch (error) {
        console.error('Error fetching featured artists:', error);
      } finally {
        setLoadingArtists(false);
      }
    };

    fetchFeaturedArtists();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#F9F9FB]">
      {/* Hero Section with Ambient Gradient */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden"
      >
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 ambient-gradient" />
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 noise-texture" />
        
        {/* Background Art Image */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=1920&h=1080&fit=crop"
            alt="Background art"
            className="w-full h-full object-cover"
            style={{ opacity: 0.08 }}
          />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-[#00000010] text-[#121212] text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2 text-[#8A2BE2]" />
              Welcome to the Creative Universe
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-7xl md:text-9xl font-bold text-[#121212] mb-6 leading-tight"
          >
            Your Digital
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#000000]">
              Identity
            </span>
            <br />
            in Art
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-inter text-lg md:text-xl text-[#646464] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with artists worldwide. Showcase your work. Build your creative legacy.
            Aura is where artistry meets opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-[#000000] hover:bg-[#333333] text-white px-8 h-12 text-base group shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/connectory">
              <Button
                size="lg"
                variant="outline"
                className="border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white px-8 h-12 text-base"
              >
                Explore Artists
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: 'Active Artists', value: '10,000+' },
              { icon: Palette, label: 'Artworks Shared', value: '50,000+' },
              { icon: Sparkles, label: 'Connections Made', value: '100,000+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8A2BE2]/10 mb-4">
                  <stat.icon className="w-8 h-8 text-[#8A2BE2]" />
                </div>
                <h3 className="font-playfair text-4xl font-bold text-[#121212] mb-2">{stat.value}</h3>
                <p className="text-[#646464]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section ref={featuredRef} className="py-20 overflow-hidden bg-[#F9F9FB]">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-5xl font-bold text-[#121212] mb-4">Featured Artists</h2>
            <p className="text-[#646464] text-lg">Discover extraordinary creators from around the world</p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="flex space-x-6 px-4 overflow-x-auto hide-scrollbar pb-4">
            {loadingArtists ? (
              [...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <div className="glass rounded-2xl overflow-hidden">
                    <motion.div
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-64 bg-[#E6E6EB]"
                    />
                    <div className="p-6 space-y-3">
                      <motion.div
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="h-4 bg-[#E6E6EB] rounded"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                        className="h-3 bg-[#E6E6EB] rounded w-3/4"
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              featuredArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80"
                >
                  <Link to={`/connectory`}>
                    <div className="glass rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={artist.coverImage}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-60" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={artist.avatar}
                            alt={artist.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#8A2BE2]"
                          />
                          <div>
                            <h3 className="font-inter font-semibold text-[#121212]">{artist.name}</h3>
                            <p className="text-sm text-[#646464]">@{artist.username}</p>
                          </div>
                        </div>
                        <p className="text-sm text-[#121212] line-clamp-2 mb-3">{artist.bio}</p>
                        <div className="flex items-center justify-between text-xs text-[#646464]">
                          <span className="px-3 py-1 bg-[#8A2BE2]/10 text-[#8A2BE2] rounded-full">{artist.medium}</span>
                          <span>{artist.followers.toLocaleString()} followers</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-5xl font-bold text-[#121212] mb-4">Latest Creations</h2>
            <p className="text-[#646464] text-lg">Explore the pulse of contemporary art</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockArtworks.slice(0, 8).map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl overflow-hidden cursor-pointer group"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="font-inter font-semibold text-white text-sm">{artwork.title}</p>
                      <p className="text-xs text-white/80">{artwork.artist}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/connectory">
              <Button
                size="lg"
                className="bg-[#000000] hover:bg-[#333333] text-white px-8 shadow-lg"
              >
                View All Artworks
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#F9F9FB]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-12 text-center"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#121212] mb-6">
              Ready to Elevate Your Art?
            </h2>
            <p className="text-[#646464] text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of artists who are building their digital presence and connecting with collectors worldwide.
            </p>
            <Button
              size="lg"
              className="bg-[#000000] hover:bg-[#333333] text-white px-12 h-14 text-lg shadow-lg"
            >
              Create Your Nexus Card
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;