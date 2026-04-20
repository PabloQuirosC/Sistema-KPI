import { useState } from 'react';
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Performance {
  nombre: string;
  departamento: string;
  tareasCompletadas: number;
  puntualidad: number;
  calidad: number;
  cambioSemanal: number;
  estado: 'excelente' | 'bueno' | 'regular' | 'atencion';
}

const performances: Performance[] = [
  { nombre: 'Pedro Martínez', departamento: 'Desarrollo', tareasCompletadas: 28, puntualidad: 98, calidad: 95, cambioSemanal: 12, estado: 'excelente' },
  { nombre: 'María González', departamento: 'Diseño', tareasCompletadas: 24, puntualidad: 95, calidad: 92, cambioSemanal: 8, estado: 'excelente' },
  { nombre: 'Juan Pérez', departamento: 'Desarrollo', tareasCompletadas: 26, puntualidad: 92, calidad: 88, cambioSemanal: 5, estado: 'bueno' },
  { nombre: 'Ana López', departamento: 'Marketing', tareasCompletadas: 22, puntualidad: 88, calidad: 85, cambioSemanal: -3, estado: 'bueno' },
  { nombre: 'Carlos Rodríguez', departamento: 'Ventas', tareasCompletadas: 20, puntualidad: 85, calidad: 78, cambioSemanal: 2, estado: 'regular' },
  { nombre: 'Lucía Sánchez', departamento: 'Soporte', tareasCompletadas: 18, puntualidad: 78, calidad: 72, cambioSemanal: -8, estado: 'atencion' },
];

export function EmployeePerformanceTable() {
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;

  const totalPaginas = Math.ceil(performances.length / filasPorPagina);
  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const indiceFin = indiceInicio + filasPorPagina;
  const datosPaginados = performances.slice(indiceInicio, indiceFin);

  const getStatusColor = (estado: Performance['estado']) => {
    switch (estado) {
      case 'excelente': return 'bg-gray-800 text-white';
      case 'bueno': return 'bg-gray-100 text-gray-800';
      case 'regular': return 'bg-gray-200 text-gray-800';
      case 'atencion': return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (estado: Performance['estado']) => {
    switch (estado) {
      case 'excelente': return 'Excelente';
      case 'bueno': return 'Bueno';
      case 'regular': return 'Regular';
      case 'atencion': return 'Atención';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50">
        <h3 className="text-sm font-semibold text-gray-800">Desempeño Detallado por Empleado</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Empleado</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Departamento</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Tareas</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Puntualidad</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Calidad</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Tendencia</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {datosPaginados.map((perf) => (
              <tr key={perf.nombre} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm">{perf.nombre}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{perf.departamento}</td>
                <td className="px-6 py-3 text-sm">{perf.tareasCompletadas}</td>
                <td className="px-6 py-3 text-sm">{perf.puntualidad}%</td>
                <td className="px-6 py-3 text-sm">{perf.calidad}%</td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-1">
                    {perf.cambioSemanal >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5 text-gray-700" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                    )}
                    <span className={`text-sm ${perf.cambioSemanal >= 0 ? 'text-gray-700' : 'text-red-600'}`}>
                      {Math.abs(perf.cambioSemanal)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(perf.estado)}`}>
                    {getStatusText(perf.estado)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 md:px-6 py-3 border-t border-gray-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-gradient-to-r from-gray-50/30 to-gray-100/30">
        <div className="text-xs text-gray-600 font-medium">
          Mostrando {indiceInicio + 1} a {Math.min(indiceFin, performances.length)} de {performances.length} empleados
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-700 font-semibold px-2 whitespace-nowrap">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className="p-1.5 rounded-lg border border-gray-300 hover:bg-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
