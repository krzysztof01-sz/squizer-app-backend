const CommentsService = require('../services/commentsService');
const responseTypes = require('../utils/responseTypes');

module.exports.commentsController = {
  addComment: async (req, res) => {
    if (req.user) {
      const { type, msg } = await CommentsService.addComment(req);
      if (type === responseTypes.success) {
        res.status(201).json({ msg, type });
      } else {
        res.status(401).json({ msg, type });
      }
    }
  },
};
