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
    required: [true, 'Must Enter Last Name'],
  },
  email: {
    type: String,
    required: [true, 'Must Enter Email'],
  },

  password: {
    type:String,
    required: true,
    minlength: [5, 'Password mininum character length has to be greater than 5']
  },
});

// To use the schema we need to compile it into a model (which is an instance of our schema)
// Model is a class with which we construct documents
// Each document will be a user with properties and behaviors as declared in our schema
var Users = mongoose.model("Users", authSchema);

export default Users;

// Mongoose automatically adds id property to each schema
