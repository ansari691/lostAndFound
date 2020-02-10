const mongoose = require("mongoose");

const PostAdSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  description : {
    type : String
  },
  date: {
    type: Date,
    default: Date.now
  },
  image : {
    type : String
  },
  requestor : {
    type : String
  },
  name : {
    type : String
  },
  location : {
    type : String
  },
  phone : {
    type : Number
  },
  email : {
    type : String
  }

});

module.exports = Post = mongoose.model("post", PostAdSchema);
