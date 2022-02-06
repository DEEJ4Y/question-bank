const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const QuestionSchema = new mongoose.Schema(
  {
    question: [
      {
        type: String,
        minLength: [1, "Question must be at least 3 characters. "],
        required: [true, "Please add a question. "],
      },
    ],
    searchKeywords: [
      {
        type: String,
        trim: true,
        select: false,
      },
    ],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

QuestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Question", QuestionSchema);
