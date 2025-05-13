'use server';

import { api, RequestOptions } from '@/lib/api-client';

export type Benefit = {
  id: number
  title: string
  description: string
  thumbnail_url: string
  published_date: string
  views: number
  duration: number
  category: string
  content: RichText
  audio_url: string
}

export type RichText = {
  name: string;
  body: string;
  id: string;
}

export type Response = {
  benefits: Benefit[];
  meta: {
    current_page: number,
    per_page: number,
    total_items: number,
    total_pages: number,
    offset: number,
    categories: string[],
  }
}

export async function getAllBenefits(page: number = 1, query: string = '', category= ''): Promise<Response> {
  const options: Omit<RequestOptions, 'method' | 'body'> = {
    params: {
      page,
      title: query,
      category
    },
  };
  const response = await api.get<Response>('benefits', options);
  return response;
}

export async function getRecentBenefitss(): Promise<Benefit[]> {
  const response = await api.get<Benefit[]>('benefits/recent');  
  return response;
}


export async function getBenefitById(id: number | string): Promise<Benefit> {
  const response = await api.get<Benefit>(`benefits/${id}`);
  return response;
}
