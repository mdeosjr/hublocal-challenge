import { ResponsibleDTO } from "./responsible.dto";

export class CompanyDTO {
    id?: number;
    name: string;
    CNPJ: string;
    description: string;
    userId: number;
    createdAt?: Date;
    responsibles?: ResponsibleDTO[];
}