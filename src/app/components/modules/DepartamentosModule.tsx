import { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

interface Departamento {
  id: number;
  nombre: string;
  responsable: string;
  empleados: number;
  descripcion: string;
}

const departamentosData: Departamento[] = [
  { id: 1, nombre: 'Desarrollo', responsable: 'Pedro Martínez', empleados: 8, descripcion: 'Desarrollo de software y aplicaciones' },
  { id: 2, nombre: 'Diseño', responsable: 'María González', empleados: 4, descripcion: 'Diseño UX/UI y gráfico' },
  { id: 3, nombre: 'Marketing', responsable: 'Ana López', empleados: 5, descripcion: 'Marketing digital y contenidos' },
  { id: 4, nombre: 'Ventas', responsable: 'Carlos Rodríguez', empleados: 6, descripcion: 'Ventas y atención al cliente' },
  { id: 5, nombre: 'Recursos Humanos', responsable: 'Lucía Sánchez', empleados: 3, descripcion: 'Gestión de personal' },
];

export function DepartamentosModule() {
  const [departamentos] = useState<Departamento[]>(departamentosData);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 md:mb-6">
        <div>
          <h2 className="text-xl md:text-2xl mb-1">Gestión de Departamentos</h2>
          <p className="text-sm text-gray-600">Administra los departamentos de la organización</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Departamento
        </button>
      </div>

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

      {showModal && (
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
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Descripción</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3}></textarea>
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
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
