// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';

import { cn } from '@/lib/utils';
export function SupplierTable({
  suppliers,
  categories,
  loading
}) {
  if (loading) {
    return <div className="bg-white rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">供应商名称</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">分类</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">联系方式</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({
            length: 5
          }).map((_, i) => <tr key={i} className="border-t border-gray-200">
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>;
  }
  return <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">供应商名称</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">分类</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">联系方式</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {suppliers.map(supplier => <tr key={supplier._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-900">{supplier.name}</td>
              <td className="px-4 py-3">
                <span className={cn('inline-flex items-center px-2 py-0.5 rounded text-xs font-medium', supplier.category === 'cat1' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800')}>
                  {categories.find(c => c.id === supplier.category)?.name}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{supplier.contact}</td>
            </tr>)}
        </tbody>
      </table>
    </div>;
}