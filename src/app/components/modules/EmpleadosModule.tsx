import { useState } from 'react';
import { Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Empleado {
  id: number;
  nombre: string;
  cargo: string;
  departamento: string;
  email: string;
  telefono: string;
  fechaIngreso: string;
  estado: 'activo' | 'inactivo';
}

const empleadosData: Empleado[] = [
  { id: 1, nombre: 'Pedro Martínez', cargo: 'Desarrollador Senior', departamento: 'Desarrollo', email: 'pedro@empresa.com', telefono: '555-0101', fechaIngreso: '2022-01-15', estado: 'activo' },
  { id: 2, nombre: 'María González', cargo: 'Diseñadora UX/UI', departamento: 'Diseño', email: 'maria@empresa.com', telefono: '555-0102', fechaIngreso: '2022-03-20', estado: 'activo' },
  { id: 3, nombre: 'Juan Pérez', cargo: 'Desarrollador Frontend', departamento: 'Desarrollo', email: 'juan@empresa.com', telefono: '555-0103', fechaIngreso: '2023-05-10', estado: 'activo' },
  { id: 4, nombre: 'Ana López', cargo: 'Marketing Manager', departamento: 'Marketing', email: 'ana@empresa.com', telefono: '555-0104', fechaIngreso: '2021-08-05', estado: 'activo' },
  { id: 5, nombre: 'Carlos Rodríguez', cargo: 'Vendedor', departamento: 'Ventas', email: 'carlos@empresa.com', telefono: '555-0105', fechaIngreso: '2023-02-12', estado: 'activo' },
  { id: 6, nombre: 'Lucía Sánchez', cargo: 'Soporte Técnico', departamento: 'Desarrollo', email: 'lucia@empresa.com', telefono: '555-0106', fechaIngreso: '2023-07-01', estado: 'activo' },
  { id: 7, nombre: 'Roberto García', cargo: 'Desarrollador Backend', departamento: 'Desarrollo', email: 'roberto@empresa.com', telefono: '555-0107', fechaIngreso: '2022-09-15', estado: 'activo' },
  { id: 8, nombre: 'Laura Fernández', cargo: 'Community Manager', departamento: 'Marketing', email: 'laura@empresa.com', telefono: '555-0108', fechaIngreso: '2023-03-22', estado: 'activo' },
  { id: 9, nombre: 'Diego Torres', cargo: 'Analista de Datos', departamento: 'Desarrollo', email: 'diego@empresa.com', telefono: '555-0109', fechaIngreso: '2021-11-30', estado: 'activo' },
  { id: 10, nombre: 'Sofía Ramírez', cargo: 'Diseñadora Gráfica', departamento: 'Diseño', email: 'sofia@empresa.com', telefono: '555-0110', fechaIngreso: '2022-06-18', estado: 'activo' },
  { id: 11, nombre: 'Miguel Vargas', cargo: 'Product Manager', departamento: 'Desarrollo', email: 'miguel@empresa.com', telefono: '555-0111', fechaIngreso: '2021-04-10', estado: 'activo' },
  { id: 12, nombre: 'Carmen Jiménez', cargo: 'Recursos Humanos', departamento: 'Recursos Humanos', email: 'carmen@empresa.com', telefono: '555-0112', fechaIngreso: '2020-08-25', estado: 'inactivo' },
];

export function EmpleadosModule() {
  const [empleados] = useState<Empleado[]>(empleadosData);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  const filteredEmpleados = empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const empleadosPorPagina = 5;
  const totalPaginas = Math.ceil(filteredEmpleados.length / empleadosPorPagina);
  const indiceInicio = (paginaActual - 1) * empleadosPorPagina;
  const indiceFin = indiceInicio + empleadosPorPagina;
  const empleadosPaginados = filteredEmpleados.slice(indiceInicio, indiceFin);

  // Reset página cuando cambia la búsqueda
  const handleBusquedaChange = (valor: string) => {
    setSearchTerm(valor);
    setPaginaActual(1);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl mb-1">Gestión de Empleados</h2>
          <p className="text-sm text-gray-600">Administra la información de los empleados</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-gray-900 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 shadow-md transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Empleado
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
        <div className="p-4 border-b border-gray-200">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empleados..."
              value={searchTerm}
              onChange={(e) => handleBusquedaChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Nombre</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Cargo</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Departamento</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Teléfono</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Estado</th>
                <th className="px-6 py-3 text-left text-sm text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {empleadosPaginados.length > 0 ? (
                empleadosPaginados.map((empleado) => (
                  <tr key={empleado.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{empleado.nombre}</td>
                    <td className="px-6 py-4 text-gray-600">{empleado.cargo}</td>
                    <td className="px-6 py-4 text-gray-600">{empleado.departamento}</td>
                    <td className="px-6 py-4 text-gray-600">{empleado.email}</td>
                    <td className="px-6 py-4 text-gray-600">{empleado.telefono}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        empleado.estado === 'activo'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {empleado.estado === 'activo' ? 'Activo' : 'Inactivo'}
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
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">No se encontraron empleados</p>
                      <p className="text-sm text-gray-400">
                        Intenta ajustar el término de búsqueda
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {filteredEmpleados.length > 0 && (
          <div className="px-4 md:px-6 py-3 border-t border-gray-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 bg-gradient-to-r from-gray-50/30 to-gray-100/30">
            <div className="text-xs text-gray-600 font-medium">
              Mostrando {indiceInicio + 1} a {Math.min(indiceFin, filteredEmpleados.length)} de {filteredEmpleados.length} empleados
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
            <h3 className="text-xl mb-4">Nuevo Empleado</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Nombre completo</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Cargo</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Departamento</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Desarrollo</option>
                  <option>Diseño</option>
                  <option>Marketing</option>
                  <option>Ventas</option>
                </select>
              </div>
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="min-w-0">
                <label className="block text-sm text-gray-700 mb-1">Fecha de ingreso</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
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
    </div>
  );
}
