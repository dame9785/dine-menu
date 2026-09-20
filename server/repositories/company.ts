import { Company } from '@/generated/prisma/client';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { AddCompanyDto, CompanyIdResponse } from '@/types/company';
import { headers } from 'next/headers';

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

  async getUserCompanyId(userId: string): Promise<number | null> {
    const company = await prisma.company.findUnique({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });

    return company?.id ?? null;
  }
}
