// import User from "database/models/User";
import User from "../database/models/user.model";
import CustomError from "../utils/CustomError";

class UserService {

  static transformEmail(email: string) {
    if (email.includes('@kpis.tech')) return email;
    return `${email}@kpis.tech`;
  }

  static async getByEmail(email: string) {
    const user = await User.findOne({ where: { email: UserService.transformEmail(email) } });
    if (!user) throw new CustomError(404, 'User not found');
    return user;
  }

  static async getById(id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new CustomError(404, 'User not found');
    return user;
  }

  static async get(param: string) {
    if (!isNaN(param as any)) {
      return await this.getById(Number(param));
    }
    return await this.getByEmail(param);
  }
}

export default UserService;