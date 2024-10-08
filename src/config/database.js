const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://bhavanamatavalam:BRjs11S914Esymhs@bombardingnode.2mw7z.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };


