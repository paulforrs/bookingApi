const mongoose = require("mongoose")
const validator = require("validator")
const { default: isEmail } = require("validator/lib/isEmail")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate:[isEmail, "Please enter a valid email"]
    },
    jti: String,
    exp: Number,
    nbf: Number,
    iat: Number,
    name:{
        type: String
    },
    isAdmin:{
        type: Boolean,
        require: true
    }

})
// password hashing
userSchema.pre('save', async function (next) {
    const user = this;
  
    // Check if the password is modified or new
    if (!user.isModified('password')) return next();
  
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password with the generated salt
      const hashedPassword = await bcrypt.hash(user.password, salt);
  
      // Replace the plain password with the hashed one
      user.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (userPassword) {
    try {
      // Compare the provided password with the hashed password
      console.log('compared pass')
      return await bcrypt.compare(userPassword, this.password);
    } catch (error) {
      throw error;
    }
  };
// create Token
userSchema.methods.createToken = async function(){
    
}

module.exports = mongoose.model("User", userSchema)
// module.exports = User