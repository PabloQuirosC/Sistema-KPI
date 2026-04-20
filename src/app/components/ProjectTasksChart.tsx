import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { id: 'p1', proyecto: 'Rediseño Web', completadas: 18, pendientes: 10, enProgreso: 7 },
  { id: 'p2', proyecto: 'App Móvil', completadas: 19, pendientes: 15, enProgreso: 8 },
  { id: 'p3', proyecto: 'CRM Interno', completadas: 5, pendientes: 22, enProgreso: 8 },
  { id: 'p4', proyecto: 'Marketing', completadas: 12, pendientes: 6, enProgreso: 4 },
];

export function ProjectTasksChart() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
      <h3 className="mb-2 md:mb-3 text-xs md:text-sm font-semibold text-gray-800">Distribución de Tareas por Proyecto</h3>
      <div className="min-w-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="proyecto" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="completadas" stackId="a" fill="#1f2937" name="Completadas" />
            <Bar dataKey="enProgreso" stackId="a" fill="#dc2626" name="En Progreso" />
            <Bar dataKey="pendientes" stackId="a" fill="#9ca3af" name="Pendientes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
