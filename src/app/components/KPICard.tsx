import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  iconColor: string;
}

export function KPICard({ title, value, change, icon: Icon, iconColor }: KPICardProps) {
  const isPositive = change >= 0;

  const getGradient = () => {
    if (iconColor.includes('blue')) return 'from-red-600 to-red-800';
    if (iconColor.includes('green')) return 'from-gray-700 to-gray-900';
    if (iconColor.includes('purple')) return 'from-red-700 to-black';
    if (iconColor.includes('orange')) return 'from-red-500 to-red-700';
    return 'from-gray-600 to-gray-800';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-red-200 transition-all duration-300 group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] md:text-xs text-gray-500 mb-1 font-medium truncate">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900 mb-0.5 md:mb-1">{value}</p>
          <div className="flex items-center gap-1 flex-wrap">
            <span className={`text-[10px] md:text-xs font-semibold ${isPositive ? 'text-gray-700' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 hidden sm:inline">vs mes anterior</span>
          </div>
        </div>
        <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gradient-to-br ${getGradient()} shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
        </div>
      </div>
    </div>
  );
}
