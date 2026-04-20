import { useState } from 'react';
import { Plus, Edit, Trash2, Filter, ChevronLeft, ChevronRight, Search, Upload, Download } from 'lucide-react';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  proyecto?: string;
  objetivo?: string;
  asignadoA: string;
  prioridad: 'alta' | 'media' | 'baja';
  estado: 'pendiente' | 'en-progreso' | 'completada';
  fechaInicio: string;
  fechaVencimiento: string;
  horasEstimadas?: number;
}

const tareasData: Tarea[] = [
  { id: 1, titulo: 'Diseño de landing page', descripcion: 'Crear diseño responsive', proyecto: 'Rediseño Web Corporativo', asignadoA: 'María González', prioridad: 'alta', estado: 'en-progreso', fechaInicio: '2026-04-10', fechaVencimiento: '2026-04-20', horasEstimadas: 16 },
  { id: 2, titulo: 'Integración de API', descripcion: 'Conectar con servicios externos', objetivo: 'Lanzamiento versión 2.0', asignadoA: 'Pedro Martínez', prioridad: 'alta', estado: 'en-progreso', fechaInicio: '2026-04-12', fechaVencimiento: '2026-04-25', horasEstimadas: 24 },
  { id: 3, titulo: 'Campaña de email', descripcion: 'Preparar newsletter mensual', objetivo: 'Incrementar engagement 20%', asignadoA: 'Ana López', prioridad: 'media', estado: 'pendiente', fechaInicio: '2026-04-15', fechaVencimiento: '2026-04-30', horasEstimadas: 8 },
  { id: 4, titulo: 'Revisión de código', descripcion: 'Code review del sprint', proyecto: 'App Móvil E-commerce', asignadoA: 'Juan Pérez', prioridad: 'media', estado: 'completada', fechaInicio: '2026-04-05', fechaVencimiento: '2026-04-10', horasEstimadas: 6 },
  { id: 5, titulo: 'Configurar base de datos', descripcion: 'Setup inicial de BD', objetivo: 'Automatizar ventas Q2', asignadoA: 'Pedro Martínez', prioridad: 'alta', estado: 'en-progreso', fechaInicio: '2026-04-14', fechaVencimiento: '2026-04-22', horasEstimadas: 12 },
  { id: 6, titulo: 'Optimización SEO', descripcion: 'Mejorar posicionamiento web', proyecto: 'Rediseño Web Corporativo', asignadoA: 'Ana López', prioridad: 'media', estado: 'pendiente', fechaInicio: '2026-04-16', fechaVencimiento: '2026-04-28', horasEstimadas: 10 },
  { id: 7, titulo: 'Testing de aplicación móvil', descripcion: 'Pruebas en iOS y Android', proyecto: 'App Móvil E-commerce', asignadoA: 'Carlos Rodríguez', prioridad: 'alta', estado: 'en-progreso', fechaInicio: '2026-04-11', fechaVencimiento: '2026-04-23', horasEstimadas: 20 },
  { id: 8, titulo: 'Documentación técnica', descripcion: 'Actualizar docs del proyecto', proyecto: 'Sistema CRM Interno', asignadoA: 'Lucía Sánchez', prioridad: 'baja', estado: 'pendiente', fechaInicio: '2026-04-18', fechaVencimiento: '2026-05-05', horasEstimadas: 14 },
  { id: 9, titulo: 'Implementar analytics', descripcion: 'Configurar Google Analytics', objetivo: 'Incrementar engagement 20%', asignadoA: 'María González', prioridad: 'media', estado: 'completada', fechaInicio: '2026-04-01', fechaVencimiento: '2026-04-08', horasEstimadas: 5 },
  { id: 10, titulo: 'Deploy a producción', descripcion: 'Subir versión 2.0', objetivo: 'Lanzamiento versión 2.0', asignadoA: 'Pedro Martínez', prioridad: 'alta', estado: 'pendiente', fechaInicio: '2026-04-20', fechaVencimiento: '2026-04-30', horasEstimadas: 8 },
  { id: 11, titulo: 'Optimizar performance', descripcion: 'Mejorar velocidad de carga', proyecto: 'Rediseño Web Corporativo', asignadoA: 'Juan Pérez', prioridad: 'media', estado: 'en-progreso', fechaInicio: '2026-04-13', fechaVencimiento: '2026-04-26', horasEstimadas: 18 },
  { id: 12, titulo: 'Diseño de iconos', descripcion: 'Crear pack de iconos personalizados', proyecto: 'App Móvil E-commerce', asignadoA: 'María González', prioridad: 'baja', estado: 'completada', fechaInicio: '2026-03-28', fechaVencimiento: '2026-04-05', horasEstimadas: 12 },
];

export function TareasModule() {
  const [tareas] = useState<Tarea[]>(tareasData);
  const [showModal, setShowModal] = useState(false);
  const [showCargaMasivaModal, setShowCargaMasivaModal] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [tipoRelacion, setTipoRelacion] = useState<'proyecto' | 'objetivo' | ''>('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  // Aplicar filtros de estado y búsqueda
  const tareasFiltradas = tareas.filter(t => {
    const cumpleFiltroEstado = filtroEstado === 'todas' || t.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' ||
      t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.asignadoA.toLowerCase().includes(busqueda.toLowerCase());

    return cumpleFiltroEstado && cumpleBusqueda;
  });

  // Paginación
  const tareasPorPagina = 5;
  const totalPaginas = Math.ceil(tareasFiltradas.length / tareasPorPagina);
  const indiceInicio = (paginaActual - 1) * tareasPorPagina;
  const indiceFin = indiceInicio + tareasPorPagina;
  const tareasPaginadas = tareasFiltradas.slice(indiceInicio, indiceFin);

  // Reset página cuando cambia el filtro
  const handleFiltroChange = (estado: string) => {
    setFiltroEstado(estado);
    setPaginaActual(1);
  };

  // Reset página cuando cambia la búsqueda
  const handleBusquedaChange = (valor: string) => {
    setBusqueda(valor);
    setPaginaActual(1);
  };

  // Descargar plantilla CSV
  const descargarPlantilla = () => {
    const headers = ['Título', 'Descripción', 'Asignado A', 'Prioridad', 'Estado', 'Fecha Inicio', 'Fecha Vencimiento', 'Horas Estimadas'];
    const ejemplos = [
      ['Ejemplo: Diseñar landing page', 'Descripción de la tarea', 'Pedro Martínez', 'alta', 'pendiente', '2026-04-20', '2026-04-30', '16'],
      ['', '', '', 'media/baja', 'en-progreso/completada', '', '', '']
    ];

    const csvContent = [
      headers.join(','),
      ...ejemplos.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_tareas.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPrioridadColor = (prioridad: Tarea['prioridad']) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-gray-200 text-gray-800';
      case 'baja': return 'bg-gray-800 text-white';
    }
  };

  const getEstadoColor = (estado: Tarea['estado']) => {
    switch (estado) {
      case 'pendiente': return 'bg-gray-100 text-gray-800';
      case 'en-progreso': return 'bg-red-100 text-red-800';
      case 'completada': return 'bg-gray-800 text-white';
    }
  };

  const getEstadoTexto = (estado: Tarea['estado']) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'en-progreso': return 'En Progreso';
      case 'completada': return 'Completada';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl mb-1">Gestión de Tareas</h2>
          <p className="text-sm text-gray-600">Administra y asigna tareas al equipo</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowCargaMasivaModal(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            <Upload className="w-5 h-5" />
            Carga Masiva
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-gray-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md"
          >
            <Plus className="w-5 h-5" />
            Nueva Tarea
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
            {/* Búsqueda */}
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tareas..."
                value={busqueda}
                onChange={(e) => handleBusquedaChange(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs"
              />
            </div>

            {/* Filtros de estado */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-600 whitespace-nowrap">Filtrar por:</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['todas', 'pendiente', 'en-progreso', 'completada'].map((estado) => (
                  <button
                    key={estado}
                    onClick={() => handleFiltroChange(estado)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm ${
                      filtroEstado === estado
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {estado === 'todas' ? 'Todas' : estado === 'en-progreso' ? 'En Progreso' : estado.charAt(0).toUpperCase() + estado.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Tarea</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Relacionado con</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Asignado a</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Prioridad</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Estado</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Horas Est.</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Vencimiento</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tareasPaginadas.length > 0 ? (
                tareasPaginadas.map((tarea) => (
                  <tr key={tarea.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{tarea.titulo}</p>
                        <p className="text-sm text-gray-600">{tarea.descripcion}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {tarea.proyecto ? (
                        <div>
                          <span className="text-xs text-gray-500 block">Proyecto</span>
                          <span className="text-sm text-red-600">{tarea.proyecto}</span>
                        </div>
                      ) : tarea.objetivo ? (
                        <div>
                          <span className="text-xs text-gray-500 block">Objetivo</span>
                          <span className="text-sm text-gray-800">{tarea.objetivo}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Sin relación</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{tarea.asignadoA}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getPrioridadColor(tarea.prioridad)}`}>
                        {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getEstadoColor(tarea.estado)}`}>
                        {getEstadoTexto(tarea.estado)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700 font-medium">{tarea.horasEstimadas || '-'}h</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(tarea.fechaVencimiento).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">No se encontraron tareas</p>
                      <p className="text-sm text-gray-400">
                        Intenta ajustar los filtros o el término de búsqueda
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {tareasFiltradas.length > 0 && (
          <div className="px-4 md:px-6 py-3 border-t border-gray-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-gradient-to-r from-gray-50/30 to-gray-100/30">
            <div className="text-xs text-gray-600 font-medium">
              Mostrando {indiceInicio + 1} a {Math.min(indiceFin, tareasFiltradas.length)} de {tareasFiltradas.length} tareas
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
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50">
            <h3 className="text-xl mb-4">Nueva Tarea</h3>
            <div className="space-y-4 mb-6">
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Título</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Descripción</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none" rows={3}></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Relacionar tarea con:</label>
                <div className="flex flex-wrap gap-4 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipoRelacion"
                      value="proyecto"
                      checked={tipoRelacion === 'proyecto'}
                      onChange={(e) => setTipoRelacion(e.target.value as 'proyecto')}
                      className="w-4 h-4 text-red-600 flex-shrink-0"
                    />
                    <span className="text-sm">Proyecto</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipoRelacion"
                      value="objetivo"
                      checked={tipoRelacion === 'objetivo'}
                      onChange={(e) => setTipoRelacion(e.target.value as 'objetivo')}
                      className="w-4 h-4 text-red-600 flex-shrink-0"
                    />
                    <span className="text-sm">Objetivo/Meta</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipoRelacion"
                      value=""
                      checked={tipoRelacion === ''}
                      onChange={() => setTipoRelacion('')}
                      className="w-4 h-4 text-red-600 flex-shrink-0"
                    />
                    <span className="text-sm">Ninguno</span>
                  </label>
                </div>
                {tipoRelacion === 'proyecto' && (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Seleccionar proyecto</option>
                    <option>Rediseño Web Corporativo</option>
                    <option>App Móvil E-commerce</option>
                    <option>Sistema CRM Interno</option>
                    <option>Campaña Marketing Digital</option>
                  </select>
                )}
                {tipoRelacion === 'objetivo' && (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="">Seleccionar objetivo</option>
                    <option>Aumentar conversión web 15%</option>
                    <option>Lanzamiento versión 2.0</option>
                    <option>Incrementar engagement 20%</option>
                    <option>Mejorar calidad código</option>
                    <option>Automatizar ventas Q2</option>
                    <option>Reducir tiempo respuesta 30%</option>
                  </select>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="min-w-0">
                  <label className="block text-sm text-gray-700 mb-1">Asignar a</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Pedro Martínez</option>
                    <option>María González</option>
                    <option>Juan Pérez</option>
                    <option>Ana López</option>
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-sm text-gray-700 mb-1">Prioridad</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Alta</option>
                    <option>Media</option>
                    <option>Baja</option>
                  </select>
                </div>
                <div className="min-w-0">
                  <label className="block text-sm text-gray-700 mb-1">Fecha inicio</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm text-gray-700 mb-1">Fecha vencimiento</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm text-gray-700 mb-1">Horas estimadas</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="Ej: 8.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Carga Masiva */}
      {showCargaMasivaModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50">
            <h3 className="text-xl mb-4">Carga Masiva de Tareas</h3>

            <div className="space-y-6 mb-6">
              {/* Seleccionar proyecto */}
              <div>
                <label className="block text-sm text-gray-700 mb-2 font-medium">
                  Asociar tareas al proyecto:
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="">Seleccionar proyecto</option>
                  <option>Rediseño Web Corporativo</option>
                  <option>App Móvil E-commerce</option>
                  <option>Sistema CRM Interno</option>
                  <option>Campaña Marketing Digital</option>
                  <option>Automatización de Ventas</option>
                </select>
              </div>

              {/* Descargar plantilla */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                    <Download className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Paso 1: Descarga la plantilla</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Descarga la plantilla CSV, complétala con los datos de las tareas y luego súbela aquí.
                    </p>
                    <button
                      onClick={descargarPlantilla}
                      className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Descargar Plantilla CSV
                    </button>
                  </div>
                </div>
              </div>

              {/* Formato de la plantilla */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">📋 Formato de la plantilla</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• <strong>Título:</strong> Nombre de la tarea</li>
                  <li>• <strong>Descripción:</strong> Detalle de la tarea</li>
                  <li>• <strong>Asignado A:</strong> Nombre del empleado</li>
                  <li>• <strong>Prioridad:</strong> alta, media o baja</li>
                  <li>• <strong>Estado:</strong> pendiente, en-progreso o completada</li>
                  <li>• <strong>Fecha Inicio:</strong> Formato: YYYY-MM-DD (ej: 2026-04-20)</li>
                  <li>• <strong>Fecha Vencimiento:</strong> Formato: YYYY-MM-DD</li>
                  <li>• <strong>Horas Estimadas:</strong> Número (ej: 16)</li>
                </ul>
              </div>

              {/* Subir archivo */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg flex-shrink-0">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">Paso 2: Sube el archivo</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Selecciona el archivo CSV con las tareas completadas.
                    </p>
                    <input
                      type="file"
                      accept=".csv"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => setShowCargaMasivaModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md">
                Importar Tareas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
