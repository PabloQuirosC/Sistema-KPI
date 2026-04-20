import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { id: 'sem1', semana: 'Sem 1', completadas: 45, asignadas: 50, horasEstimadas: 380, horasTrabajadas: 365 },
  { id: 'sem2', semana: 'Sem 2', completadas: 52, asignadas: 55, horasEstimadas: 420, horasTrabajadas: 410 },
  { id: 'sem3', semana: 'Sem 3', completadas: 48, asignadas: 52, horasEstimadas: 400, horasTrabajadas: 385 },
  { id: 'sem4', semana: 'Sem 4', completadas: 61, asignadas: 63, horasEstimadas: 485, horasTrabajadas: 478 },
  { id: 'sem5', semana: 'Sem 5', completadas: 58, asignadas: 60, horasEstimadas: 465, horasTrabajadas: 455 },
  { id: 'sem6', semana: 'Sem 6', completadas: 65, asignadas: 68, horasEstimadas: 520, horasTrabajadas: 515 },
];

export function TasksTimeline() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
      <h3 className="text-xs md:text-sm mb-2 md:mb-3 font-semibold text-gray-800">Tareas Semanales</h3>
      <div className="min-w-0">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="semana" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="asignadas"
              stroke="#6b7280"
              strokeWidth={2}
              name="Asignadas"
              dot={{ fill: '#6b7280', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="completadas"
              stroke="#dc2626"
              strokeWidth={2}
              name="Completadas"
              dot={{ fill: '#dc2626', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
