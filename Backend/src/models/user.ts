import { Schema, model } from "mongoose";
import { UserRole } from "../types/user.types";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    purchased: [{ type: Schema.Types.ObjectId, ref: "Book", default: [] }],
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER,
    },
  },
  { collection: "Users", toJSON: { virtuals: true } }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const User = model("User", userSchema);

export default User;
