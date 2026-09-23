import { Company } from '@/generated/prisma/client';
import { CompanyViewModel } from '@/types/company';

export class CompanyMapper {
  static companyDbToViewModel(dbo: Company): CompanyViewModel {
    return {
      id: dbo.id,
      name: dbo.name,
      ownerId: dbo.ownerId,
      createdAt: dbo.createdAt,
      updatedAt: dbo.updatedAt,
    };
  }
}
