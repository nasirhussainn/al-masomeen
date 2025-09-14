import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Importance of Learning Tajweed in Quran Recitation",
      excerpt: "Discover why proper Tajweed is essential for every Muslim and how it enhances your spiritual connection with the Quran.",
      author: "Sheikh Muhammad Ahmed",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Tajweed",
      image: "📖",
      featured: true
    },
    {
      id: 2,
      title: "Effective Memorization Techniques for Hifz Students",
      excerpt: "Learn proven strategies and methods to memorize the Quran efficiently while maintaining strong retention.",
      author: "Ustadha Khadija Hassan",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Memorization",
      image: "🧠"
    },
    {
      id: 3,
      title: "Building Consistency in Daily Quran Reading",
      excerpt: "Practical tips to establish and maintain a daily Quran reading routine that fits your busy schedule.",
      author: "Dr. Omar Faruq",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Spiritual Growth",
      image: "⏰"
    },
    {
      id: 4,
      title: "The Benefits of Learning Arabic for Quran Understanding",
      excerpt: "Explore how learning Arabic enhances your comprehension and connection with the Holy Quran.",
      author: "Ustadha Aisha Rahman",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Arabic Language",
      image: "🔤"
    },
    {
      id: 5,
      title: "Teaching Quran to Children: Best Practices for Parents",
      excerpt: "Guidelines and methods for parents to effectively teach their children the Quran at home.",
      author: "Sheikh Muhammad Ahmed",
      date: "February 22, 2024",
      readTime: "8 min read",
      category: "Parenting",
      image: "👨‍👩‍👧‍👦"
    },
    {
      id: 6,
      title: "Online vs Traditional Islamic Learning: Finding the Right Balance",
      excerpt: "Compare the benefits of online and traditional Islamic education and how to maximize both approaches.",
      author: "Dr. Omar Faruq",
      date: "February 18, 2024",
      readTime: "5 min read",
      category: "Education",
      image: "💻"
    }
  ];

  const categories = ["All", "Tajweed", "Memorization", "Spiritual Growth", "Arabic Language", "Parenting", "Education"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-primary-50">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              <Calendar className="h-8 w-8 text-secondary-400" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
              Islamic Learning <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">Blog</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore articles, insights, and guidance on Quranic studies, Islamic education, and spiritual development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {blogPosts.filter(post => post.featured).map(post => (
        <section key={post.id} className="section-padding">
          <div className="max-w-6xl mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-primary-100"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12">
                  <div className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full mb-4">
                    Featured Article
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold text-charcoal mb-4">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="primary" icon={ArrowRight}>
                      Read Full Article
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-gradient-to-br from-primary-800 to-accent-800 h-64 lg:h-96 flex items-center justify-center">
                  <div className="text-8xl">{post.image}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Categories Filter */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-primary-800 text-white shadow-lg' 
                    : 'bg-white text-primary-800 border border-primary-200 hover:bg-primary-50'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100"
              >
                {/* Article Header */}
                <div className="bg-gradient-to-br from-primary-800 to-accent-800 p-6 text-white">
                  <div className="text-4xl mb-3 text-center">{post.image}</div>
                  <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-charcoal mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link to={`/blog/${post.id}`}>
                      <Button size="sm" variant="ghost" icon={ArrowRight}>
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive weekly insights on Islamic education and spiritual development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-charcoal border-0 focus:ring-2 focus:ring-secondary-400 focus:outline-none"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;