export interface AddCompanyDto {
  companyName: string;
  userId: string;
}

export type CompanyIdResponse = {
  success: boolean;
  message: string;
  data?: number;
};

export type CompanyViewModel = {
  id: number;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};
