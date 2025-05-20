'use server';

import { api } from '@/lib/api-client';
import { ContactFormType } from '../validations/contact';

export type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export async function submitContact(formData: ContactFormType): Promise<Contact> {
  const response = await api.post<Contact>('contacts', { contact: formData });
  return response;
}
