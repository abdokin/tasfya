import { api, RequestOptions } from '@/lib/api-client';


export interface News {
  id: number;
  title: string;
  content: string;
  description?: string; // Brief summary for listings
  published_at: string;
  slug: string;
  created_at: string;
  updated_at: string;
  thumbnail_url: string | null;
}

export interface NewsPaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
}

export interface NewsResponse {
  data: News[];
  meta: NewsPaginationMeta;
}

export async function getNews(page = 1, perPage = 10, query?: string) {
  
  const options: Omit<RequestOptions, 'method' | 'body'> = {
    params: {
      page,
      title: query,
    },
  };
  return api.get<NewsResponse>("/news", options);
}

export async function getNewsItem(slug: string) {
  return api.get<News>(`/news/${slug}`);
}

export async function getRecentNews() {
  return api.get<News[]>('/news/recent');
}
