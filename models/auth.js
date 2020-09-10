import mongoose, { Schema } from "mongoose";

var authSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    String,
    required: true,
  },
});

// To use the schema we need to compile it into a model (which is an instance of our schema)
// Model is a class with which we construct documents
// Each document will be a user with properties and behaviors as declared in our schema
var Users = mongoose.model("Users", authSchema);

export default Users;

// Mongoose automatically adds id property to each schema
