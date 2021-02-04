const User = require('../models/User');
const { QuizComment } = require('../models/QuizComment');
const { makeResponse, validate } = require('../utils/functions');
const messages = require('../utils/responseMessages');
const responseTypes = require('../utils/responseTypes');

class CommentsService {
  addComment = async req => {
    const comment = { ...req.body, authorId: req.user._id };

    try {
      const commentValidation = validate(req);
      if (!commentValidation.isEmpty()) {
        throw makeResponse(messages.ADDING_COMMENT_VALIDATION_ERROR, responseTypes.error);
      }

      const [author] = await User.find({ _id: comment.authorId });
      if (!author._id) {
        throw makeResponse(messages.ADDING_COMMENT_ERROR, responseTypes.error);
      }

      author.password = null;
      const commentId = await QuizComment.create({ ...comment });
      if (commentId._id) {
        return makeResponse(messages.ADDING_COMMENT_SUCCESS, responseTypes.success);
      } else {
        throw makeResponse(messages.ADDING_COMMENT_ERROR, responseTypes.error);
      }
    } catch (e) {
      return e;
    }
  };
}

const Service = new CommentsService();

module.exports = Service;
