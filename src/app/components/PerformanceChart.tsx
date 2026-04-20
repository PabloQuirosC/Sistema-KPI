import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { id: 'ventas', categoria: 'Ventas', actual: 85, objetivo: 90 },
  { id: 'clientes', categoria: 'Clientes', actual: 92, objetivo: 85 },
  { id: 'satisfaccion', categoria: 'Satisfacción', actual: 88, objetivo: 95 },
  { id: 'productividad', categoria: 'Productividad', actual: 78, objetivo: 80 },
  { id: 'calidad', categoria: 'Calidad', actual: 94, objetivo: 90 },
];

export function PerformanceChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="mb-4">Desempeño vs Objetivos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="categoria" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => `${value}%`}
          />
          <Legend />
          <Bar dataKey="actual" fill="#3b82f6" name="Actual" radius={[8, 8, 0, 0]} />
          <Bar dataKey="objetivo" fill="#10b981" name="Objetivo" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
