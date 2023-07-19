// import User from "database/models/User";
import User from "../database/models/user.model";
import CustomError from "../utils/CustomError";

class UserService {

  static async getByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new CustomError(404, 'User not found');
    return user;
  }

  static async getById(id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new CustomError(404, 'User not found');
    return user;
  }

  static async get(param: string) {
    if (param.includes('src')) {
      return await this.getByEmail(param);
    }
    return await this.getById(Number(param));
  }
}

export default UserService;