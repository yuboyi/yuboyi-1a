// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Checkbox } from '@/components/ui';
// @ts-ignore;
import { Filter } from 'lucide-react';

export function SupplierFilter({
  categories,
  selectedCategories,
  onFilterChange,
  className
}) {
  return <div className={className}>
      <div className="p-3 border-b border-[#e6e8eb]">
        <h3 className="text-sm font-medium text-[#262626] flex items-center">
          <Filter size={14} className="mr-2" />
          分类筛选
        </h3>
      </div>
      
      <div className="p-2">
        {categories.map(category => <label key={category.id} className="flex items-center px-2 py-1.5 rounded hover:bg-[#f5f7fa] cursor-pointer">
            <Checkbox id={category.id} checked={selectedCategories.includes(category.id)} onCheckedChange={checked => onFilterChange(category.id, checked)} className="h-3.5 w-3.5 mr-2 data-[state=checked]:bg-[#1677ff]" />
            <span className="text-sm text-[#595959]">{category.name}</span>
          </label>)}
      </div>
    </div>;
}