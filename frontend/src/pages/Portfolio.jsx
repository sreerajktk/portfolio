import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Zap, Atom, Cpu, Server, Database, Globe, Layout, HardDrive, Link as LinkIcon,
  Smartphone, Layers, Sliders, Megaphone, Briefcase, MessageSquare, Users, HelpCircle,
  UserCheck, TrendingUp, Clock, Mail, Phone, MapPin, Github, Linkedin, ExternalLink,
  Download, Calendar, Award, CheckCircle, Languages, AlertCircle, Send, Check
} from 'lucide-react';
import api from '../utils/api';

// Icon Map helper to resolve Lucide string identifiers dynamically
const iconMap = {
  Flame: Flame, Zap: Zap, Atom: Atom, Cpu: Cpu, Server: Server, Database: Database,
  Globe: Globe, Layout: Layout, HardDrive: HardDrive, Link: LinkIcon, Smartphone: Smartphone,
  Layers: Layers, Sliders: Sliders, Megaphone: Megaphone, Briefcase: Briefcase,
  MessageSquare: MessageSquare, Users: Users, HelpCircle: HelpCircle, UserCheck: UserCheck,
  TrendingUp: TrendingUp, Clock: Clock
};

// Seeder data fallbacks for high-availability offline states
const fallbackSkills = [
  { name: 'PHP', category: 'Technical', proficiency: 90, icon: 'Flame' },
  { name: 'CodeIgniter', category: 'Technical', proficiency: 85, icon: 'Zap' },
  { name: 'React.js', category: 'Technical', proficiency: 88, icon: 'Atom' },
  { name: 'Node.js', category: 'Technical', proficiency: 85, icon: 'Cpu' },
  { name: 'Express.js', category: 'Technical', proficiency: 85, icon: 'Server' },
  { name: 'MongoDB', category: 'Technical', proficiency: 80, icon: 'Database' },
  { name: 'Full Stack Web Development', category: 'Technical', proficiency: 92, icon: 'Globe' },
  { name: 'Front-End Development', category: 'Technical', proficiency: 90, icon: 'Layout' },
  { name: 'Database Management', category: 'Technical', proficiency: 85, icon: 'HardDrive' },
  { name: 'API Integration', category: 'Technical', proficiency: 90, icon: 'Link' },
  { name: 'Android App Development', category: 'Technical', proficiency: 75, icon: 'Smartphone' },
  { name: 'MVC Architecture', category: 'Technical', proficiency: 90, icon: 'Layers' },
  { name: 'Website Maintenance', category: 'Technical', proficiency: 95, icon: 'Sliders' },
  { name: 'Branding & Digital Marketing', category: 'Technical', proficiency: 80, icon: 'Megaphone' },
  { name: 'Project Coordination', category: 'Technical', proficiency: 85, icon: 'Briefcase' },
  { name: 'Communication', category: 'Soft', proficiency: 95, icon: 'MessageSquare' },
  { name: 'Team Collaboration', category: 'Soft', proficiency: 90, icon: 'Users' },
  { name: 'Problem Solving', category: 'Soft', proficiency: 88, icon: 'HelpCircle' },
  { name: 'Client Handling', category: 'Soft', proficiency: 92, icon: 'UserCheck' },
  { name: 'Leadership', category: 'Soft', proficiency: 85, icon: 'TrendingUp' },
  { name: 'Time Management', category: 'Soft', proficiency: 88, icon: 'Clock' }
];

const fallbackProjects = [
  {
    _id: 'p1',
    title: 'NexusCRM - Enterprise Client Relations Portal',
    description: 'A premium MERN Stack CRM platform built for small-to-medium enterprises. Features include contact management, lead pipeline visualization, sales forecasts, and secure support ticketing systems. Employs fine-grained role-based access control and dashboard analytics charts.',
    features: [
      'Interactive kanban board for sales pipeline tracking',
      'Advanced client record filtering and bulk action logs',
      'Automated custom report generation with charts and graphs',
      'Secure internal messaging and support desk ticket manager'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Recharts', 'JWT'],
    image: 'https://images.unsplash.com/photo-1552581230-22c608f654b0?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/sreerajktk/nexus-crm',
    liveUrl: 'https://nexus-crm-demo.vercel.app',
    category: 'CRM',
    featured: true
  },
  {
    _id: 'p2',
    title: 'Aphelion - Advanced E-Commerce Ecosystem',
    description: 'A high-performance online marketplace offering automated product catalogs, payment gateway integration, checkout processes, real-time inventory management, and an administration portal for product edits.',
    features: [
      'Comprehensive product search, multi-faceted filtering, and sorting parameters',
      'Interactive cart workflow with instant local storage syncing and price aggregates',
      'Robust admin portal containing orders review, inventory levels, and product creation',
      'Secure checkout with automatic invoice email generation'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Nodemailer', 'Redux Toolkit'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/sreerajktk/aphelion-ecommerce',
    liveUrl: 'https://aphelion-shop.vercel.app',
    category: 'E-commerce',
    featured: true
  },
  {
    _id: 'p3',
    title: 'OmniDash - Multi-Source API Aggregator',
    description: 'A dynamic, widget-based dashboard that connects to multiple REST APIs (Weather, Github profile stats, real-time currency converters, and tech news feeds) with customizable layouts and responsive caching.',
    features: [
      'Draggable dashboard widgets utilizing local storage layout persistence',
      'Custom backend proxy server to prevent CORS blocks and implement API request caching',
      'Detailed API health status indicators and real-time news stream filters',
      'Responsive light and dark modes with interactive SVG charts'
    ],
    techStack: ['Node.js', 'Express.js', 'React.js', 'Axios', 'Tailwind CSS', 'Framer Motion', 'WeatherAPI'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/sreerajktk/omnidash',
    liveUrl: 'https://omnidash-widgets.vercel.app',
    category: 'API-based',
    featured: false
  },
  {
    _id: 'p4',
    title: 'DevSpace - Interactive Portfolio Management Suite',
    description: 'A premium developer portfolio builder and CMS. It enables engineers to sync their live GitHub profile info, publish blog posts, configure active tech skills, and monitor client inquiries in real time.',
    features: [
      'Dynamic GitHub API integration syncing user repositories and contribution metrics',
      'Built-in Markdown editor for posting custom tech blogs and tutorials',
      'Contact inquiry dashboard showcasing visitor details and read states',
      'Glassmorphic theme customizer with real-time UI changes'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'GitHub API'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/sreerajktk/devspace-portfolio',
    liveUrl: 'https://sreeraj-ktk.vercel.app',
    category: 'Portfolio',
    featured: true
  }
];

const experiences = [
  {
    title: 'Developer',
    company: '4champz Innovative Pvt Ltd',
    location: 'Kerala, India',
    duration: '2023 – Present',
    responsibilities: [
      'Performed full scale website maintenance and frontend usability optimizations.',
      'Refactored application structures for high loading speed, performance, and SEO.',
      'Coordinated technical operations, branding efforts, and Android app releases.',
      'Aligned online digital campaigns with lead pipelines and technical channels.'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Techco Information Technology LLC',
    location: 'Kerala, India',
    duration: 'Jul 2022 – May 2023',
    responsibilities: [
      'Engineered highly responsive web applications utilizing robust MVC code architectures.',
      'Optimized backend databases, reducing query latencies and user load wait times.',
      'Directed dynamic branding projects, enhancing customer retention by 15%.',
      'Led frontend wireframing and UX overhauls, improving mobile viewport support.'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Genova Technologies',
    location: 'Kerala, India',
    duration: 'Feb 2022 – Jul 2022',
    responsibilities: [
      'Developed modular websites using database architectures and front-end rendering engines.',
      'Assisted in technical client branding, aligning creative directions with dynamic applications.',
      'Programmed microservices and internal API hooks for secondary project synchronizations.',
      'Deployed multiple web platforms onto scalable cloud hosting environments.'
    ]
  },
  {
    title: 'Partner cum Software Developer',
    company: 'Chanakya IT Solutions',
    location: 'Kerala, India',
    duration: 'May 2013 – 2021',
    responsibilities: [
      'Engineered desktop-grade software applications for client accounting and operational needs.',
      'Coordinated cross-functional teams for multi-platform application designs and releases.',
      'Designed responsive custom websites, increasing local business user acquisition.',
      'Managed client relationship management (CRM) workflows and direct product updates.'
    ]
  },
  {
    title: 'Android Developer',
    company: 'Aabasoft InfoTech',
    location: 'Kerala, India',
    duration: 'Dec 2012 – May 2013',
    responsibilities: [
      'Coded native Android utility apps, focusing on robust layouts and background tasks.',
      'Collaborated with senior engineers on release testing, SDK updates, and bugs resolution.',
      'Provided product support, technical configurations, and device debugging processes.'
    ]
  },
  {
    title: 'IT Area In-Charge',
    company: 'Extramarks Education Pvt Ltd',
    location: 'Kerala, India',
    duration: '2011 – 2012',
    responsibilities: [
      'Coordinated educational platform setups, configurations, and IT network maintenance.',
      'Trained institutional clients and corporate users on hardware and cloud software utilities.',
      'Directed regional IT support networks across the Malabar region of Kerala.'
    ]
  }
];

const certifications = [
  { title: 'MongoDB Certified Associate Developer', organization: 'MongoDB Academy', year: '2025' },
  { title: 'Advanced Full-Stack Web Engineering', organization: 'Udemy Academic', year: '2024' },
  { title: 'Responsive Design & Front-End Specialization', organization: 'Meta / Coursera', year: '2023' },
  { title: 'Branding & Digital Marketing Strategy Professional', organization: 'Google Digital Garage', year: '2022' }
];

const languages = [
  { name: 'English', level: 'Full Professional Proficiency', percentage: 90 },
  { name: 'Malayalam', level: 'Native / Bilingual', percentage: 100 },
  { name: 'Tamil', level: 'Professional Working Proficiency', percentage: 85 },
  { name: 'Hindi', level: 'Working Proficiency', percentage: 70 }
];

const Portfolio = () => {
  const [skillsList, setSkillsList] = useState(fallbackSkills);
  const [projectsList, setProjectsList] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', text: '' }); // 'success', 'error', 'loading'
  
  // Fetch Projects and Skills from database on startup
  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsRes = await api.get('/skills');
        if (skillsRes.data.success && skillsRes.data.data.length > 0) {
          setSkillsList(skillsRes.data.data);
        }
      } catch (err) {
        console.log('Using offline technical skills fallback...');
      }

      try {
        const projectsRes = await api.get('/projects');
        if (projectsRes.data.success && projectsRes.data.data.length > 0) {
          setProjectsList(projectsRes.data.data);
        }
      } catch (err) {
        console.log('Using offline portfolio projects fallback...');
      }
    };
    fetchData();
  }, []);

  // Filter projects by category
  const filteredProjects = activeCategory === 'All'
    ? projectsList
    : projectsList.filter(proj => proj.category === activeCategory);

  const categories = ['All', 'Full Stack', 'CRM', 'E-commerce', 'Portfolio', 'API-based'];

  // Handle Contact Form Submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', text: 'Transmitting message securely...' });
    
    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        setFormStatus({
          type: 'success',
          text: 'Message dispatched successfully! Sreeraj will receive an alert.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(res.data.message || 'Transmission failed.');
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      const errorMsg = errors ? errors.map(e => e.message).join(', ') : (err.response?.data?.message || err.message || 'Error occurred');
      
      setFormStatus({
        type: 'error',
        text: `Unable to send: ${errorMsg}. Please email directly.`
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mock Resume Download function (initiates a clean print template layout)
  const downloadResume = () => {
    window.print();
  };

  return (
    <div className="section-bg-gradient min-h-screen text-slate-800 dark:text-slate-100 overflow-x-hidden pt-16">
      
      {/* ----------------- SECTION 0: HERO (Animated Introduction) ----------------- */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 grid-glow-bg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col space-y-6 text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-card border border-primary-500/20 max-w-fit text-primary-500 font-semibold text-xs uppercase tracking-wider">
              <Flame className="h-4 w-4 text-glow" />
              <span>Available for Hire (Immediate)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Hey, I'm{' '}
              <span className="bg-gradient-to-r from-primary-500 via-violet-500 to-secondary-500 bg-clip-text text-transparent block sm:inline">
                Sreeraj K T K
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200">
              Full Stack Developer & Digital Marketing Professional
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              I bridges the gap between high-performance backends and beautiful frontend pixel-perfection. Transitioning from strong PHP/MVC roots to comprehensive MERN stacks, I build modern digital ecosystems.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Sreeraj</span>
              </button>

              <button
                onClick={downloadResume}
                className="px-8 py-3.5 glass-card hover:bg-slate-50 dark:hover:bg-dark-card/50 text-slate-800 dark:text-slate-100 rounded-xl text-base font-semibold transition-all duration-300 border border-slate-300 dark:border-dark-cardBorder/60 hover:-translate-y-0.5 text-center flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5 text-primary-500" />
                <span>Print Professional Resume</span>
              </button>
            </div>

            <div className="flex space-x-6 pt-6 items-center text-slate-500 dark:text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Connect:</span>
              <a
                href="https://github.com/sreerajktk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/sreerajktk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Interactive floating graphics grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:flex justify-center"
          >
            <div className="relative w-80 h-80 flex items-center justify-center animate-float">
              {/* Outer decorative elements */}
              <div className="absolute w-72 h-72 rounded-full border border-dashed border-primary-500/30 animate-spin-slow"></div>
              <div className="absolute w-60 h-60 rounded-full border border-dashed border-secondary-500/20"></div>
              
              {/* Glowing core profile card stub */}
              <div className="w-64 h-64 glass-card rounded-3xl p-6 flex flex-col justify-between border-2 border-primary-500/20 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary-500/10 rounded-full blur-xl"></div>

                <div className="flex justify-between items-start">
                  <div className="p-3 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                    <Atom className="h-8 w-8 text-primary-500 animate-pulse-slow" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-slate-100 dark:bg-dark-cardBorder text-slate-500 dark:text-slate-300">
                    MERN EXPERT
                  </span>
                </div>

                <div className="flex flex-col space-y-1">
                  <h3 className="text-xl font-bold">SREERAJ K T K</h3>
                  <p className="text-xs text-primary-500 font-medium">Full Stack Architect</p>
                  <p className="text-[10px] text-slate-400 flex items-center pt-2">
                    <MapPin className="h-3 w-3 text-secondary-500 mr-1" /> Kozhikode, India
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- SECTION 1: PROFESSIONAL SUMMARY / ABOUT ----------------- */}
      <section id="summary" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/20 dark:border-dark-cardBorder/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block">
              Professional Summary
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-2 glass-card rounded-2xl border border-slate-200/50 max-w-sm">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80"
                  alt="Sreeraj K T K Profile"
                  className="rounded-xl shadow-md object-cover h-96 w-80 filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-6 right-6 p-4 glass-card rounded-xl border border-primary-500/20 flex flex-col items-center">
                  <span className="text-2xl font-black text-primary-500">12+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Years Experience</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Scalable Solutions & High-Performance Full Stack Execution
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                As a highly accomplished software architect with roots in core web platforms, I offer over a decade of technical project leadership. My expertise spans building MVC foundations, robust database management systems, security implementations, digital marketing tunnels, and interactive client products.
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                My recent focus centers around the high-speed Node/React/MongoDB paradigm (MERN), enabling corporations to deploy reactive admin grids, responsive frontends, automated email notification microservices, and secure JWT-based authentication loops.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm font-medium">
                <div className="flex items-center space-x-3 bg-white dark:bg-dark-card p-3 rounded-xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span>MVC Architecture Expert</span>
                </div>
                <div className="flex items-center space-x-3 bg-white dark:bg-dark-card p-3 rounded-xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span>API Integration Specialist</span>
                </div>
                <div className="flex items-center space-x-3 bg-white dark:bg-dark-card p-3 rounded-xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span>Branding & SEO Architect</span>
                </div>
                <div className="flex items-center space-x-3 bg-white dark:bg-dark-card p-3 rounded-xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <CheckCircle className="h-5 w-5 text-secondary-500 flex-shrink-0" />
                  <span>Android Release Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 2: SKILLS SECTION (Categorized) ----------------- */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block">
            Professional Skillset
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Curated list of technical proficiencies and collaborative soft skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Skills Category */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-dark-cardBorder pb-2 flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-primary-500" />
              <span>Technical & Programming Skills</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsList
                .filter(s => s.category === 'Technical')
                .map((skill, index) => {
                  const SkillIcon = iconMap[skill.icon] || Cpu;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-all duration-300 border border-slate-200/40 dark:border-dark-cardBorder/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-primary-500/10 rounded-lg border border-primary-500/20 text-primary-500">
                          <SkillIcon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{skill.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Proficiency: {skill.proficiency}%</span>
                        </div>
                      </div>
                      <div className="w-12 h-1.5 bg-slate-200 dark:bg-dark-cardBorder rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500" style={{ width: `${skill.proficiency}%` }}></div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* Soft Skills Category */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white border-b border-slate-200 dark:border-dark-cardBorder pb-2 flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary-500" />
              <span>Professional Soft Skills</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillsList
                .filter(s => s.category === 'Soft')
                .map((skill, index) => {
                  const SkillIcon = iconMap[skill.icon] || Users;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-all duration-300 border border-slate-200/40 dark:border-dark-cardBorder/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-secondary-500/10 rounded-lg border border-secondary-500/20 text-secondary-500">
                          <SkillIcon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{skill.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Level: Exceptional</span>
                        </div>
                      </div>
                      <Check className="h-5 w-5 text-secondary-500" />
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: EXPERIENCE TIMELINE ----------------- */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/20 dark:border-dark-cardBorder/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block">
              Experience Timeline
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-3 rounded-full"></div>
            <p className="text-slate-500 dark:text-slate-400 mt-4">
              A comprehensive chronicle of Sreeraj's software development career.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-dark-cardBorder ml-4 sm:ml-6 space-y-12 pb-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Timeline Pin Indicator */}
                <span className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-dark-bg border-2 border-primary-500 shadow">
                  <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                </span>

                <div className="glass-card p-6 rounded-2xl border border-slate-200/40 dark:border-dark-cardBorder/40 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full blur-xl"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div>
                      {/* Job Title first */}
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
                        {exp.title}
                      </h3>
                      {/* Company with Location */}
                      <p className="text-sm text-primary-500 font-medium">
                        {exp.company} | <span className="text-slate-400 dark:text-slate-500 text-xs font-normal">{exp.location}</span>
                      </p>
                    </div>
                    {/* Duration */}
                    <div className="inline-flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-dark-card px-2.5 py-1 rounded-lg border border-slate-200/30 dark:border-dark-cardBorder/30">
                      <Calendar className="h-3.5 w-3.5 text-secondary-500" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Bullet points of responsibilities */}
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 4: PROJECTS SHOWCASE ----------------- */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block">
            Projects Showcase
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Dynamic repository filter. Click any card to expand comprehensive features and specifications.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20'
                  : 'glass-card border-slate-200/50 text-slate-600 dark:text-slate-300 hover:border-primary-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col h-full border border-slate-200/40 dark:border-dark-cardBorder/40 cursor-pointer"
                onClick={() => setSelectedProject(proj)}
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-slate-900/80 text-white backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                      {proj.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.techStack.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary-500/10 text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-200/40 dark:border-dark-cardBorder/40 text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors">
                    <span>Explore Full Specs & Live URLs</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Project Preview Details */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-dark-cardBorder/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-64 sm:h-72 relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-6 left-6">
                    <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto max-h-[50vh]">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Scope of project
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Technical Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-sm">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start bg-slate-50 dark:bg-dark-card p-3 rounded-xl border border-slate-200/30 dark:border-dark-cardBorder/30">
                        <CheckCircle className="h-5 w-5 text-secondary-500 mr-2.5 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Engineered using
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.techStack.map(tag => (
                      <span key={tag} className="text-xs font-bold px-3 py-1 rounded bg-primary-500/10 text-primary-500 dark:text-primary-400 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200/40 dark:border-dark-cardBorder/40">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center text-sm flex items-center justify-center space-x-2 transition-colors duration-200"
                      >
                        <Github className="h-4.5 w-4.5" />
                        <span>Source Code Codebase</span>
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-center text-sm flex items-center justify-center space-x-2 transition-colors duration-200 shadow-md shadow-primary-500/15"
                      >
                        <ExternalLink className="h-4.5 w-4.5" />
                        <span>Launch Live Prototype</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ----------------- SECTION 5: EDUCATION & CERTIFICATIONS ----------------- */}
      <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/20 dark:border-dark-cardBorder/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Education Block (Diploma first, Course first then Institution) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white border-b border-slate-200 dark:border-dark-cardBorder pb-3 flex items-center space-x-2.5">
                <Briefcase className="h-6 w-6 text-primary-500" />
                <span>Education Background</span>
              </h3>

              <div className="glass-card p-6 rounded-2xl border border-slate-200/40 dark:border-dark-cardBorder/40 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-full blur-xl"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-500 bg-primary-500/10 px-2 py-1 rounded">
                  Computer Diploma
                </span>
                
                {/* Course first, then institution name */}
                <h4 className="text-xl font-bold text-slate-800 dark:text-white mt-4">
                  Computer Engineering Diploma
                </h4>
                
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
                  NTTF Tuticorin
                </p>
                
                <div className="flex items-center space-x-2 text-xs text-slate-400 mt-4 font-semibold">
                  <Calendar className="h-4 w-4 text-secondary-500" />
                  <span>2008 – 2010</span>
                </div>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white border-b border-slate-200 dark:border-dark-cardBorder pb-3 flex items-center space-x-2.5">
                <Award className="h-6 w-6 text-secondary-500 animate-pulse-slow" />
                <span>Professional Certifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-5 rounded-2xl flex items-start space-x-3.5 border border-slate-200/40 dark:border-dark-cardBorder/40 shadow-xs hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-2 bg-secondary-500/10 rounded-xl text-secondary-500 border border-secondary-500/20">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 leading-tight">
                        {cert.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">
                        {cert.organization} • {cert.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 6: LANGUAGES (Interactive Circular Rings) ----------------- */}
      <section id="languages" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block">
            Languages Proficiencies
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">
            Linguistic abilities supporting cross-region collaborations and international clients.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center text-center border border-slate-200/40 dark:border-dark-cardBorder/40 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              {/* Circular Indicator */}
              <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                <svg className="absolute w-full h-full transform -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    className="stroke-slate-100 dark:stroke-dark-cardBorder fill-transparent"
                    strokeWidth="8"
                  />
                  {/* Foreground Animated Ring */}
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    className="stroke-primary-500 fill-transparent"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 46}
                    strokeDashoffset={2 * Math.PI * 46 * (1 - lang.percentage / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex flex-col items-center justify-center z-10">
                  <span className="text-xl font-extrabold text-slate-800 dark:text-white">{lang.percentage}%</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{lang.name}</h3>
              <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{lang.level}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ----------------- SECTION 7: CONTACT FORM ----------------- */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-slate-900/30 border-t border-slate-200/20 dark:border-dark-cardBorder/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Context Left Panel */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent inline-block">
                  Let's Collaborate
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mt-3 rounded-full"></div>
                <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
                  Have an application project in mind, website maintenance tasks, api integration scopes, or full-time staffing opportunities? Drop me a direct message!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <div className="p-3 bg-primary-500/10 rounded-xl text-primary-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Calls</p>
                    <a href="tel:+919539487225" className="text-sm font-bold text-slate-800 dark:text-white hover:text-primary-500 transition-colors">
                      +91-9539487225
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <div className="p-3 bg-primary-500/10 rounded-xl text-primary-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Direct Email</p>
                    <a href="mailto:sreerajk8@gmail.com" className="text-sm font-bold text-slate-800 dark:text-white hover:text-primary-500 transition-colors">
                      sreerajk8@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 glass-card rounded-2xl border border-slate-200/40 dark:border-dark-cardBorder/40">
                  <div className="p-3 bg-primary-500/10 rounded-xl text-primary-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Location</p>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                      Kozhikode, Kerala, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Panel */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/50 dark:border-dark-cardBorder/50 shadow-lg flex flex-col space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="E.g. Sunder Pichai"
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all duration-200"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 text-left">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="E.g. sundar@google.com"
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2 text-left">
                  <label htmlFor="subject" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Subject Scope
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="E.g. MERN Full Stack Role Opportunities"
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col space-y-2 text-left">
                  <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe your requirements, timelines, budget, and scope..."
                    className="px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-cardBorder bg-white/50 dark:bg-dark-card/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all duration-200"
                  ></textarea>
                </div>

                {/* Live form notifications status block */}
                <AnimatePresence>
                  {formStatus.text && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-4 rounded-xl flex items-center space-x-3 text-sm font-medium ${
                        formStatus.type === 'loading'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : formStatus.type === 'success'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 animate-pulse'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {formStatus.type === 'loading' ? (
                        <div className="h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : formStatus.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-glow-green" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      <span>{formStatus.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="px-6 py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white rounded-xl font-bold text-center flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-md shadow-primary-500/20"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message Securely</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
export { fallbackSkills, fallbackProjects };
