// @ts-ignore;
import React, { useState, useEffect, useMemo } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Filter } from 'lucide-react';

import { SupplierFilter } from '@/components/SupplierFilter';
import { SupplierTable } from '@/components/SupplierTable';
import { SearchBar } from '@/components/SearchBar';
// 氚云标准布局
const mockSuppliers = [{
  _id: '1',
  name: '深圳华强电子有限公司',
  category: 'cat1',
  contact: '0755-88888888'
}, {
  _id: '2',
  name: '广州文具批发中心',
  category: 'cat2',
  contact: '020-66666666'
}, {
  _id: '3',
  name: '东莞电子科技有限公司',
  category: 'cat1',
  contact: '0769-77777777'
}, {
  _id: '4',
  name: '佛山办公用品有限公司',
  category: 'cat2',
  contact: '0757-55555555'
}, {
  _id: '5',
  name: '珠海电子厂',
  category: 'cat1',
  contact: '0756-44444444'
}, {
  _id: '6',
  name: '中山文具公司',
  category: 'cat2',
  contact: '0760-33333333'
}];
const categories = [{
  id: 'cat1',
  name: '电子产品'
}, {
  id: 'cat2',
  name: '办公用品'
}];
export default function Suppliers(props) {
  const {
    toast
  } = useToast();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(categories.map(c => c.id));
  const [searchQuery, setSearchQuery] = useState('');

  // 模拟氚云数据加载
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 800);
  }, []);

  // 实时筛选
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(supplier.category);
      const matchSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [suppliers, selectedCategories, searchQuery]);
  const handleFilterChange = (categoryId, checked) => {
    const updated = checked ? [...selectedCategories, categoryId] : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(updated);
  };
  return <div className="flex h-screen bg-gray-50">
      {/* 左侧导航 */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <SupplierFilter categories={categories} selectedCategories={selectedCategories} onFilterChange={handleFilterChange} />
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col">
        {/* 顶部工具栏 */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h1 className="text-lg font-medium text-gray-900">供应商管理</h1>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="搜索供应商名称" />
        </header>

        {/* 内容区域 */}
        <div className="flex-1 overflow-auto p-6">
          <SupplierTable suppliers={filteredSuppliers} categories={categories} loading={loading} />
        </div>
      </main>
    </div>;
}