const User = require('../models/User');
const responseTypes = require('../utils/responseTypes');

class UserService {
  async getUser(id) {
    try {
      const [searchedUser] = await User.find({ _id: id });
      if (searchedUser) {
        return {
          type: responseTypes.success,
          user: searchedUser,
        };
      } else throw { type: responseTypes.error };
    } catch (e) {
      return e;
    }
  }
}

const Service = new UserService();

module.exports = Service;
