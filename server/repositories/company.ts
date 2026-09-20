import { Company } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { AddCompanyDto } from '@/types/company';

export class CompanyRepository {
  async add(data: AddCompanyDto): Promise<Company> {
    return await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: data.companyName,
          ownerId: data.userId,
        },
      });

      await tx.user.update({
        where: {
          id: data.userId,
        },
        data: {
          role: 'company',
        },
      });

      return company;
    });
  }
}
