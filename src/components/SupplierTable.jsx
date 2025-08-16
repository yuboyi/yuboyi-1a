// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Skeleton } from '@/components/ui';

export function SupplierTable({
  suppliers,
  categories,
  loading
}) {
  if (loading) {
    return <div className="space-y-2">
        {Array(8).fill().map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-md" />)}
      </div>;
  }
  return <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[40%] py-2 px-3 text-sm">供应商</TableHead>
            <TableHead className="w-[30%] py-2 px-3 text-sm">分类</TableHead>
            <TableHead className="w-[30%] py-2 px-3 text-sm">联系方式</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map(supplier => <TableRow key={supplier._id} className="border-b">
              <TableCell className="py-2 px-3 text-sm">{supplier.name}</TableCell>
              <TableCell className="py-2 px-3 text-sm">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${supplier.category === 'cat1' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                  {categories.find(c => c.id === supplier.category)?.name}
                </span>
              </TableCell>
              <TableCell className="py-2 px-3 text-sm text-muted-foreground">
                {supplier.contact}
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>;
}