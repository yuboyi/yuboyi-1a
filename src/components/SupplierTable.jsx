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
    return <div className="bg-white rounded-md border border-[#e6e8eb]">
        <table className="w-full">
          <thead className="chy-table-header">
            <tr>
              <th className="text-left px-3 py-2">供应商名称</th>
              <th className="text-left px-3 py-2">分类</th>
              <th className="text-left px-3 py-2">联系方式</th>
            </tr>
          </thead>
        </table>
        {Array.from({
        length: 8
      }).map((_, i) => <div key={i} className="px-3 py-2 border-t border-[#e6e8eb]">
            <Skeleton className="h-5 w-full bg-[#f5f7fa]" />
          </div>)}
      </div>;
  }
  return <div className="bg-white rounded-md border border-[#e6e8eb] overflow-hidden">
      <table className="w-full">
        <thead className="chy-table-header">
          <tr>
            <th className="text-left px-3 py-2 text-sm">供应商名称</th>
            <th className="text-left px-3 py-2 text-sm">分类</th>
            <th className="text-left px-3 py-2 text-sm">联系方式</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => <tr key={supplier._id} className="border-t border-[#e6e8eb] hover:bg-[#fafafa] transition-colors">
              <td className="px-3 py-2 text-sm text-[#262626]">{supplier.name}</td>
              <td className="px-3 py-2">
                <span className="inline-block px-2 py-0.5 text-xs rounded-full" style={{
              backgroundColor: supplier.category === 'cat1' ? '#e6f4ff' : '#fff7e6',
              color: supplier.category === 'cat1' ? '#0958d9' : '#d46b08'
            }}>
                  {categories.find(c => c.id === supplier.category)?.name}
                </span>
              </td>
              <td className="px-3 py-2 text-sm text-[#8c8c8c]">{supplier.contact}</td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}