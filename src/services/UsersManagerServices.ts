import User from "@/models/user.model";
import UsersManager from "@/models/userManager.model";

class UsersManagerServices {
  static async getAll() {
    const usersManager = await UsersManager.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'data_de_admissao', 'data_de_rescisao', 'nome', 'status'] },
        { model: User, as: 'manager', attributes: ['id', 'data_de_admissao', 'data_de_rescisao', 'nome', 'status'] }
      ],
      attributes: [],
    })
    return usersManager;
  }
}

export default UsersManagerServices;