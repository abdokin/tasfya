'use server';

import { api, RequestOptions } from '@/lib/api-client';
import { Lesson } from './lessons-service';

export type Series = {
  id: string;
  title: string;
  description: string;
  category: string;
  published_date: Date;
  lessons_count: number;
  lessons?: Lesson[];
}

export type SeriesResponse = {
  series: Series[];
  meta: {
    current_page: number,
    per_page: number,
    total_items: number,
    total_pages: number,
    categories: string[],
  }
}

export async function getAllSeries(page: number = 1, query: string = '', category= ''): Promise<SeriesResponse> {
  const options: Omit<RequestOptions, 'method' | 'body'> = {
    params: {
      page,
      title: query,
      category
    }
  };

  try {
    const response = await api.get<SeriesResponse>('series', options);
    return response;
  } catch (error) {
    console.error('Error fetching series:', error);
    return {
      series: [],
      meta: {
        current_page: page,
        per_page: 10,
        total_items: 0,
        total_pages: 0,
        categories: [],
      }
    };
  }
}

export async function getSeriesById(id: string): Promise<Series | null> {
  try {
    const response = await api.get<Series>(`series/${id}`);
    console.log("resposne", response);
    
    return response;
  } catch (error) {
    console.error('Error fetching series:', error);
    return null;
  }
}