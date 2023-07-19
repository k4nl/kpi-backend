import OrganizationTree from "../../helpers/OrganizationTree";
import { Employee } from "../../interfaces/organization-tree.interface";
import { employeesData } from "./employees";

describe("OrganizationTree", () => {
  const employees: Employee[] = employeesData;

  it("should build the tree correctly", () => {
    // Arrange
    const organizationTree = new OrganizationTree(employees);

    // Assert

    expect(organizationTree).toBeDefined();
    expect(organizationTree.root).toBeDefined();
    expect(organizationTree.employeesMap).toBeDefined();
    expect(organizationTree.employeesMap.size).toBe(employees.length);

  });

  it("should find the root employee correctly", () => {
    // Arrange
    const organizationTree = new OrganizationTree(employees);

    // Act
    const rootEmployee = organizationTree.findRootEmployee();

    // Assert
    expect(rootEmployee).toBeDefined();
    expect(rootEmployee.user.id).toBe(1);

  });

  it("should build the subtree correctly", () => {
    // Arrange
    const organizationTree = new OrganizationTree(employees);

    // Act
    const rootEmployee = organizationTree.findRootEmployee();
    const subtree = organizationTree.buildSubtree(rootEmployee);

    // Assert
    expect(subtree).toBeDefined();
    expect(subtree.user.id).toBe(1);
    expect(subtree.children.length).toBe(3);

  });

  it("should find direct reports correctly", () => {
    // Arrange
    const organizationTree = new OrganizationTree(employees);

    // Act
    const rootEmployee = organizationTree.findRootEmployee();
    const directReports = organizationTree.findDirectReports(rootEmployee.user.id);

    // Assert
    expect(directReports).toBeDefined();
    expect(directReports.length).toBe(3);
    expect(directReports[0].manager.nome).toStrictEqual('Danielle Winters')
    expect(directReports[0].user.nome).toStrictEqual('Sharon Barr')
  });

  it("should find leaders correctly", () => {
    // Arrange
    const organizationTree = new OrganizationTree(employees);

    // Act
    const userId = 5;
    const leaders = organizationTree.findLeaders(userId);

    // Assert
    expect(leaders).toBeDefined();
    expect(leaders.length).toBe(8);
    expect(leaders[0].nome).toStrictEqual('Adam Sanders');


  });

  it("should get the node correctly", () => {
    // Arrange
    const organizationTree = new OrganizationTree(employees);

    // Act
    const userId = 5;
    const node = organizationTree.getNode(userId);

    // Assert
    expect(node.children[0].user.nome).toStrictEqual('Adam Sanders');

  });
});
