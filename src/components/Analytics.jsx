import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart } from 'lucide-react';
import { productsApi } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalValue: 0,
    averagePrice: 0,
    totalStock: 0,
    lowStockItems: 0,
    categoryBreakdown: {},
    loading: true
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await productsApi.getAll();
      const products = response.data;
      
      const totalValue = products.reduce((sum, product) => sum + (product.precio * product.stock), 0);
      const averagePrice = products.length > 0 ? products.reduce((sum, product) => sum + product.precio, 0) / products.length : 0;
      const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
      const lowStockItems = products.filter(product => product.stock < 10).length;
      
      const categoryBreakdown = products.reduce((acc, product) => {
        acc[product.categoria] = (acc[product.categoria] || 0) + 1;
        return acc;
      }, {});

      setAnalytics({
        totalValue,
        averagePrice,
        totalStock,
        lowStockItems,
        categoryBreakdown,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics(prev => ({ ...prev, loading: false }));
    }
  };

  if (analytics.loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
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

  const metrics = [
    {
      name: 'Total Inventory Value',
      value: `$${analytics.totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+12%',
      trendUp: true
    },
    {
      name: 'Average Product Price',
      value: `$${analytics.averagePrice.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+5%',
      trendUp: true
    },
    {
      name: 'Total Stock Units',
      value: analytics.totalStock.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '-2%',
      trendUp: false
    },
    {
      name: 'Low Stock Items',
      value: analytics.lowStockItems,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '+3',
      trendUp: false
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Insights into your business performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="card p-6 hover:shadow-medium transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center text-sm ${metric.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trendUp ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.trend}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600">{metric.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(analytics.categoryBreakdown).map(([category, count]) => {
                const percentage = ((count / Object.values(analytics.categoryBreakdown).reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-3 w-3 bg-primary-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-900 capitalize">{category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{count} items</span>
                      <span className="text-sm text-gray-400">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Performance Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Revenue Growth</p>
                  <p className="text-2xl font-bold text-green-900">+15.3%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-blue-900">4.8/5</p>
                </div>
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">★</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-purple-800">Order Fulfillment</p>
                  <p className="text-2xl font-bold text-purple-900">98.2%</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;