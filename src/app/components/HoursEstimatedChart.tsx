import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { proyecto: 'Web Corporativo', estimadas: 44, trabajadas: 38 },
  { proyecto: 'App E-commerce', estimadas: 38, trabajadas: 32 },
  { proyecto: 'CRM Interno', estimadas: 14, trabajadas: 8 },
  { proyecto: 'Marketing Digital', estimadas: 18, trabajadas: 15 },
  { proyecto: 'Automatización', estimadas: 20, trabajadas: 16 },
];

export function HoursEstimatedChart() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xs md:text-sm mb-2 md:mb-3 font-semibold text-gray-800">Horas Estimadas vs Trabajadas</h3>
      <div className="min-w-0">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="proyecto"
              stroke="#666"
              fontSize={11}
              angle={-15}
              textAnchor="end"
              height={70}
            />
            <YAxis stroke="#666" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar
              dataKey="estimadas"
              fill="#9ca3af"
              name="Horas Estimadas"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="trabajadas"
              fill="#dc2626"
              name="Horas Trabajadas"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
