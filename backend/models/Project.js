const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack tags are required'],
    },
    image: {
      type: String,
      required: [true, 'Project image path or URL is required'],
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: ['Full Stack', 'CRM', 'E-commerce', 'Portfolio', 'Mobile App', 'API-based', 'Other'],
      default: 'Full Stack',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
