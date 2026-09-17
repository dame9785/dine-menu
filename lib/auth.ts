import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),

  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Reset your Dine Menu password',
        html: `
          <h1>Reset your password</h1>

          <p>Hello ${user.name},</p>

          <p>Click the link below to reset your password:</p>

          <a href="${url}">
            Reset Password
          </a>

          <p>This link will expire after a limited time.</p>
        `,
      });
    },

    revokeSessionsOnPasswordReset: true,
  },
});
