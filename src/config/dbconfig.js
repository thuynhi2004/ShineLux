const mongoose = require("mongoose");

async function connect() {
  try {
    const databaseUrl =
      "mongodb+srv://ThuyNhi:1234@cluster0.hnlfqgb.mongodb.net/ShineLux?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(databaseUrl);
    console.log("Kết nối database thành công!");
  } catch (error) {
    console.log(`Lỗi: ${error}`);
  }
}

module.exports = { connect };
