import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    publisher: { type: String, required: true },
    author: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  { collection: "Books", timestamps: true, toJSON: { virtuals: true } }
);

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const Book = model("Book", bookSchema);

export { bookSchema };
export default Book;
