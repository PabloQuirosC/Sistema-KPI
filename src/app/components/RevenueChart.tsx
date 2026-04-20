import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { id: 'ene', mes: 'Ene', ingresos: 45000 },
  { id: 'feb', mes: 'Feb', ingresos: 52000 },
  { id: 'mar', mes: 'Mar', ingresos: 48000 },
  { id: 'abr', mes: 'Abr', ingresos: 61000 },
  { id: 'may', mes: 'May', ingresos: 58000 },
  { id: 'jun', mes: 'Jun', ingresos: 72000 },
  { id: 'jul', mes: 'Jul', ingresos: 68000 },
  { id: 'ago', mes: 'Ago', ingresos: 75000 },
  { id: 'sep', mes: 'Sep', ingresos: 82000 },
  { id: 'oct', mes: 'Oct', ingresos: 79000 },
  { id: 'nov', mes: 'Nov', ingresos: 88000 },
  { id: 'dic', mes: 'Dic', ingresos: 95000 },
];

export function RevenueChart() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="mb-4">Ingresos Mensuales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorIngresosRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="mes" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Area
            type="monotone"
            dataKey="ingresos"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorIngresosRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
