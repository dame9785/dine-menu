import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

import { resetPasswordEmail } from '@/lib/email-templates/reset-password-email';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'mysql',
  }),

  // =========================
  // USER
  // =========================

  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'user',
        input: false,
      },
    },

    // Allow users to change their email
    changeEmail: {
      enabled: true,
      requireVerification: false,
    },
  },

  // =========================
  // EMAIL VERIFICATION
  // =========================

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your new email - Dine Menu',

        html: `
          <h1>Verify your email address</h1>

          <p>Hello ${user.name || 'there'},</p>

          <p>
            Click the link below to verify your email address.
          </p>

          <a href="${url}">
            Verify email
          </a>
        `,
      });
    },
  },

  // =========================
  // EMAIL & PASSWORD
  // =========================

  emailAndPassword: {
    enabled: true,

    // Send reset password email
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

    // Revoke sessions after password reset
    revokeSessionsOnPasswordReset: true,
  },
});
