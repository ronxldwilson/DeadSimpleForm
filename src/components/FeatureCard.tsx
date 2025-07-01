"use client";

import { DivideIcon as LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface FeatureCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl transition-all duration-300 ${
          isHovered 
            ? 'bg-gradient-to-br from-purple-600 to-blue-600 scale-110' 
            : 'bg-gradient-to-br from-purple-100 to-blue-100'
        }`}>
          <Icon className={`h-6 w-6 transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-purple-600'
          }`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      {/* Hover gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
}