import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

import { resetPasswordEmail } from '@/lib/email-templates/reset-password-email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user',
        input: false,
      },
    },
  },

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL;

      if (!logoUrl) {
        throw new Error('NEXT_PUBLIC_LOGO_URL is missing');
      }

      await sendEmail({
        to: user.email,
        subject: 'Reset your Dine Menu password',
        html: resetPasswordEmail({
          userName: user.name || 'there',
          resetUrl: url,
          logoUrl,
        }),
      });
    },

    revokeSessionsOnPasswordReset: true,
  },
});
