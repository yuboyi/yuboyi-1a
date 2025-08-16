// @ts-ignore;
import React, { useState, useEffect, useMemo } from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';
// @ts-ignore;
import { Filter, MenuUnfold, MenuFold } from 'lucide-react';

import { SupplierFilter } from '@/components/SupplierFilter';
import { SupplierTable } from '@/components/SupplierTable';
import { SearchBar } from '@/components/SearchBar';
// 氚云标准数据模型
const categories = [{
  id: 'cat1',
  name: '电子产品'
}, {
  id: 'cat2',
  name: '办公用品'
}];
const mockSuppliers = [{
  _id: '1',
  name: '深圳华强电子有限公司',
  category: 'cat1',
  contact: '0755-88888888'
}, {
  _id: '2',
  name: '广州文具批发市场',
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
  name: '珠海电子制造厂',
  category: 'cat1',
  contact: '0756-44444444'
}, {
  _id: '6',
  name: '中山文具公司',
  category: 'cat2',
  contact: '0760-33333333'
}];
export default function Suppliers(props) {
  const {
    toast
  } = useToast();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(categories.map(c => c.id));
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 模拟氚云数据加载
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 400);
  }, []);

  // 实时筛选逻辑
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier => {
      const matchCategory = selectedCategories.includes(supplier.category);
      const matchSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [suppliers, selectedCategories, searchQuery]);
  const handleFilterChange = (categoryId, checked) => {
    const updated = checked ? [...selectedCategories, categoryId] : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(updated);
  };
  return <div className="flex h-screen bg-[#f5f7fa]">
      {/* 左侧导航 */}
      <aside className={`
          bg-white border-r border-[#e6e8eb] transition-all duration-200
          ${sidebarCollapsed ? 'w-12' : 'w-56'}
        `}>
        <div className="flex items-center justify-between p-3 border-b border-[#e6e8eb]">
          {!sidebarCollapsed && <span className="text-sm font-medium text-[#262626]">导航</span>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 rounded hover:bg-[#f5f7fa]">
            {sidebarCollapsed ? <MenuUnfold size={16} /> : <MenuFold size={16} />}
          </button>
        </div>
        
        {!sidebarCollapsed && <SupplierFilter categories={categories} selectedCategories={selectedCategories} onFilterChange={handleFilterChange} className="border-0" />}
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部工具栏 */}
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e6e8eb]">
          <h1 className="text-base font-medium text-[#262626]">供应商管理</h1>
          <div className="flex items-center gap-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="搜索供应商名称" />
            <button className="chy-btn-primary">
              新增供应商
            </button>
          </div>
        </header>

        {/* 表格区域 */}
        <div className="flex-1 overflow-auto p-4">
          <SupplierTable suppliers={filteredSuppliers} categories={categories} loading={loading} />
        </div>
      </main>
    </div>;
}