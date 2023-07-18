import { User, Employee } from "@/interfaces/organization-tree.interface";

class TreeNode {
  user: User;
  children: TreeNode[];

  constructor(user: User) {
    this.user = user;
    this.children = [];
  }
}

class OrganizationTree {
  root: TreeNode;
  employeesMap: Map<number, Employee>;

  constructor(employees: Employee[]) {
    this.root = null;
    this.employeesMap = new Map();

    // Create a mapping of employees for quick access
    for (const employee of employees) {
      this.employeesMap.set(employee.user.id, employee);
    }

    this.buildTree();
  }

  buildTree() {
    const rootEmployee = this.findRootEmployee();
    this.root = this.buildSubtree(rootEmployee);
  }

  findRootEmployee(): Employee {
    for (const employee of this.employeesMap.values()) {
      if (!employee.manager) {
        return employee;
      }
    }
  }

  buildSubtree(employee: Employee): TreeNode {
    const node = new TreeNode(employee.user);
    const directReports = this.findDirectReports(employee.user.id);

    for (const report of directReports) {
      const childNode = this.buildSubtree(report);
      node.children.push(childNode);
    }

    return node;
  }

  findDirectReports(managerId: number): Employee[] {
    const directReports: Employee[] = [];

    for (const employee of this.employeesMap.values()) {
      if (employee.manager && employee.manager.id === managerId) {
        directReports.push(employee);
      }
    }

    return directReports;
  }

  findLeaders(userId: number): User[] {
    const result: User[] = [];

    const findLeadersRecursively = (node: TreeNode) => {
      if (node && node.user) {
        result.push(node.user);
        for (const child of node.children) {
          findLeadersRecursively(child);
        }
      }
    };

    findLeadersRecursively(this.getNode(userId));
    result.shift();

    return result;
  }

  getNode(userId: number): TreeNode {
    const queue: TreeNode[] = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      if (node.user.id === userId) {
        return node;
      }

      queue.push(...node.children);
    }
  }
}

export default OrganizationTree;
