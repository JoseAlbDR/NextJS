import { WidgetItem } from '@/components';
import React from 'react';
import SignIn from './components/SignIn';

const DashboardPage = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <SignIn />
    </div>
  );
};

export default DashboardPage;
