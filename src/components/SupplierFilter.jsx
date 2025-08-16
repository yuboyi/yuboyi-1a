// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Checkbox } from '@/components/ui';
// @ts-ignore;
import { Filter, X } from 'lucide-react';

import { cn } from '@/lib/utils';
export function SupplierFilter({
  categories,
  selectedCategories,
  onFilterChange,
  className,
  onClose // 移动端折叠用
}) {
  return <div className={cn('w-full md:w-64 bg-card border-r border-border flex flex-col', className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-base text-foreground">分类筛选</h3>
        {onClose && <button onClick={onClose} className="p-1 rounded-md hover:bg-muted md:hidden" aria-label="关闭筛选">
            <X size={16} />
          </button>}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {categories.map(category => <label key={category.id} className={cn('flex items-center space-x-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors', selectedCategories.includes(category.id) ? 'bg-accent/20 text-accent-foreground' : 'hover:bg-muted/60')}>
            <Checkbox id={category.id} checked={selectedCategories.includes(category.id)} onCheckedChange={checked => onFilterChange(category.id, checked)} className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">{category.name}</span>
          </label>)}
      </div>
    </div>;
}