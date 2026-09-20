export interface AddCompanyDto {
  companyName: string;
  userId: string;
}

export type CompanyIdResponse = {
  success: boolean;
  message: string;
  data?: number;
};
