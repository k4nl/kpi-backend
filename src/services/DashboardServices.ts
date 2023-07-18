import OrganizationTree from "@/helpers/OrganizationTree";
import UserService from "./UserServices";
import UsersManagerServices from "@/services/UsersManagerServices";

class DashboardServices {

  static async get(id: number) {
    const user = await UserService.getById(id);
    const employees = await UsersManagerServices.getAll();
    const organizationTree = new OrganizationTree(employees);
    return organizationTree.findLeaders(user.id).sort((a, b) => a.data_de_admissao > b.data_de_admissao ? 1 : -1)
  }


}

export default DashboardServices;