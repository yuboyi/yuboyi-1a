// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { Filter } from 'lucide-react';

export function MobileFilterButton({
  onClick
}) {
  return <Button variant="outline" size="sm" className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg md:hidden" onClick={onClick}>
      <Filter size={20} />
    </Button>;
}