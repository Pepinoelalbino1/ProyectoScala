import { useState, useEffect } from 'react';
import { Users, Package, Truck, TrendingUp } from 'lucide-react';
import { usersApi, productsApi, suppliersApi } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    suppliers: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, suppliersRes] = await Promise.all([
          usersApi.getAll(),
          productsApi.getAll(),
          suppliersApi.getAll()
        ]);

        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          suppliers: suppliersRes.data.length,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Total Users',
      value: stats.users,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      name: 'Products',
      value: stats.products,
      icon: Package,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      name: 'Suppliers',
      value: stats.suppliers,
      icon: Truck,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      name: 'Growth',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ];

  if (stats.loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card p-6 hover:shadow-medium transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New user registered</p>
                <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">Product updated</p>
                <span className="text-xs text-gray-400 ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm text-gray-600">New supplier added</p>
                <span className="text-xs text-gray-400 ml-auto">10 min ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full btn-primary text-left">
                Add New Product
              </button>
              <button className="w-full btn-secondary text-left">
                Manage Users
              </button>
              <button className="w-full btn-secondary text-left">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;