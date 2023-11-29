import mongoose from "mongoose";
import bcrypt from "bcrypt";

enum UserTypes {
  ADMIN = "ADMIN",
  CONTRIBUTOR = "CONTRIBUTOR",
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be atleast 8 characters long"],
  },
  role: {
    type: String,
    enum: UserTypes,
    default: UserTypes.CONTRIBUTOR,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
