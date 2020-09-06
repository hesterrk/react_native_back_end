const mongoose = require("mongoose");
const { Schema } = mongoose;

var postSchema = new Schema({
  //this type is referencing our Users schema!
  // username: {
  //   type: Schema.ObjectId,
  //   ref: "Users",
  // },

  caption: String,
  // image: {
  //   type: Buffer,
  //   required: true,
  // },
  time_posted: {
    type: Date,
    default: Date.now,
  },
});

// To use the schema we need to compile it into a model (which is an instance of our schema)
// Model is a class with which we construct documents
// Each document will be a user with properties and behaviors as declared in our schema
module.exports = mongoose.model("Posts", postSchema);

// Mongoose automatically adds id property to each schema
