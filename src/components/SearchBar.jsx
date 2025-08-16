// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Input } from '@/components/ui';
// @ts-ignore;
import { Search } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  placeholder = '搜索'
}) {
  return <div className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8c8c8c]" />
      <Input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="chy-input pl-8 w-64" />
    </div>;
}