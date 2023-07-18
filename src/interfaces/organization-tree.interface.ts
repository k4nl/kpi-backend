export interface User {
  id: number;
  nome: string; 
  data_de_admissao: string | Date;
  data_de_rescisao?: string | Date | null;
}

export interface Employee {
  user: User;
  manager: User | null;
}