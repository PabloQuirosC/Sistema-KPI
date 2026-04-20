import { BarChart3, Users, CheckSquare, Home, FolderKanban, UserCog, ChevronLeft, LogOut } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

const modules = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'proyectos', name: 'Proyectos', icon: FolderKanban },
  { id: 'tareas', name: 'Tareas', icon: CheckSquare },
  { id: 'empleados', name: 'Empleados', icon: Users },
  { id: 'reportes', name: 'Reportes', icon: BarChart3 },
  { id: 'usuarios', name: 'Administración', icon: UserCog },
];

export function Sidebar({ activeModule, onModuleChange, isCollapsed, onToggleCollapse, onLogout }: SidebarProps) {
  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/50 min-h-screen transition-all duration-300 relative shadow-2xl flex-shrink-0`}>
      <div className="p-4 md:p-6 border-b border-gray-800/50">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="p-2 bg-gradient-to-br from-red-600 to-red-800 rounded-xl shadow-lg shadow-red-900/50 flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-white truncate">Sistema KPI</h2>
              <p className="text-xs text-gray-400 truncate">Administración</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-8 bg-gradient-to-br from-red-600 to-red-800 border border-gray-900 rounded-full p-1.5 text-white hover:shadow-xl hover:shadow-red-900/50 hover:scale-110 transition-all duration-200 z-20 shadow-md flex-shrink-0"
        title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
      >
        <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      <nav className="p-3 md:p-4 mt-2 flex flex-col h-[calc(100vh-180px)]">
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;

            return (
              <li key={module.id}>
                <button
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-900/30'
                      : 'text-gray-300 hover:bg-gray-800/80 hover:text-white hover:shadow-sm'
                  }`}
                  title={isCollapsed ? module.name : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium truncate min-w-0 flex-1 text-left">{module.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Botón de cerrar sesión */}
        <div className="border-t border-gray-800/50 pt-3 md:pt-4 flex-shrink-0">
          <button
            onClick={onLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-200 text-gray-300 hover:bg-red-600/20 hover:text-red-400 hover:shadow-sm`}
            title={isCollapsed ? 'Cerrar sesión' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium truncate min-w-0 flex-1 text-left">Cerrar Sesión</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}
