import { useState } from 'react';
import { Users, CheckCircle, Clock, FolderKanban, BarChart3, Target, UserCheck } from 'lucide-react';
import { KPICard } from '../KPICard';
import { EmployeeCard } from '../EmployeeCard';
import { ProductivityChart } from '../ProductivityChart';
import { TasksTimeline } from '../TasksTimeline';
import { ProjectTasksChart } from '../ProjectTasksChart';
import { TeamWorkloadChart } from '../TeamWorkloadChart';
import { EmployeePerformanceTable } from '../EmployeePerformanceTable';
import { ObjetivosProgress } from '../ObjetivosProgress';
import { HoursEstimatedChart } from '../HoursEstimatedChart';

type TabType = 'resumen' | 'proyectos' | 'desempeno' | 'empleados';

export function DashboardModule() {
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  const empleados = [
    { nombre: 'Pedro Martínez', cargo: 'Desarrollador Senior', tareasCompletadas: 28, totalTareas: 30, horasTrabajadas: 42, rendimiento: 95 },
    { nombre: 'María González', cargo: 'Diseñadora UX/UI', tareasCompletadas: 24, totalTareas: 28, horasTrabajadas: 40, rendimiento: 88 },
    { nombre: 'Juan Pérez', cargo: 'Desarrollador Frontend', tareasCompletadas: 26, totalTareas: 32, horasTrabajadas: 38, rendimiento: 85 },
    { nombre: 'Ana López', cargo: 'Marketing Manager', tareasCompletadas: 22, totalTareas: 30, horasTrabajadas: 35, rendimiento: 78 },
    { nombre: 'Carlos Rodríguez', cargo: 'Vendedor', tareasCompletadas: 20, totalTareas: 25, horasTrabajadas: 40, rendimiento: 82 },
    { nombre: 'Lucía Sánchez', cargo: 'Soporte Técnico', tareasCompletadas: 18, totalTareas: 35, horasTrabajadas: 36, rendimiento: 65 },
  ];

  const tabs = [
    { id: 'resumen' as TabType, name: 'Resumen General', icon: BarChart3 },
    { id: 'proyectos' as TabType, name: 'Proyectos y Objetivos', icon: Target },
    { id: 'desempeno' as TabType, name: 'Desempeño del Equipo', icon: UserCheck },
    { id: 'empleados' as TabType, name: 'Detalle de Empleados', icon: Users },
  ];

  return (
    <div>
      {/* Pestañas */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-gray-200/50 p-1.5 md:p-2 mb-4 md:mb-6 overflow-x-auto">
        <div className="flex gap-1 md:gap-2 min-w-max md:min-w-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-gray-900 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium hidden sm:inline">{tab.name}</span>
                <span className="text-xs md:text-sm font-medium sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido de pestañas */}
      {activeTab === 'resumen' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Proyectos Activos"
              value="4"
              change={33.3}
              icon={FolderKanban}
              iconColor="bg-red-600"
            />
            <KPICard
              title="Tareas Completadas"
              value="54"
              change={15.2}
              icon={CheckCircle}
              iconColor="bg-gray-700"
            />
            <KPICard
              title="Total Empleados"
              value="24"
              change={8.3}
              icon={Users}
              iconColor="bg-gray-800"
            />
            <KPICard
              title="Horas Estimadas"
              value="153h"
              change={12.4}
              icon={Clock}
              iconColor="bg-gray-700"
            />
          </div>

          <div>
            <h2 className="text-base mb-4 text-gray-900">Empleados Destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
              {empleados.map((emp) => (
                <EmployeeCard
                  key={emp.nombre}
                  nombre={emp.nombre}
                  cargo={emp.cargo}
                  tareasCompletadas={emp.tareasCompletadas}
                  totalTareas={emp.totalTareas}
                  horasTrabajadas={emp.horasTrabajadas}
                  rendimiento={emp.rendimiento}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'proyectos' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProjectTasksChart />
            <HoursEstimatedChart />
            <TasksTimeline />
          </div>
          <div className="xl:sticky xl:top-0">
            <ObjetivosProgress />
          </div>
        </div>
      )}

      {activeTab === 'desempeno' && (
        <div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TeamWorkloadChart />
            <ProductivityChart />
          </div>
        </div>
      )}

      {activeTab === 'empleados' && (
        <div>
          <EmployeePerformanceTable />
        </div>
      )}
    </div>
  );
}
