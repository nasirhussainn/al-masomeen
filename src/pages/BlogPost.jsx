import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';

const BlogPost = () => {
  const { id } = useParams();

  // Hardcoded blog posts data
  const blogPosts = {
    '1': {
      id: 1,
      title: "The Importance of Learning Tajweed in Quran Recitation",
      author: "Sheikh Muhammad Ahmed",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Tajweed",
      image: "📖",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 leading-relaxed mb-8">Learning proper Tajweed is fundamental to every Muslim's spiritual journey. This sacred art of Quranic recitation connects us directly to the divine words revealed to Prophet Muhammad (peace be upon him).</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">What is Tajweed?</h2>
          <p class="mb-6">Tajweed literally means "to make better" or "to improve." In the context of Quran recitation, it refers to the rules governing pronunciation during recitation of the Quran. These rules ensure that each letter is pronounced correctly, with its proper characteristics and from its designated point of articulation.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">The Spiritual Connection</h2>
          <p class="mb-6">When we recite the Quran with proper Tajweed, we're not just reading words—we're establishing a direct spiritual connection with Allah. The Prophet Muhammad (peace be upon him) said: "Whoever reads the Quran beautifully, smoothly, and precisely, he will be in the company of the noble and obedient angels."</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Benefits of Learning Tajweed</h2>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Preserves the integrity of the Quran:</strong> Tajweed ensures that the Quran is recited exactly as it was revealed.</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Enhances spiritual experience:</strong> Proper recitation deepens our connection with the divine.</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Increases rewards:</strong> Each letter recited correctly brings immense spiritual rewards.</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Builds confidence:</strong> Mastering Tajweed gives confidence in leading prayers and recitation.</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Starting Your Tajweed Journey</h2>
          <p class="mb-6">Learning Tajweed requires patience, practice, and proper guidance. At Al-Masomeen Academy, we offer structured courses that take you from basic letter pronunciation to advanced recitation techniques. Our certified instructors provide personalized feedback to ensure you master each rule correctly.</p>

          <p class="mb-6">Remember, the goal is not perfection overnight, but consistent improvement. Every effort you make in learning proper Tajweed is rewarded by Allah, and the spiritual benefits you'll experience are immeasurable.</p>
        </div>
      `
    },
    '2': {
      id: 2,
      title: "Effective Memorization Techniques for Hifz Students",
      author: "Ustadha Khadija Hassan",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Memorization",
      image: "🧠",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 leading-relaxed mb-8">Memorizing the Holy Quran is one of the greatest honors a Muslim can achieve. With the right techniques and consistent practice, this sacred goal becomes attainable for every sincere seeker.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">The Foundation: Understanding Before Memorizing</h2>
          <p class="mb-6">Before beginning memorization, it's crucial to understand the meaning of the verses you're learning. This understanding creates a strong foundation and makes the memorization process more meaningful and effective.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Proven Memorization Techniques</h2>
          
          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">1. The Repeat and Record Method</h3>
          <p class="mb-4">Record yourself reciting new verses and listen repeatedly throughout the day. This auditory reinforcement strengthens memory retention.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">2. Visual Learning Technique</h3>
          <p class="mb-4">Associate each verse with its position on the page. Many hafiz report remembering exactly where verses appear, creating visual memory anchors.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">3. Chunking Method</h3>
          <p class="mb-4">Break long verses into smaller, manageable sections. Master each chunk perfectly before combining them.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">4. Regular Review Schedule</h3>
          <p class="mb-6">Follow the 1-3-7-30 rule: Review new material after 1 day, 3 days, 1 week, and 1 month. This spaced repetition ensures long-term retention.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Creating the Right Environment</h2>
          <p class="mb-6">Choose a quiet, dedicated space for memorization. Consistency in location helps create mental associations that aid recall. Ensure good lighting and minimal distractions.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">The Importance of a Qualified Teacher</h2>
          <p class="mb-6">A skilled instructor can identify your learning style, correct mistakes immediately, and provide personalized strategies. At Al-Masomeen Academy, our certified Hifz instructors have helped hundreds of students successfully memorize the entire Quran.</p>

          <p class="mb-6">Remember, Hifz is not just about memorization—it's about carrying the word of Allah in your heart. Approach this journey with sincerity, patience, and trust in Allah's guidance.</p>
        </div>
      `
    },
    '3': {
      id: 3,
      title: "Building Consistency in Daily Quran Reading",
      author: "Dr. Omar Faruq",
      date: "March 5, 2024",
      readTime: "4 min read",
      category: "Spiritual Growth",
      image: "⏰",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 leading-relaxed mb-8">In our busy modern lives, maintaining a consistent Quran reading routine can be challenging. However, with the right strategies and mindset, we can make daily Quran recitation a natural part of our spiritual practice.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Start Small, Think Big</h2>
          <p class="mb-6">Begin with just 5-10 minutes daily. It's better to read consistently for a short time than to read for hours sporadically. Once this becomes a habit, gradually increase your reading time.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Find Your Optimal Time</h2>
          <p class="mb-6">Identify when you're most alert and spiritually receptive. For many, this is during Fajr (dawn) prayer time or after Maghrib (sunset). The key is choosing a time when you're least likely to be interrupted.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Create Environmental Cues</h2>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Keep your Mushaf (Quran) in a visible, easily accessible place</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Set up a dedicated prayer and reading corner in your home</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Use smartphone reminders or apps to maintain consistency</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">The Power of Habit Stacking</h2>
          <p class="mb-6">Link your Quran reading to an existing habit. For example: "After I perform my obligatory prayer, I will read one page of the Quran." This creates a strong behavioral chain.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Track Your Progress</h2>
          <p class="mb-6">Keep a simple reading log or use a Quran app that tracks your progress. Seeing your consistency streak grow becomes a powerful motivator to continue.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Overcoming Common Obstacles</h2>
          <p class="mb-4"><strong>Busy Schedule:</strong> Use audio recitations during commute or while doing routine tasks.</p>
          <p class="mb-4"><strong>Lack of Understanding:</strong> Pair your reading with translation to deepen comprehension.</p>
          <p class="mb-6"><strong>Missed Days:</strong> Don't let guilt derail your progress. Simply restart the next day.</p>

          <p class="mb-6">Remember, consistency trumps intensity. Allah loves deeds that are regular, even if small. Your daily connection with the Quran will transform your spiritual state and bring immense barakah (blessings) to your life.</p>
        </div>
      `
    },
    '4': {
      id: 4,
      title: "The Benefits of Learning Arabic for Quran Understanding",
      author: "Ustadha Aisha Rahman",
      date: "February 28, 2024",
      readTime: "6 min read",
      category: "Arabic Language",
      image: "🔤",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 leading-relaxed mb-8">Learning Arabic opens the door to understanding the Quran in its original, divine language. This transformative journey deepens your spiritual connection and reveals layers of meaning that translations cannot fully capture.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Direct Connection with Divine Words</h2>
          <p class="mb-6">When you understand Arabic, you're no longer reading an interpretation—you're directly receiving Allah's message as it was revealed. Each word carries precise meanings, nuances, and spiritual weight that can only be fully appreciated in the original language.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Enhanced Prayer Experience</h2>
          <p class="mb-6">Understanding the Arabic in your daily prayers transforms them from routine recitation to meaningful conversation with Allah. You'll find your focus and khushu (humility) dramatically improved when you comprehend what you're saying.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Levels of Arabic Learning for Quran Study</h2>
          
          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Basic Level: Quranic Vocabulary</h3>
          <p class="mb-4">Start with the most frequently occurring words in the Quran. Just 1000 words comprise about 80% of the Quranic text.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Intermediate Level: Grammar Fundamentals</h3>
          <p class="mb-4">Learn basic Arabic grammar to understand sentence structures, verb forms, and grammatical relationships between words.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Advanced Level: Literary Analysis</h3>
          <p class="mb-6">Explore the rhetorical beauty, linguistic miracles, and stylistic features that make the Quran inimitable.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Practical Benefits</h2>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Independence from translations and their limitations</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Access to classical Islamic texts and scholarly works</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Deeper understanding of Hadith literature</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Connection with the global Arabic-speaking Muslim community</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Learning Path at Al-Masomeen Academy</h2>
          <p class="mb-6">Our structured Arabic program is designed specifically for Quran understanding. We start with essential vocabulary, progress through fundamental grammar, and culminate with direct Quranic text analysis. Our native Arabic instructors provide authentic pronunciation and cultural context.</p>

          <p class="mb-6">The journey of learning Arabic for Quran understanding is challenging but immensely rewarding. Each new word learned, each grammatical concept mastered, brings you closer to the heart of Islamic knowledge and spirituality.</p>
        </div>
      `
    },
    '5': {
      id: 5,
      title: "Teaching Quran to Children: Best Practices for Parents",
      author: "Sheikh Muhammad Ahmed",
      date: "February 22, 2024",
      readTime: "8 min read",
      category: "Parenting",
      image: "👨‍👩‍👧‍👦",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 leading-relaxed mb-8">Teaching the Quran to children is one of the most important responsibilities of Muslim parents. Creating a loving, engaging environment for Quranic education sets the foundation for lifelong spiritual growth.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Age-Appropriate Teaching Methods</h2>
          
          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Ages 3-5: Foundation Building</h3>
          <ul class="mb-4 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Focus on Arabic alphabet recognition through games and songs</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Introduce short surahs through repetition and melody</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Use colorful Quran books and interactive apps</span>
            </li>
          </ul>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Ages 6-9: Skill Development</h3>
          <ul class="mb-4 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Begin formal letter joining and word formation</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Introduce basic Tajweed rules in simple terms</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Establish daily reading routine with achievable goals</span>
            </li>
          </ul>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Ages 10+: Advanced Learning</h3>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Focus on proper Tajweed and fluent recitation</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Introduce meanings and basic Arabic vocabulary</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Consider memorization programs if the child shows interest</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Creating a Positive Learning Environment</h2>
          <p class="mb-6">Make Quran time special and anticipated, not dreaded. Use positive reinforcement, celebrate small victories, and never use the Quran as punishment. Create a peaceful, dedicated space for learning that children associate with comfort and spirituality.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Common Challenges and Solutions</h2>
          <p class="mb-4"><strong>Short Attention Span:</strong> Keep sessions short (10-20 minutes) and incorporate movement, games, or visual aids.</p>
          <p class="mb-4"><strong>Resistance to Learning:</strong> Find what motivates your child—stickers, special privileges, or family reading time.</p>
          <p class="mb-4"><strong>Difficulty with Arabic:</strong> Use transliteration initially if needed, but gradually transition to Arabic script.</p>
          <p class="mb-6"><strong>Forgetting Previous Lessons:</strong> Regular review is crucial. Spend part of each session reviewing previous material.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">The Role of Technology</h2>
          <p class="mb-6">Modern technology can enhance traditional teaching methods. Use Quran apps with children's features, online games for Arabic letters, and interactive websites. However, ensure screen time doesn't replace personal interaction and traditional Mushaf reading.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Leading by Example</h2>
          <p class="mb-6">Children learn more from what they see than what they're told. Let them see you reading Quran regularly, treating the Mushaf with respect, and finding joy in Islamic learning. Your enthusiasm becomes their motivation.</p>

          <p class="mb-6">Remember, every child learns at their own pace. Be patient, consistent, and always make du'a for Allah to open their hearts to His words. The seeds you plant in their childhood will bloom into lifelong love for the Quran.</p>
        </div>
      `
    },
    '6': {
      id: 6,
      title: "Online vs Traditional Islamic Learning: Finding the Right Balance",
      author: "Dr. Omar Faruq",
      date: "February 18, 2024",
      readTime: "5 min read",
      category: "Education",
      image: "💻",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-700 leading-relaxed mb-8">The rise of online Islamic education has revolutionized how Muslims worldwide access authentic religious knowledge. Understanding the strengths and limitations of both online and traditional learning helps create an optimal educational experience.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Advantages of Online Islamic Learning</h2>
          
          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Accessibility and Convenience</h3>
          <ul class="mb-4 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Access to qualified scholars regardless of geographical location</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Flexible scheduling that accommodates work and family commitments</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Recorded sessions for review and missed classes</span>
            </li>
          </ul>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Personalized Learning Experience</h3>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>One-on-one sessions with qualified instructors</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Customized curriculum based on individual needs and pace</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Comfortable learning environment, especially beneficial for sisters</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Benefits of Traditional Classroom Learning</h2>
          
          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Community and Social Interaction</h3>
          <p class="mb-4">Traditional Islamic schools provide irreplaceable community bonds, peer learning opportunities, and the barakah of gathering for knowledge.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Comprehensive Environment</h3>
          <p class="mb-6">Physical institutions offer libraries, specialized resources, and immersive Islamic environments that support holistic spiritual development.</p>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Creating a Balanced Approach</h2>
          
          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Hybrid Learning Model</h3>
          <p class="mb-4">Combine online individual instruction with periodic in-person gatherings or local study circles for optimal results.</p>

          <h3 class="text-xl font-semibold text-charcoal mt-6 mb-3">Subject-Specific Decisions</h3>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Quran Recitation & Tajweed:</strong> Excellent for online learning with immediate feedback</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Arabic Language:</strong> Benefits from online immersion with native speakers</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Islamic History & Fiqh:</strong> Can be effectively taught through online discussions and resources</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span><strong>Spiritual Development:</strong> Benefits from community interaction and mentorship</span>
            </li>
          </ul>

          <h2 class="text-2xl font-bold text-charcoal mt-8 mb-4">Al-Masomeen Academy's Integrated Approach</h2>
          <p class="mb-6">We combine the best of both worlds by offering high-quality online instruction with community building through virtual study groups, family programs, and periodic local events. Our platform provides:</p>
          <ul class="mb-6 space-y-2">
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Live interactive classes with qualified scholars</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Student forums for peer interaction and support</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Family-friendly programs that engage entire households</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary-600 mr-2">•</span>
              <span>Mentorship programs for spiritual guidance</span>
            </li>
          </ul>

          <p class="mb-6">The future of Islamic education lies not in choosing between online and traditional methods, but in thoughtfully integrating both to create comprehensive, accessible, and spiritually enriching learning experiences for Muslims worldwide.</p>
        </div>
      `
    }
  };

  const post = blogPosts[id] || blogPosts['1'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-primary-50">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/blog"
              className="inline-flex items-center text-secondary-400 hover:text-secondary-300 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blog
            </Link>
            
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              <div className="text-3xl">{post.image}</div>
            </div>
            
            <div className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full mb-4">
              {post.category}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 mb-6 text-gray-300">
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
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl border border-primary-100 overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Share and Navigation */}
              <div className="border-t border-primary-100 pt-8 mt-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button variant="outline" icon={Share2}>
                    Share Article
                  </Button>
                  
                  <div className="flex gap-4">
                    <Link to="/blog">
                      <Button variant="ghost">
                        More Articles
                      </Button>
                    </Link>
                    <Link to="/courses">
                      <Button variant="primary">
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-900 via-primary-800 to-accent-800 text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Continue Your Learning Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore more articles and join our courses to deepen your understanding of Islam.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blog">
                <Button variant="secondary" size="lg">
                  Read More Articles
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="accent" size="lg">
                  View Our Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;