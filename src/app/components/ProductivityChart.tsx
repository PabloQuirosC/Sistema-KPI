import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { id: 'juan', empleado: 'Juan P.', productividad: 92 },
  { id: 'maria', empleado: 'María G.', productividad: 88 },
  { id: 'carlos', empleado: 'Carlos R.', productividad: 85 },
  { id: 'ana', empleado: 'Ana L.', productividad: 78 },
  { id: 'pedro', empleado: 'Pedro M.', productividad: 95 },
  { id: 'lucia', empleado: 'Lucía S.', productividad: 82 },
];

export function ProductivityChart() {
  const getColor = (valor: number) => {
    if (valor >= 90) return '#1f2937';
    if (valor >= 80) return '#4b5563';
    if (valor >= 70) return '#6b7280';
    return '#dc2626';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xs md:text-sm mb-2 md:mb-3 font-semibold text-gray-800">Productividad por Empleado</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="category" dataKey="empleado" stroke="#666" />
          <YAxis type="number" stroke="#666" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => `${value}%`}
          />
          <Bar dataKey="productividad" radius={[8, 8, 0, 0]}>
            {data.map((entry) => (
              <Cell key={`prod-${entry.id}`} fill={getColor(entry.productividad)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
