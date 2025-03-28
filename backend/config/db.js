const mongoose = require("mongoose");

const DBconnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true
    });
    console.log(`MongoDb Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit();
  }
};

module.exports = DBconnect;
