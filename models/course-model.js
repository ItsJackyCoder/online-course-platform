const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },

  //type: mongoose.Schema.Types.ObjectId-->mongoose給我們的primary key
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  //type:[String]:陣列裡面每個元素都是String
  students: { type: [String], default: [] },
});

module.exports = mongoose.model("Course", courseSchema);
