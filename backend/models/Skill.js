const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Technical', 'Soft'],
      default: 'Technical',
    },
    proficiency: {
      type: Number,
      required: [true, 'Skill proficiency percentage is required'],
      min: [0, 'Proficiency cannot be less than 0'],
      max: [100, 'Proficiency cannot exceed 100'],
      default: 80,
    },
    icon: {
      type: String,
      default: 'Code', // Name of Lucide React icon to display dynamically
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', SkillSchema);
