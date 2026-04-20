import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { id: 'pedro', empleado: 'Pedro M.', tareasActivas: 12, capacidad: 15 },
  { id: 'maria', empleado: 'María G.', tareasActivas: 10, capacidad: 12 },
  { id: 'juan', empleado: 'Juan P.', tareasActivas: 14, capacidad: 15 },
  { id: 'ana', empleado: 'Ana L.', tareasActivas: 8, capacidad: 12 },
  { id: 'carlos', empleado: 'Carlos R.', tareasActivas: 11, capacidad: 12 },
  { id: 'lucia', empleado: 'Lucía S.', tareasActivas: 9, capacidad: 12 },
];

export function TeamWorkloadChart() {
  const getColor = (tareasActivas: number, capacidad: number) => {
    const porcentaje = (tareasActivas / capacidad) * 100;
    if (porcentaje >= 90) return '#dc2626';
    if (porcentaje >= 70) return '#6b7280';
    return '#1f2937';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
      <h3 className="mb-2 md:mb-3 text-xs md:text-sm font-semibold text-gray-800">Carga de Trabajo del Equipo</h3>
      <div className="min-w-0">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="category" dataKey="empleado" stroke="#666" />
            <YAxis type="number" stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value: number, name: string) => {
                if (name === 'tareasActivas') return [`${value} tareas`, 'Tareas Activas'];
                return [`${value} tareas`, 'Capacidad'];
              }}
            />
            <Bar dataKey="capacidad" fill="#e5e7eb" name="Capacidad" radius={[8, 8, 0, 0]} />
            <Bar dataKey="tareasActivas" name="Tareas Activas" radius={[8, 8, 0, 0]}>
              {data.map((entry) => (
                <Cell key={`cell-${entry.id}`} fill={getColor(entry.tareasActivas, entry.capacidad)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-3 md:gap-4 mt-3 md:mt-4 text-xs flex-wrap">
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-gray-800 flex-shrink-0"></div>
          <span className="text-gray-600">Disponible</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-gray-600 flex-shrink-0"></div>
          <span className="text-gray-600">Ocupado</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-600 flex-shrink-0"></div>
          <span className="text-gray-600">Sobrecargado</span>
        </div>
      </div>
    </div>
  );
}
