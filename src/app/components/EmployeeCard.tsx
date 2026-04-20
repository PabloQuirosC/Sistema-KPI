import { User, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface EmployeeCardProps {
  nombre: string;
  cargo: string;
  foto?: string;
  tareasCompletadas: number;
  totalTareas: number;
  horasTrabajadas: number;
  rendimiento: number;
}

export function EmployeeCard({
  nombre,
  cargo,
  foto,
  tareasCompletadas,
  totalTareas,
  horasTrabajadas,
  rendimiento
}: EmployeeCardProps) {
  const porcentajeCompletado = Math.round((tareasCompletadas / totalTareas) * 100);

  const getRendimientoColor = (valor: number) => {
    if (valor >= 90) return 'text-gray-800 bg-gray-100';
    if (valor >= 70) return 'text-red-700 bg-red-50';
    if (valor >= 50) return 'text-gray-700 bg-gray-100';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-red-600 to-gray-900 flex items-center justify-center overflow-hidden shadow-md flex-shrink-0">
          {foto ? (
            <img src={foto} alt={nombre} className="w-full h-full object-cover" />
          ) : (
            <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs md:text-sm font-semibold mb-0.5 truncate text-gray-900">{nombre}</h3>
          <p className="text-[10px] md:text-xs text-gray-500 truncate">{cargo}</p>
        </div>
        <div className={`px-1.5 md:px-2 py-0.5 rounded-full ${getRendimientoColor(rendimiento)} font-semibold shadow-sm flex-shrink-0`}>
          <span className="text-[10px] md:text-xs">{rendimiento}%</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-600">
            <CheckCircle className="w-3 h-3 text-gray-700" />
            <span className="text-xs font-medium">Tareas completadas</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{tareasCompletadas}/{totalTareas}</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-red-600 to-gray-900 h-2 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${porcentajeCompletado}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-3 h-3 text-red-600" />
            <span className="text-xs font-medium">Horas trabajadas</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{horasTrabajadas}h</span>
        </div>
      </div>
    </div>
  );
}
