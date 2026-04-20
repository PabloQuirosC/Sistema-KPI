import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { id: 'admin', name: 'Administrador', value: 1, color: '#9333ea' },
  { id: 'gerente', name: 'Gerente', value: 3, color: '#3b82f6' },
  { id: 'lider', name: 'Líder de Equipo', value: 5, color: '#10b981' },
  { id: 'empleado', name: 'Empleado', value: 15, color: '#6b7280' },
];

export function UserRoleDistribution() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="mb-4">Distribución de Usuarios por Rol</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
