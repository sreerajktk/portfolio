const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Contact = require('./models/Contact');

// Load environment variables
dotenv.config();

const skills = [
  // Technical Skills
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

  // Soft Skills
  { name: 'Communication', category: 'Soft', proficiency: 95, icon: 'MessageSquare' },
  { name: 'Team Collaboration', category: 'Soft', proficiency: 90, icon: 'Users' },
  { name: 'Problem Solving', category: 'Soft', proficiency: 88, icon: 'HelpCircle' },
  { name: 'Client Handling', category: 'Soft', proficiency: 92, icon: 'UserCheck' },
  { name: 'Leadership', category: 'Soft', proficiency: 85, icon: 'TrendingUp' },
  { name: 'Time Management', category: 'Soft', proficiency: 88, icon: 'Clock' }
];

const projects = [
  {
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

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    console.log(`Connecting to database for seeding: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('Database connected!');

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Skill.deleteMany();
    await Contact.deleteMany();
    console.log('Existing collections cleared.');

    // Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail = process.env.ADMIN_EMAIL || 'sreerajk8@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'SreerajAdmin2026!';

    const adminUser = new User({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword // Will be auto-hashed on save middleware
    });

    await adminUser.save();
    console.log(`Admin user seeded: email: ${adminEmail}, password: ${adminPassword}`);

    // Seed Skills
    await Skill.insertMany(skills);
    console.log(`${skills.length} skills seeded successfully.`);

    // Seed Projects
    await Project.insertMany(projects);
    console.log(`${projects.length} projects seeded successfully.`);

    console.log('Database Seeding Completed Successfully! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDB();
