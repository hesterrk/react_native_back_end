import mongoose, { Schema } from "mongoose";

var postSchema = new Schema({
    //this type is referncing our Users schema!
  username: {
    type: Schema.ObjectId,
    ref: 'Users',
  },

  title: String,
  caption: String,
  image: Buffer,
  time_posted: {
    type: Date,
    default: Date.now,
  },
});

// To use the schema we need to compile it into a model (which is an instance of our schema)
// Model is a class with which we construct documents
// Each document will be a user with properties and behaviors as declared in our schema
var Users = mongoose.model("Posts", postSchema);

export default Users;

// Mongoose automatically adds id property to each schema




