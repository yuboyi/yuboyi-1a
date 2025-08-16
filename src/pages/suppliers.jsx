// @ts-ignore;
import React, { useState, useEffect, useMemo } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Filter } from 'lucide-react';

import { SupplierFilter } from '@/components/SupplierFilter';
import { SupplierTable } from '@/components/SupplierTable';
import { SearchBar } from '@/components/SearchBar';
// 模拟数据（实际应从云开发数据库获取）
const mockSuppliers = [{
  _id: '1',
  name: '深圳华强电子',
  category: 'cat1',
  contact: '0755-88888888'
}, {
  _id: '2',
  name: '广州文具批发',
  category: 'cat2',
  contact: '020-66666666'
}, {
  _id: '3',
  name: '东莞电子科技',
  category: 'cat1',
  contact: '0769-77777777'
}, {
  _id: '4',
  name: '佛山办公用品',
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
}, {
  _id: '7',
  name: '惠州电子供应',
  category: 'cat1',
  contact: '0752-22222222'
}, {
  _id: '8',
  name: '汕头办公批发',
  category: 'cat2',
  contact: '0754-11111111'
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 模拟异步加载
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 600);
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
  return <div className="flex h-screen bg-background">
      {/* 移动端遮罩 */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* 侧边栏 */}
      <aside className={`
          fixed md:static top-0 left-0 h-full z-30
          transform transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}>
        <SupplierFilter categories={categories} selectedCategories={selectedCategories} onFilterChange={handleFilterChange} onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* 主内容 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部工具栏 */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-card">
          <h1 className="text-xl font-semibold text-foreground">供应商管理</h1>
          <div className="flex items-center gap-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="搜索供应商名称" />
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md hover:bg-muted" aria-label="打开筛选">
              <Filter size={20} />
            </button>
          </div>
        </header>

        {/* 表格区域 */}
        <div className="flex-1 overflow-y-auto p-4">
          <SupplierTable suppliers={filteredSuppliers} categories={categories} loading={loading} />
        </div>
      </main>
    </div>;
}