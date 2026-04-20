import { useState } from 'react';
import { Calendar, LogOut } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardModule } from './components/modules/DashboardModule';
import { ProyectosModule } from './components/modules/ProyectosModule';
import { EmpleadosModule } from './components/modules/EmpleadosModule';
import { TareasModule } from './components/modules/TareasModule';
import { UsuariosModule } from './components/modules/UsuariosModule';
import { ReportesModule } from './components/modules/ReportesModule';
import { LoginPage } from './components/LoginPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveModule('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'proyectos':
        return <ProyectosModule />;
      case 'empleados':
        return <EmpleadosModule />;
      case 'tareas':
        return <TareasModule />;
      case 'usuarios':
        return <UsuariosModule />;
      case 'reportes':
        return <ReportesModule />;
      default:
        return <DashboardModule />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/30 to-gray-200/20">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={handleLogout}
      />

      <div className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm flex-shrink-0">
          <div className="px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-red-600 to-gray-900 bg-clip-text text-transparent truncate">
                  Sistema de Medición de Desempeño
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 capitalize mt-0.5 truncate">{currentDate}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
                <div className="flex items-center gap-2 bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm border border-gray-200/50 flex-1 sm:flex-initial min-w-0">
                  <Calendar className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <select className="text-xs sm:text-sm bg-transparent border-none outline-none cursor-pointer text-gray-700 min-w-0 flex-1">
                    <option>Esta semana</option>
                    <option>Este mes</option>
                    <option>Este trimestre</option>
                    <option>Este año</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8 flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}