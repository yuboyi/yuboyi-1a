// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Skeleton } from '@/components/ui';

import { cn } from '@/lib/utils';
export function SupplierTable({
  suppliers,
  categories,
  loading
}) {
  if (loading) {
    return <div className="space-y-2">
        {Array.from({
        length: 8
      }).map((_, i) => <Skeleton key={i} className="h-10 w-full rounded-md" />)}
      </div>;
  }
  return <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-2/5 py-2 text-sm font-semibold">供应商名称</TableHead>
            <TableHead className="w-1/5 py-2 text-sm font-semibold">分类</TableHead>
            <TableHead className="w-2/5 py-2 text-sm font-semibold">联系方式</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map(supplier => <TableRow key={supplier._id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
              <TableCell className="py-2.5 text-sm">{supplier.name}</TableCell>
              <TableCell className="py-2.5 text-sm">
                <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', supplier.category === 'cat1' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800')}>
                  {categories.find(c => c.id === supplier.category)?.name}
                </span>
              </TableCell>
              <TableCell className="py-2.5 text-sm text-muted-foreground">
                {supplier.contact}
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>;
}