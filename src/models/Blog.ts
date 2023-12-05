import mongoose, { Types } from "mongoose";

enum BlogCategory {
  FOOD = "FOOD",
  TRAVEL = "TRAVEL",
  HEALTH_AND_FITNESS = "HEALTH_AND_FITNESS",
  LIFESTYLE = "LIFESTYLE",
  FASHION_AND_BEAUTY = "FASHION_AND_BEAUTY",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  PERSONAL = "PERSONAL",
  DIY_CRAFT = "DIY_CRAFT",
  PARENTING = "PARENTING",
  MUSIC = "MUSIC",
  BUSINESS = "BUSINESS",
  ART_AND_DESIGN = "ART_AND_DESIGN",
  BOOK_AND_WRITING = "BOOK_AND_WRITING",
  PERSONAL_FINANCE = "PERSONAL_FINANCE",
  INTERIOR_DESIGN = "INTERIOR_DESIGN",
  SPORTS = "SPORTS",
  NEWS = "NEWS",
  MOVIE = "MOVIE",
  RELIGION = "RELIGION",
  POLITICAL = "POLITICAL",
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: BlogCategory,
      required: true,
    },
    createdBy: {
      userId: Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
