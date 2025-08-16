// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Input } from '@/components/ui';
// @ts-ignore;
import { Search } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  placeholder = '搜索...'
}) {
  return <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="pl-9 pr-4 py-2 text-sm" />
    </div>;
}