import React from 'react';
import { useForms } from '../../contexts/FormsContext';
import { BarChart3, TrendingUp, FileText, Users } from 'lucide-react';

const AnalyticsView: React.FC = () => {
  const { forms } = useForms();

  const totalForms = forms.length;
  const publishedForms = forms.filter(form => form.isPublished).length;
  const totalResponses = forms.reduce((sum, form) => sum + form.responseCount, 0);
  const avgResponsesPerForm = totalForms > 0 ? Math.round(totalResponses / totalForms) : 0;

  const stats = [
    {
      label: 'Total Forms',
      value: totalForms,
      icon: FileText,
      color: 'blue',
      change: '+12%'
    },
    {
      label: 'Published Forms',
      value: publishedForms,
      icon: TrendingUp,
      color: 'emerald',
      change: '+8%'
    },
    {
      label: 'Total Responses',
      value: totalResponses,
      icon: Users,
      color: 'purple',
      change: '+24%'
    },
    {
      label: 'Avg per Form',
      value: avgResponsesPerForm,
      icon: BarChart3,
      color: 'amber',
      change: '+16%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of your form performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {forms.slice(0, 5).map((form) => (
            <div key={form.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{form.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {form.responseCount} responses
                  </p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                form.isPublished 
                  ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {form.isPublished ? 'Published' : 'Draft'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;