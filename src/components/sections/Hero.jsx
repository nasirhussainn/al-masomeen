import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, BookOpen, Users, Award } from "lucide-react";
import Button from "../ui/Button";

const Hero = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Students" },
    { icon: BookOpen, value: "20+", label: "Courses" },
    { icon: Award, value: "15+", label: "Instructors" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 geometric-pattern opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary-400/20 rounded-full blur-xl animate-float"></div>
      <div
        className="absolute bottom-32 right-16 w-32 h-32 bg-accent-400/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-400/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-secondary-500/20 rounded-full border border-secondary-400/30"
            >
              <span className="text-secondary-300 font-medium">
                🌙 Welcome to Al-Masomeen
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
              Learn the{" "}
              <span className="text-gradient bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Holy Quran
              </span>{" "}
              with Traditional Values
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Join our authentic Islamic learning platform where traditional
              scholarship meets modern teaching methods. Experience personalized
              Quranic education from certified instructors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="secondary"
                  icon={ArrowRight}
                  className="group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/book-demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-green hover:text-primary-800 flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map(({ icon: Icon, value, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                    <Icon className="h-6 w-6 text-secondary-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-gray-400 text-sm">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Islamic Art */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Islamic Pattern */}
              <div className="w-full h-96 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📖</div>
                  <h3 className="text-2xl font-playfair font-bold text-white mb-2">
                    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                  </h3>
                  <p className="text-gray-300">
                    In the name of Allah, the Most Gracious, the Most Merciful
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-500/30 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
