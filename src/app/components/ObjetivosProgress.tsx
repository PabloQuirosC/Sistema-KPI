import { Target, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Objetivo {
  id: number;
  nombre: string;
  tareasCompletadas: number;
  tareasEnProgreso: number;
  tareasPendientes: number;
  porcentajeCompletado: number;
}

const objetivosData: Objetivo[] = [
  { id: 1, nombre: 'Lanzamiento versión 2.0', tareasCompletadas: 3, tareasEnProgreso: 2, tareasPendientes: 1, porcentajeCompletado: 50 },
  { id: 2, nombre: 'Incrementar engagement 20%', tareasCompletadas: 1, tareasEnProgreso: 1, tareasPendientes: 2, porcentajeCompletado: 25 },
  { id: 3, nombre: 'Automatizar ventas Q2', tareasCompletadas: 2, tareasEnProgreso: 3, tareasPendientes: 0, porcentajeCompletado: 40 },
  { id: 4, nombre: 'Mejorar calidad código', tareasCompletadas: 4, tareasEnProgreso: 0, tareasPendientes: 0, porcentajeCompletado: 100 },
  { id: 5, nombre: 'Reducir tiempo respuesta 30%', tareasCompletadas: 0, tareasEnProgreso: 0, tareasPendientes: 3, porcentajeCompletado: 0 },
];

export function ObjetivosProgress() {
  const getEstadoColor = (porcentaje: number) => {
    if (porcentaje === 100) return 'text-gray-800 bg-gray-100';
    if (porcentaje >= 50) return 'text-red-700 bg-red-50';
    if (porcentaje > 0) return 'text-gray-700 bg-gray-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getProgressColor = (porcentaje: number) => {
    if (porcentaje === 100) return 'bg-gray-800';
    if (porcentaje >= 50) return 'bg-gradient-to-r from-red-600 to-gray-900';
    if (porcentaje > 0) return 'bg-gray-500';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-gradient-to-br from-red-600 to-gray-900 rounded-lg shadow-md">
          <Target className="w-3.5 h-3.5 text-white" />
        </div>
        <h3 className="text-xs md:text-sm font-semibold text-gray-900">Objetivos y Metas</h3>
      </div>

      <div className="space-y-2 md:space-y-3 flex-1 overflow-y-auto">
        {objetivosData.map((objetivo) => {
          const totalTareas = objetivo.tareasCompletadas + objetivo.tareasEnProgreso + objetivo.tareasPendientes;

          return (
            <div key={objetivo.id} className="border border-gray-200/50 rounded-xl p-3 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-md hover:border-red-200 transition-all duration-200">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs mb-1 truncate">{objetivo.nombre}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-gray-700 flex-shrink-0" />
                      <span className="text-[10px]">{objetivo.tareasCompletadas}</span>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <Clock className="w-3 h-3 text-red-600 flex-shrink-0" />
                      <span className="text-[10px]">{objetivo.tareasEnProgreso}</span>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <AlertCircle className="w-3 h-3 text-gray-600 flex-shrink-0" />
                      <span className="text-[10px]">{objetivo.tareasPendientes}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap flex-shrink-0 ${getEstadoColor(objetivo.porcentajeCompletado)}`}>
                  {objetivo.porcentajeCompletado}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(objetivo.porcentajeCompletado)}`}
                  style={{ width: `${objetivo.porcentajeCompletado}%` }}
                ></div>
              </div>

              <p className="text-[10px] text-gray-500 mt-1.5">{totalTareas} tareas totales</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
