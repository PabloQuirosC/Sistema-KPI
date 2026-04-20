import { useState } from 'react';
import { FileText, Download, Calendar, Filter, Users, FolderKanban, Clock, TrendingUp, BarChart3, PieChart, FileSpreadsheet } from 'lucide-react';

interface Reporte {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  icono: any;
  frecuencia: string;
  ultimaGeneracion?: string;
}

const reportesDisponibles: Reporte[] = [
  { id: 1, nombre: 'Estado General de Proyectos', categoria: 'Proyectos', descripcion: 'Vista panorámica de todos los proyectos activos', icono: FolderKanban, frecuencia: 'Semanal', ultimaGeneracion: '2026-04-18' },
  { id: 2, nombre: 'Proyectos Críticos / En Riesgo', categoria: 'Proyectos', descripcion: 'Proyectos con retraso o en riesgo', icono: TrendingUp, frecuencia: 'Diaria', ultimaGeneracion: '2026-04-20' },
  { id: 3, nombre: 'Tareas Pendientes por Vencer', categoria: 'Tareas', descripcion: 'Tareas próximas a su fecha límite', icono: Clock, frecuencia: 'Diaria', ultimaGeneracion: '2026-04-20' },
  { id: 4, nombre: 'Tareas Atrasadas', categoria: 'Tareas', descripcion: 'Tareas que superaron su vencimiento', icono: Calendar, frecuencia: 'Diaria', ultimaGeneracion: '2026-04-20' },
  { id: 5, nombre: 'Rendimiento Individual', categoria: 'Empleados', descripcion: 'Desempeño detallado de cada empleado', icono: Users, frecuencia: 'Mensual', ultimaGeneracion: '2026-04-01' },
  { id: 6, nombre: 'Ranking de Empleados', categoria: 'Empleados', descripcion: 'Top performers del equipo', icono: TrendingUp, frecuencia: 'Mensual', ultimaGeneracion: '2026-04-01' },
  { id: 7, nombre: 'Horas Estimadas vs Trabajadas', categoria: 'Tiempo', descripcion: 'Comparación de estimaciones vs realidad', icono: Clock, frecuencia: 'Semanal', ultimaGeneracion: '2026-04-15' },
  { id: 8, nombre: 'Dashboard Ejecutivo', categoria: 'Ejecutivos', descripcion: 'Vista de alto nivel para gerencia', icono: BarChart3, frecuencia: 'Semanal', ultimaGeneracion: '2026-04-18' },
  { id: 9, nombre: 'Comparativa entre Departamentos', categoria: 'Departamentos', descripcion: 'Rendimiento comparado de departamentos', icono: PieChart, frecuencia: 'Mensual', ultimaGeneracion: '2026-04-01' },
  { id: 10, nombre: 'Estado de Presupuestos', categoria: 'Presupuesto', descripcion: 'Control financiero de proyectos', icono: FileSpreadsheet, frecuencia: 'Mensual', ultimaGeneracion: '2026-04-01' },
  { id: 11, nombre: 'Reporte Mensual Consolidado', categoria: 'Ejecutivos', descripcion: 'Resumen completo del mes', icono: FileText, frecuencia: 'Mensual', ultimaGeneracion: '2026-04-01' },
  { id: 12, nombre: 'Análisis de Productividad', categoria: 'Productividad', descripcion: 'Métricas de productividad por empleado', icono: TrendingUp, frecuencia: 'Semanal', ultimaGeneracion: '2026-04-18' },
];

const categorias = ['Todos', 'Proyectos', 'Tareas', 'Empleados', 'Tiempo', 'Ejecutivos', 'Departamentos', 'Presupuesto', 'Productividad'];

export function ReportesModule() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [reporteSeleccionado, setReporteSeleccionado] = useState<Reporte | null>(null);

  const reportesFiltrados = categoriaSeleccionada === 'Todos'
    ? reportesDisponibles
    : reportesDisponibles.filter(r => r.categoria === categoriaSeleccionada);

  const handleGenerarReporte = (reporte: Reporte) => {
    setReporteSeleccionado(reporte);
    setShowConfigModal(true);
  };

  const getCategoriaColor = (categoria: string) => {
    const colores: Record<string, string> = {
      'Proyectos': 'bg-red-100 text-red-800',
      'Tareas': 'bg-gray-100 text-gray-800',
      'Empleados': 'bg-gray-800 text-white',
      'Tiempo': 'bg-gray-200 text-gray-800',
      'Ejecutivos': 'bg-red-600 text-white',
      'Departamentos': 'bg-gray-700 text-white',
      'Presupuesto': 'bg-red-100 text-red-800',
      'Productividad': 'bg-gray-600 text-white',
    };
    return colores[categoria] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl mb-1">Centro de Reportes</h2>
          <p className="text-sm text-gray-600">Genera y descarga reportes personalizados</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-gray-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md">
          <FileText className="w-5 h-5" />
          Reporte Personalizado
        </button>
      </div>

      {/* Filtros de categoría */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-gray-200/50 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 font-medium">Filtrar por categoría:</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSeleccionada(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm ${
                categoriaSeleccionada === cat
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reportesFiltrados.map((reporte) => {
          const Icon = reporte.icono;
          return (
            <div
              key={reporte.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-5 shadow-lg border border-gray-200/50 hover:shadow-xl hover:border-red-200 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-gradient-to-br from-red-600 to-gray-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoriaColor(reporte.categoria)}`}>
                  {reporte.categoria}
                </span>
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-2">{reporte.nombre}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{reporte.descripcion}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{reporte.frecuencia}</span>
                </div>
                {reporte.ultimaGeneracion && (
                  <span className="text-gray-400">Último: {new Date(reporte.ultimaGeneracion).toLocaleDateString('es-ES')}</span>
                )}
              </div>

              <button
                onClick={() => handleGenerarReporte(reporte)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Generar Reporte
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal de configuración de reporte */}
      {showConfigModal && reporteSeleccionado && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-gray-200/50">
            <h3 className="text-xl mb-4">Configurar Reporte: {reporteSeleccionado.nombre}</h3>

            <div className="space-y-4 mb-6">
              {/* Período */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">Período</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Última semana</option>
                  <option>Último mes</option>
                  <option>Último trimestre</option>
                  <option>Último año</option>
                  <option>Personalizado...</option>
                </select>
              </div>

              {/* Formato */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">Formato de exportación</label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="px-4 py-2 border-2 border-red-600 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
                    PDF
                  </button>
                  <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Excel
                  </button>
                  <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    CSV
                  </button>
                </div>
              </div>

              {/* Filtros específicos según categoría */}
              {reporteSeleccionado.categoria === 'Empleados' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Empleado</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Todos los empleados</option>
                    <option>Pedro Martínez</option>
                    <option>María González</option>
                    <option>Juan Pérez</option>
                    <option>Ana López</option>
                  </select>
                </div>
              )}

              {reporteSeleccionado.categoria === 'Proyectos' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Proyecto</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Todos los proyectos</option>
                    <option>Rediseño Web Corporativo</option>
                    <option>App Móvil E-commerce</option>
                    <option>Sistema CRM Interno</option>
                    <option>Campaña Marketing Digital</option>
                  </select>
                </div>
              )}

              {reporteSeleccionado.categoria === 'Departamentos' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2 font-medium">Departamento</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Todos los departamentos</option>
                    <option>Desarrollo</option>
                    <option>Diseño</option>
                    <option>Marketing</option>
                    <option>Ventas</option>
                  </select>
                </div>
              )}

              {/* Opciones adicionales */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm text-gray-700 mb-3 font-medium">Opciones adicionales</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Incluir gráficos</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-gray-700">Incluir datos detallados</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-700">Enviar por email</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md">
                <Download className="w-4 h-4" />
                Generar y Descargar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
