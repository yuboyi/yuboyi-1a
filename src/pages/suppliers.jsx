// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Filter } from 'lucide-react';

import { SupplierFilter } from '@/components/SupplierFilter';
import { SupplierTable } from '@/components/SupplierTable';
import { MobileFilterButton } from '@/components/MobileFilterButton';
import { SearchBar } from '@/components/SearchBar';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['cat1', 'cat2']);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 800);
  }, []);
  const filteredSuppliers = suppliers.filter(s => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(s.category);
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
  return <div className="relative h-screen bg-background">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 flex items-center border-b bg-card px-4 py-3">
        <button onClick={() => props.$w.utils.navigateBack()} className="mr-2 p-1 rounded-md hover:bg-muted">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">供应商管理</h1>
      </header>

      {/* 主内容 */}
      <main className="p-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="搜索供应商名称" />
        <SupplierTable suppliers={filteredSuppliers} categories={categories} loading={loading} />
      </main>

      {/* 侧边栏抽屉 */}
      <div className={`fixed inset-0 z-20 transform transition-transform duration-300 bg-black/10 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full w-64 bg-background shadow-lg">
          <SupplierFilter categories={categories} selectedCategories={selectedCategories} onFilterChange={(id, checked) => {
          const updated = checked ? [...selectedCategories, id] : selectedCategories.filter(c => c !== id);
          setSelectedCategories(updated);
        }} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* 悬浮筛选按钮 */}
      <MobileFilterButton onClick={() => setSidebarOpen(true)} />
    </div>;
}