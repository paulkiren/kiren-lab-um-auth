// src/services/emailService.js
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger.js';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async loadTemplate(templateName) {
    const templatePath = path.join(process.cwd(), 'src/templates', `${templateName}.hbs`);
    const template = await fs.readFile(templatePath, 'utf-8');
    return Handlebars.compile(template);
  }

  async sendVerificationEmail(to, verificationToken) {
    const template = await this.loadTemplate('verification');
    const html = template({
      verificationLink: `${process.env.APP_URL}/verify/${verificationToken}`
    });

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Verify Your Email',
      html
    });

    logger.info(`Verification email sent to ${to}`);
  }

  async sendPasswordReset(to, resetToken) {
    const template = await this.loadTemplate('password-reset');
    const html = template({
      resetLink: `${process.env.APP_URL}/reset-password/${resetToken}`
    });

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Password Reset Request',
      html
    });

    logger.info(`Password reset email sent to ${to}`);
  }

  async sendWelcomeEmail(to, username) {
    const template = await this.loadTemplate('welcome');
    const html = template({ username });

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: 'Welcome to Our Platform',
      html
    });

    logger.info(`Welcome email sent to ${to}`);
  }
}

export const emailService = new EmailService();
