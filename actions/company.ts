'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActionResponse } from '@/types/action-response';
import { headers } from 'next/headers';
import { CompanyService } from '@/server/services/company';
import { AddCompanyDto } from '@/types/company';

const companyService = new CompanyService();
export async function createCompany(company: string): Promise<ActionResponse> {
  if (!company.trim()) {
    return {
      success: false,
      message: 'Company name is empty',
    };
  }

  try {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session) {
      return {
        success: false,
        message: 'You need to be logged in',
      };
    }

    const userId = session.user.id;

    const existingCompany = await prisma.company.findUnique({
      where: {
        ownerId: userId,
      },
    });

    if (existingCompany) {
      return {
        success: false,
        message: 'You already own a company',
      };
    }

    const data: AddCompanyDto = {
      companyName: company,
      userId: userId,
    };

    const result = await companyService.add(data);
    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: 'Company created successfully',
    };
  } catch (error) {
    console.error('createCompany error:', error);

    return {
      success: false,
      message: 'Failed to create company',
    };
  }
}
