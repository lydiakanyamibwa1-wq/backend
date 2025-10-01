// src/controllers/contactController.ts
import { Request, Response } from 'express';
import { Contact } from '../models/contactMod';
import mailerSender from '../utils/sendEmail'; // fixed import
import dotenv from 'dotenv';

dotenv.config();

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required.' });
      return;
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await mailerSender(
          adminEmail,
          'New Contact Message Received',
          `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><em>Received at: ${newContact.createdAt}</em></p>
          `
        );
      } catch (emailError) {
        console.error('Error sending admin email:', emailError);
      }
    }

    res.status(201).json({
      message: 'Contact message saved successfully.',
      contact: newContact,
    });
  } catch (error: any) {
    console.error('Error creating contact:', error.message || error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
