// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Checkbox } from '@/components/ui';
// @ts-ignore;
import { Filter } from 'lucide-react';

import { cn } from '@/lib/utils';
export function SupplierFilter({
  categories,
  selectedCategories,
  onFilterChange,
  className
}) {
  return <div className={cn('w-64 bg-white border-r border-gray-200 flex flex-col', className)}>
      <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
        <Filter size={16} className="mr-2 text-gray-600" />
        <h3 className="font-medium text-sm text-gray-800">分类筛选</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {categories.map(category => <label key={category.id} className={cn('flex items-center px-3 py-2 rounded cursor-pointer transition-colors', selectedCategories.includes(category.id) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50')}>
            <Checkbox id={category.id} checked={selectedCategories.includes(category.id)} onCheckedChange={checked => onFilterChange(category.id, checked)} className="h-4 w-4 mr-2" />
            <span className="text-sm">{category.name}</span>
          </label>)}
      </div>
    </div>;
}