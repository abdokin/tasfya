'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function NewsSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const currentQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(currentQuery);
  
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    
    // Reset to first page when searching
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`);
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mb-6 gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="بحث في الأخبار..."
        className="flex-grow"
      />
      <Button type="submit" className="bg-primary hover:bg-primary/90">
        <Search className="h-4 w-4 ml-2" />
        بحث
      </Button>
    </form>
  );
}
