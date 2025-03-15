// File: app/page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/overview';
import { RecentTransactions } from '@/components/recent-transactions';
import { ExpenseBreakdown } from '@/components/expense-breakdown';

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Personal Finance Dashboard</h1>
      
      <Overview />
      
      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseBreakdown />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// File: app/settings/page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Settings form components would go here */}
          <p>Settings content</p>
        </CardContent>
      </Card>
    </div>
  );
}

// File: components/overview.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Overview() {
  // In a real app, we'd fetch this data from an API
  const summaryData = {
    totalBalance: 12750.42,
    monthlyIncome: 4500.00,
    monthlyExpenses: 3200.75,
    savings: 1299.25
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.totalBalance.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.monthlyIncome.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.monthlyExpenses.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.savings.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}

// File: components/recent-transactions.tsx
import React from 'react';

export function RecentTransactions() {
  // In a real app, we'd fetch this data from an API
  const transactions = [
    { id: 1, description: 'Grocery Store', amount: -120.50, date: '2025-03-14' },
    { id: 2, description: 'Salary Deposit', amount: 2250.00, date: '2025-03-12' },
    { id: 3, description: 'Internet Bill', amount: -75.99, date: '2025-03-10' },
    { id: 4, description: 'Coffee Shop', amount: -5.75, date: '2025-03-09' },
    { id: 5, description: 'Gas Station', amount: -45.82, date: '2025-03-08' },
  ];

  return (
    <div className="space-y-4">
      {transactions.map(transaction => (
        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="font-medium">{transaction.description}</div>
            <div className="text-sm text-gray-500">{transaction.date}</div>
          </div>
          <div className={`font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
            {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

// File: components/expense-breakdown.tsx
import React from 'react';

export function ExpenseBreakdown() {
  // In a real app, we'd fetch this data from an API
  const categories = [
    { name: 'Housing', amount: 1500, percentage: 46.9 },
    { name: 'Food', amount: 600, percentage: 18.7 },
    { name: 'Transportation', amount: 400, percentage: 12.5 },
    { name: 'Utilities', amount: 300, percentage: 9.4 },
    { name: 'Entertainment', amount: 250, percentage: 7.8 },
    { name: 'Other', amount: 150.75, percentage: 4.7 },
  ];

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{category.name}</span>
            <span className="text-sm">${category.amount.toFixed(2)} ({category.percentage}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${category.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// File: next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Enable optimization for fonts and images
  optimizeFonts: true,
  // Enable webpack analyzer in production builds to diagnose large bundles
  webpack: (config, { isServer, dev }) => {
    // Only run in production builds
    if (!dev) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer ? '../analyze/server.html' : './analyze/client.html',
          openAnalyzer: false,
        })
      );
    }
    return config;
  },
}
