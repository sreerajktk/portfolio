const mongoose = require('mongoose');

const testConnection = async () => {
  const uri = "mongodb+srv://sreerajk8_db_user:YLj3ESbt6CVELD44@cluster0.vzxle3e.mongodb.net/portfolio?appName=Cluster0";
  console.log("Testing MongoDB connection locally...");
  try {
    await mongoose.connect(uri);
    console.log("SUCCESS: Connected to MongoDB Atlas successfully! 🎉");
    process.exit(0);
  } catch (error) {
    console.error("ERROR: Failed to connect!");
    console.error(error.message);
    process.exit(1);
  }
};

testConnection();
