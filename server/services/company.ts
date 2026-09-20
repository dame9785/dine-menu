import { AddCompanyDto } from '@/types/company';
import { CompanyRepository } from '../repositories/company';

const companyRepository = new CompanyRepository();

export class CompanyService {
  async add(data: AddCompanyDto): Promise<{ success: boolean; message: string }> {
    if (!data.userId) {
      return {
        success: false,
        message: 'You must be logged in to create a company.',
      };
    }

    try {
      await companyRepository.add(data);

      return {
        success: true,
        message: 'Company successfully created.',
      };
    } catch (error) {
      console.error('CompanyService.add failed:', error);

      return {
        success: false,
        message: 'Failed to create company.',
      };
    }
  }
}
