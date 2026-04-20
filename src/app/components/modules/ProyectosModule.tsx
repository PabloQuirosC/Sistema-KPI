import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, CheckCircle } from 'lucide-react';

interface Proyecto {
  id: number;
  nombre: string;
  cliente: string;
  descripcion: string;
  estado: 'planificacion' | 'en-progreso' | 'completado' | 'pausado';
  prioridad: 'alta' | 'media' | 'baja';
  fechaInicio: string;
  fechaFin: string;
  progreso: number;
  equipo: string[];
  tareasTotal: number;
  tareasCompletadas: number;
}

const proyectosData: Proyecto[] = [
  {
    id: 1,
    nombre: 'Rediseño Web Corporativo',
    cliente: 'Empresa ABC',
    descripcion: 'Renovación completa del sitio web corporativo',
    estado: 'en-progreso',
    prioridad: 'alta',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-05-30',
    progreso: 65,
    equipo: ['Pedro Martínez', 'María González', 'Juan Pérez'],
    tareasTotal: 28,
    tareasCompletadas: 18
  },
  {
    id: 2,
    nombre: 'App Móvil E-commerce',
    cliente: 'TiendaOnline SA',
    descripcion: 'Desarrollo de aplicación móvil iOS y Android',
    estado: 'en-progreso',
    prioridad: 'alta',
    fechaInicio: '2026-02-15',
    fechaFin: '2026-06-15',
    progreso: 45,
    equipo: ['Pedro Martínez', 'Juan Pérez', 'Carlos Rodríguez'],
    tareasTotal: 42,
    tareasCompletadas: 19
  },
  {
    id: 3,
    nombre: 'Sistema CRM Interno',
    cliente: 'Interno',
    descripcion: 'CRM personalizado para gestión de clientes',
    estado: 'planificacion',
    prioridad: 'media',
    fechaInicio: '2026-05-01',
    fechaFin: '2026-08-31',
    progreso: 15,
    equipo: ['Ana López', 'Lucía Sánchez'],
    tareasTotal: 35,
    tareasCompletadas: 5
  },
  {
    id: 4,
    nombre: 'Campaña Marketing Digital',
    cliente: 'StartupXYZ',
    descripcion: 'Estrategia completa de marketing digital',
    estado: 'en-progreso',
    prioridad: 'media',
    fechaInicio: '2026-04-01',
    fechaFin: '2026-07-01',
    progreso: 55,
    equipo: ['Ana López', 'María González'],
    tareasTotal: 22,
    tareasCompletadas: 12
  },
];

export function ProyectosModule() {
  const [proyectos] = useState<Proyecto[]>(proyectosData);
  const [showModal, setShowModal] = useState(false);

  const getEstadoColor = (estado: Proyecto['estado']) => {
    switch (estado) {
      case 'planificacion': return 'bg-gray-200 text-gray-800';
      case 'en-progreso': return 'bg-red-100 text-red-800';
      case 'completado': return 'bg-gray-800 text-white';
      case 'pausado': return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoTexto = (estado: Proyecto['estado']) => {
    switch (estado) {
      case 'planificacion': return 'Planificación';
      case 'en-progreso': return 'En Progreso';
      case 'completado': return 'Completado';
      case 'pausado': return 'Pausado';
    }
  };

  const getPrioridadColor = (prioridad: Proyecto['prioridad']) => {
    switch (prioridad) {
      case 'alta': return 'text-red-600';
      case 'media': return 'text-yellow-600';
      case 'baja': return 'text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-3 md:mb-4">
        <div>
          <h2 className="text-lg md:text-xl mb-0.5">Gestión de Proyectos</h2>
          <p className="text-xs text-gray-600">Administra proyectos y asignación de equipos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-gray-900 text-white px-3 py-1.5 text-sm rounded-lg hover:shadow-lg transition-all duration-200 shadow-md"
        >
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-md border border-gray-200/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-sm font-semibold truncate">{proyecto.nombre}</h3>
                  <span className={`text-xs ${getPrioridadColor(proyecto.prioridad)} flex-shrink-0`}>●</span>
                </div>
                <p className="text-xs text-gray-600 mb-0.5 truncate">Cliente: {proyecto.cliente}</p>
                <p className="text-xs text-gray-600 line-clamp-1">{proyecto.descripcion}</p>
              </div>
              <div className="flex gap-0.5 ml-2 flex-shrink-0">
                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Progreso</span>
                <span className="font-semibold text-xs">{proyecto.progreso}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-red-600 to-gray-900 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${proyecto.progreso}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600">Tareas</p>
                  <p className="text-xs font-semibold">{proyecto.tareasCompletadas}/{proyecto.tareasTotal}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-600">Entrega</p>
                  <p className="text-xs font-semibold truncate">
                    {new Date(proyecto.fechaFin).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-gray-200">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-600">{proyecto.equipo.length} miembros</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-sm ${getEstadoColor(proyecto.estado)}`}>
                {getEstadoTexto(proyecto.estado)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-1.5">Equipo:</p>
              <div className="flex flex-wrap gap-1">
                {proyecto.equipo.map((miembro, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded truncate">
                    {miembro}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50">
            <h3 className="text-base font-semibold mb-2.5">Nuevo Proyecto</h3>
            <div className="grid grid-cols-4 gap-2.5 mb-3">
              <div className="col-span-2">
                <label className="block text-[11px] text-gray-700 mb-0.5">Nombre del proyecto</label>
                <input type="text" className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md" />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] text-gray-700 mb-0.5">Cliente</label>
                <input type="text" className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md" />
              </div>
              <div className="col-span-4">
                <label className="block text-[11px] text-gray-700 mb-0.5">Descripción</label>
                <textarea className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md resize-none" rows={2}></textarea>
              </div>
              <div>
                <label className="block text-[11px] text-gray-700 mb-0.5">Prioridad</label>
                <select className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md">
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-700 mb-0.5">Estado</label>
                <select className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md">
                  <option>Planificación</option>
                  <option>En Progreso</option>
                  <option>Pausado</option>
                  <option>Completado</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-gray-700 mb-0.5">Fecha inicio</label>
                <input type="date" className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-700 mb-0.5">Fecha fin</label>
                <input type="date" className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded-md" />
              </div>
              <div className="col-span-4">
                <label className="block text-[11px] text-gray-700 mb-0.5">Asignar equipo</label>
                <div className="border border-gray-300 rounded-md p-1.5 grid grid-cols-3 gap-x-3 gap-y-0.5">
                  {['Pedro Martínez', 'María González', 'Juan Pérez', 'Ana López', 'Carlos Rodríguez', 'Lucía Sánchez'].map((emp) => (
                    <label key={emp} className="flex items-center gap-1 py-0.5">
                      <input type="checkbox" className="rounded w-3 h-3" />
                      <span className="text-[11px] truncate">{emp}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-1.5 pt-2.5 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="px-3 py-1.5 text-xs bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-lg hover:shadow-lg transition-all duration-200 shadow-md">
                Crear Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
