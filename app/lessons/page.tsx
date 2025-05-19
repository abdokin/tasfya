"use server";
import { redirect } from 'next/navigation';

export default async function LessonsPage() {
  redirect('/series');
  return null; // This line will never be reached
}