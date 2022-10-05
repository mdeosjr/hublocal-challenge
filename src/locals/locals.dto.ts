import { ResponsibleDTO } from "src/companies/responsible.dto";

export class LocalDTO {
  id?: number;
  address: string;
  name: string;
  companyId: number;
  userId: number;
  createdAt?: Date;
  responsibles?: ResponsibleDTO[];
}