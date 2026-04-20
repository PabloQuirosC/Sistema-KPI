import { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Key, Users, UserCheck, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'administrador' | 'gerente' | 'lider-equipo' | 'empleado';
  departamento: string;
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
  ultimoAcceso: string;
}

interface Responsable {
  id: number;
  usuario: string;
  area: string;
  tipoResponsabilidad: 'proyecto' | 'departamento' | 'equipo' | 'proceso';
  nombreAsignacion: string;
  fechaAsignacion: string;
  estado: 'activo' | 'inactivo';
}

interface Departamento {
  id: number;
  nombre: string;
  responsable: string;
  empleados: number;
  descripcion: string;
}

const usuariosData: Usuario[] = [
  { id: 1, nombre: 'Admin Sistema', email: 'admin@empresa.com', rol: 'administrador', departamento: 'TI', estado: 'activo', fechaCreacion: '2024-01-10', ultimoAcceso: '2026-04-18' },
  { id: 2, nombre: 'Pedro Martínez', email: 'pedro@empresa.com', rol: 'lider-equipo', departamento: 'Desarrollo', estado: 'activo', fechaCreacion: '2024-01-15', ultimoAcceso: '2026-04-18' },
  { id: 3, nombre: 'María González', email: 'maria@empresa.com', rol: 'empleado', departamento: 'Diseño', estado: 'activo', fechaCreacion: '2024-03-20', ultimoAcceso: '2026-04-17' },
  { id: 4, nombre: 'Ana López', email: 'ana@empresa.com', rol: 'gerente', departamento: 'Marketing', estado: 'activo', fechaCreacion: '2024-02-05', ultimoAcceso: '2026-04-18' },
  { id: 5, nombre: 'Juan Pérez', email: 'juan@empresa.com', rol: 'empleado', departamento: 'Desarrollo', estado: 'activo', fechaCreacion: '2024-05-10', ultimoAcceso: '2026-04-16' },
  { id: 6, nombre: 'Carlos Rodríguez', email: 'carlos@empresa.com', rol: 'empleado', departamento: 'Ventas', estado: 'inactivo', fechaCreacion: '2024-06-15', ultimoAcceso: '2026-03-20' },
  { id: 7, nombre: 'Lucía Sánchez', email: 'lucia@empresa.com', rol: 'empleado', departamento: 'Recursos Humanos', estado: 'activo', fechaCreacion: '2024-07-20', ultimoAcceso: '2026-04-18' },
  { id: 8, nombre: 'Roberto García', email: 'roberto@empresa.com', rol: 'lider-equipo', departamento: 'Ventas', estado: 'activo', fechaCreacion: '2024-08-01', ultimoAcceso: '2026-04-17' },
  { id: 9, nombre: 'Laura Fernández', email: 'laura@empresa.com', rol: 'empleado', departamento: 'Marketing', estado: 'activo', fechaCreacion: '2024-09-10', ultimoAcceso: '2026-04-18' },
  { id: 10, nombre: 'Diego Torres', email: 'diego@empresa.com', rol: 'gerente', departamento: 'Desarrollo', estado: 'activo', fechaCreacion: '2024-10-05', ultimoAcceso: '2026-04-18' },
  { id: 11, nombre: 'Sofía Ramírez', email: 'sofia@empresa.com', rol: 'empleado', departamento: 'Diseño', estado: 'activo', fechaCreacion: '2024-11-12', ultimoAcceso: '2026-04-16' },
  { id: 12, nombre: 'Miguel Vargas', email: 'miguel@empresa.com', rol: 'empleado', departamento: 'TI', estado: 'activo', fechaCreacion: '2025-01-08', ultimoAcceso: '2026-04-18' },
];

const responsablesData: Responsable[] = [
  { id: 1, usuario: 'Pedro Martínez', area: 'Desarrollo', tipoResponsabilidad: 'departamento', nombreAsignacion: 'Departamento de Desarrollo', fechaAsignacion: '2024-01-15', estado: 'activo' },
  { id: 2, usuario: 'María González', area: 'Diseño', tipoResponsabilidad: 'proyecto', nombreAsignacion: 'Rediseño Web Corporativo', fechaAsignacion: '2026-03-01', estado: 'activo' },
  { id: 3, usuario: 'Ana López', area: 'Marketing', tipoResponsabilidad: 'departamento', nombreAsignacion: 'Departamento de Marketing', fechaAsignacion: '2024-02-05', estado: 'activo' },
  { id: 4, usuario: 'Juan Pérez', area: 'Desarrollo', tipoResponsabilidad: 'equipo', nombreAsignacion: 'Equipo Frontend', fechaAsignacion: '2024-06-10', estado: 'activo' },
  { id: 5, usuario: 'Carlos Rodríguez', area: 'Ventas', tipoResponsabilidad: 'proceso', nombreAsignacion: 'Proceso de Ventas', fechaAsignacion: '2024-07-20', estado: 'inactivo' },
  { id: 6, usuario: 'Roberto García', area: 'Ventas', tipoResponsabilidad: 'departamento', nombreAsignacion: 'Departamento de Ventas', fechaAsignacion: '2024-08-01', estado: 'activo' },
  { id: 7, usuario: 'Diego Torres', area: 'Desarrollo', tipoResponsabilidad: 'equipo', nombreAsignacion: 'Equipo Backend', fechaAsignacion: '2024-10-05', estado: 'activo' },
  { id: 8, usuario: 'Lucía Sánchez', area: 'Recursos Humanos', tipoResponsabilidad: 'departamento', nombreAsignacion: 'Departamento de RH', fechaAsignacion: '2024-07-20', estado: 'activo' },
  { id: 9, usuario: 'Laura Fernández', area: 'Marketing', tipoResponsabilidad: 'proyecto', nombreAsignacion: 'Campaña Anual 2026', fechaAsignacion: '2026-01-10', estado: 'activo' },
  { id: 10, usuario: 'Sofía Ramírez', area: 'Diseño', tipoResponsabilidad: 'equipo', nombreAsignacion: 'Equipo de Diseño Gráfico', fechaAsignacion: '2024-11-12', estado: 'activo' },
  { id: 11, usuario: 'Miguel Vargas', area: 'TI', tipoResponsabilidad: 'proceso', nombreAsignacion: 'Proceso de Seguridad', fechaAsignacion: '2025-01-08', estado: 'activo' },
  { id: 12, usuario: 'Admin Sistema', area: 'TI', tipoResponsabilidad: 'departamento', nombreAsignacion: 'Departamento de TI', fechaAsignacion: '2024-01-10', estado: 'activo' },
];

const departamentosData: Departamento[] = [
  { id: 1, nombre: 'Desarrollo', responsable: 'Pedro Martínez', empleados: 8, descripcion: 'Desarrollo de software y aplicaciones' },
  { id: 2, nombre: 'Diseño', responsable: 'María González', empleados: 4, descripcion: 'Diseño UX/UI y gráfico' },
  { id: 3, nombre: 'Marketing', responsable: 'Ana López', empleados: 5, descripcion: 'Marketing digital y contenidos' },
  { id: 4, nombre: 'Ventas', responsable: 'Carlos Rodríguez', empleados: 6, descripcion: 'Ventas y atención al cliente' },
  { id: 5, nombre: 'Recursos Humanos', responsable: 'Lucía Sánchez', empleados: 3, descripcion: 'Gestión de personal' },
];

const rolesPermisos = {
  administrador: {
    nombre: 'Administrador',
    descripcion: 'Acceso completo al sistema',
    permisos: ['Gestión de usuarios', 'Gestión de proyectos', 'Gestión de tareas', 'Reportes avanzados', 'Configuración del sistema']
  },
  gerente: {
    nombre: 'Gerente',
    descripcion: 'Gestión de departamento y reportes',
    permisos: ['Ver todos los proyectos', 'Crear proyectos', 'Asignar tareas', 'Ver reportes', 'Gestión de equipo']
  },
  'lider-equipo': {
    nombre: 'Líder de Equipo',
    descripcion: 'Gestión de equipo y tareas',
    permisos: ['Ver proyectos asignados', 'Asignar tareas', 'Ver reportes de equipo', 'Gestión de tareas']
  },
  empleado: {
    nombre: 'Empleado',
    descripcion: 'Acceso básico a tareas asignadas',
    permisos: ['Ver tareas propias', 'Actualizar estado de tareas', 'Ver proyectos asignados']
  }
};

export function UsuariosModule() {
  const [usuarios] = useState<Usuario[]>(usuariosData);
  const [responsables] = useState<Responsable[]>(responsablesData);
  const [departamentos] = useState<Departamento[]>(departamentosData);
  const [activeTab, setActiveTab] = useState<'usuarios' | 'responsables' | 'departamentos'>('usuarios');
  const [showModal, setShowModal] = useState(false);
  const [showPermisosModal, setShowPermisosModal] = useState(false);
  const [showResponsableModal, setShowResponsableModal] = useState(false);
  const [showDepartamentoModal, setShowDepartamentoModal] = useState(false);
  const [paginaUsuarios, setPaginaUsuarios] = useState(1);
  const [paginaResponsables, setPaginaResponsables] = useState(1);

  const getRolColor = (rol: Usuario['rol']) => {
    switch (rol) {
      case 'administrador': return 'bg-gray-100 text-gray-800';
      case 'gerente': return 'bg-red-100 text-red-800';
      case 'lider-equipo': return 'bg-gray-800 text-white';
      case 'empleado': return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolIcon = (rol: Usuario['rol']) => {
    switch (rol) {
      case 'administrador': return <Shield className="w-4 h-4" />;
      case 'gerente': return <Key className="w-4 h-4" />;
      case 'lider-equipo': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTipoResponsabilidadColor = (tipo: Responsable['tipoResponsabilidad']) => {
    switch (tipo) {
      case 'proyecto': return 'bg-red-100 text-red-800';
      case 'departamento': return 'bg-gray-100 text-gray-800';
      case 'equipo': return 'bg-gray-800 text-white';
      case 'proceso': return 'bg-gray-200 text-gray-800';
    }
  };

  const getTipoResponsabilidadTexto = (tipo: Responsable['tipoResponsabilidad']) => {
    switch (tipo) {
      case 'proyecto': return 'Proyecto';
      case 'departamento': return 'Departamento';
      case 'equipo': return 'Equipo';
      case 'proceso': return 'Proceso';
    }
  };

  // Paginación usuarios
  const usuariosPorPagina = 5;
  const totalPaginasUsuarios = Math.ceil(usuarios.length / usuariosPorPagina);
  const indiceInicioUsuarios = (paginaUsuarios - 1) * usuariosPorPagina;
  const indiceFinUsuarios = indiceInicioUsuarios + usuariosPorPagina;
  const usuariosPaginados = usuarios.slice(indiceInicioUsuarios, indiceFinUsuarios);

  // Paginación responsables
  const responsablesPorPagina = 5;
  const totalPaginasResponsables = Math.ceil(responsables.length / responsablesPorPagina);
  const indiceInicioResponsables = (paginaResponsables - 1) * responsablesPorPagina;
  const indiceFinResponsables = indiceInicioResponsables + responsablesPorPagina;
  const responsablesPaginados = responsables.slice(indiceInicioResponsables, indiceFinResponsables);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl mb-1">Administración Organizacional</h2>
          <p className="text-sm text-gray-600">Gestiona usuarios, responsables y departamentos</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPermisosModal(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Shield className="w-5 h-5" />
            Roles y Permisos
          </button>
          {activeTab === 'usuarios' && (
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-gray-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nuevo Usuario
            </button>
          )}
          {activeTab === 'responsables' && (
            <button
              onClick={() => setShowResponsableModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-gray-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md transition-colors"
            >
              <Plus className="w-5 h-5" />
              Asignar Responsable
            </button>
          )}
          {activeTab === 'departamentos' && (
            <button
              onClick={() => setShowDepartamentoModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-gray-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nuevo Departamento
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('usuarios')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'usuarios'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Usuarios</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('responsables')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'responsables'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              <span>Responsables</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('departamentos')}
            className={`pb-3 px-2 border-b-2 transition-colors ${
              activeTab === 'departamentos'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              <span>Departamentos</span>
            </div>
          </button>
        </div>
      </div>

      {activeTab === 'usuarios' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
          <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Usuario</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Rol</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Departamento</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Último Acceso</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Estado</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usuariosPaginados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRolIcon(usuario.rol)}
                        <span className="font-medium">{usuario.nombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{usuario.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm whitespace-nowrap ${getRolColor(usuario.rol)}`}>
                        {rolesPermisos[usuario.rol].nombre}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{usuario.departamento}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(usuario.ultimoAcceso).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        usuario.estado === 'activo'
                          ? 'bg-gray-800 text-white'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación Usuarios */}
          {usuarios.length > 0 && (
            <div className="px-4 md:px-6 py-3 border-t border-gray-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-gradient-to-r from-gray-50/30 to-gray-100/30">
              <div className="text-xs text-gray-600 font-medium">
                Mostrando {indiceInicioUsuarios + 1} a {Math.min(indiceFinUsuarios, usuarios.length)} de {usuarios.length} usuarios
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setPaginaUsuarios(prev => Math.max(prev - 1, 1))}
                  disabled={paginaUsuarios === 1}
                  className="p-1.5 rounded-lg border border-gray-300 hover:bg-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-700 font-semibold px-2 whitespace-nowrap">
                  Página {paginaUsuarios} de {totalPaginasUsuarios}
                </span>
                <button
                  onClick={() => setPaginaUsuarios(prev => Math.min(prev + 1, totalPaginasUsuarios))}
                  disabled={paginaUsuarios === totalPaginasUsuarios}
                  className="p-1.5 rounded-lg border border-gray-300 hover:bg-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'responsables' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
          <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Responsable</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Asignación</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Área</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Fecha Asignación</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Estado</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {responsablesPaginados.map((responsable) => (
                  <tr key={responsable.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-red-600" />
                        <span className="font-medium">{responsable.usuario}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getTipoResponsabilidadColor(responsable.tipoResponsabilidad)}`}>
                        {getTipoResponsabilidadTexto(responsable.tipoResponsabilidad)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{responsable.nombreAsignacion}</td>
                    <td className="px-6 py-4 text-gray-600">{responsable.area}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(responsable.fechaAsignacion).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        responsable.estado === 'activo'
                          ? 'bg-gray-800 text-white'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {responsable.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación Responsables */}
          {responsables.length > 0 && (
            <div className="px-4 md:px-6 py-3 border-t border-gray-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-gradient-to-r from-gray-50/30 to-gray-100/30">
              <div className="text-xs text-gray-600 font-medium">
                Mostrando {indiceInicioResponsables + 1} a {Math.min(indiceFinResponsables, responsables.length)} de {responsables.length} responsables
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setPaginaResponsables(prev => Math.max(prev - 1, 1))}
                  disabled={paginaResponsables === 1}
                  className="p-1.5 rounded-lg border border-gray-300 hover:bg-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-700 font-semibold px-2 whitespace-nowrap">
                  Página {paginaResponsables} de {totalPaginasResponsables}
                </span>
                <button
                  onClick={() => setPaginaResponsables(prev => Math.min(prev + 1, totalPaginasResponsables))}
                  disabled={paginaResponsables === totalPaginasResponsables}
                  className="p-1.5 rounded-lg border border-gray-300 hover:bg-white hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'departamentos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departamentos.map((dept) => (
            <div key={dept.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-1">{dept.nombre}</h3>
                  <p className="text-sm text-gray-600">{dept.responsable}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{dept.descripcion}</p>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Empleados</span>
                  </div>
                  <span className="font-semibold">{dept.empleados}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-gray-200/50 mx-4">
            <h3 className="text-xl mb-4">Nuevo Usuario</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="col-span-2">
                <label className="block text-sm text-gray-700 mb-1">Nombre completo</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Nombre del usuario" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="usuario@empresa.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Contraseña temporal</label>
                <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Rol</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Empleado</option>
                  <option>Líder de Equipo</option>
                  <option>Gerente</option>
                  <option>Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Departamento</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Desarrollo</option>
                  <option>Diseño</option>
                  <option>Marketing</option>
                  <option>Ventas</option>
                  <option>Recursos Humanos</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700">Enviar email de bienvenida con credenciales</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md">
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {showPermisosModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl mb-4">Roles y Permisos del Sistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.entries(rolesPermisos).map(([key, rol]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {key === 'administrador' && <Shield className="w-5 h-5 text-gray-800" />}
                    {key === 'gerente' && <Key className="w-5 h-5 text-red-600" />}
                    {key === 'lider-equipo' && <Users className="w-5 h-5 text-gray-700" />}
                    <h4 className="font-semibold">{rol.nombre}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rol.descripcion}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-700 uppercase">Permisos:</p>
                    {rol.permisos.map((permiso, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-700">{permiso}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPermisosModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showResponsableModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-gray-200/50 mx-4">
            <h3 className="text-xl mb-4">Asignar Responsable</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Usuario</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Seleccionar usuario...</option>
                  <option>Pedro Martínez</option>
                  <option>María González</option>
                  <option>Juan Pérez</option>
                  <option>Ana López</option>
                  <option>Carlos Rodríguez</option>
                  <option>Lucía Sánchez</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tipo de responsabilidad</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Proyecto</option>
                    <option>Departamento</option>
                    <option>Equipo</option>
                    <option>Proceso</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Área</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Desarrollo</option>
                    <option>Diseño</option>
                    <option>Marketing</option>
                    <option>Ventas</option>
                    <option>Recursos Humanos</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre de asignación</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ej: Proyecto X, Equipo Backend, etc."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Fecha de asignación</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Descripción de responsabilidades</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Describe las responsabilidades específicas..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResponsableModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-gray-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 shadow-md">
                Asignar Responsable
              </button>
            </div>
          </div>
        </div>
      )}

      {showDepartamentoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-xl mb-4">Nuevo Departamento</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nombre del departamento</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Responsable</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Seleccionar empleado</option>
                  <option>Pedro Martínez</option>
                  <option>María González</option>
                  <option>Juan Pérez</option>
                  <option>Ana López</option>
                  <option>Carlos Rodríguez</option>
                  <option>Lucía Sánchez</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Descripción</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3}></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDepartamentoModal(false)}
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
    </div>
  );
}
