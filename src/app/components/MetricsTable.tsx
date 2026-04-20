interface Metric {
  departamento: string;
  ventas: number;
  crecimiento: number;
  conversion: number;
  estado: 'excelente' | 'bueno' | 'atencion';
}

const metrics: Metric[] = [
  { departamento: 'Ventas', ventas: 125000, crecimiento: 15, conversion: 3.2, estado: 'excelente' },
  { departamento: 'Marketing', ventas: 85000, crecimiento: 22, conversion: 4.1, estado: 'excelente' },
  { departamento: 'Producto', ventas: 95000, crecimiento: 8, conversion: 2.8, estado: 'bueno' },
  { departamento: 'Soporte', ventas: 45000, crecimiento: -3, conversion: 1.9, estado: 'atencion' },
  { departamento: 'RRHH', ventas: 32000, crecimiento: 5, conversion: 2.1, estado: 'bueno' },
];

export function MetricsTable() {
  const getStatusColor = (estado: Metric['estado']) => {
    switch (estado) {
      case 'excelente': return 'bg-gray-800 text-white';
      case 'bueno': return 'bg-gray-100 text-gray-800';
      case 'atencion': return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusText = (estado: Metric['estado']) => {
    switch (estado) {
      case 'excelente': return 'Excelente';
      case 'bueno': return 'Bueno';
      case 'atencion': return 'Atención';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3>Métricas por Departamento</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Departamento</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Ventas</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Crecimiento</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Conversión</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {metrics.map((metric) => (
              <tr key={metric.departamento} className="hover:bg-gray-50">
                <td className="px-6 py-4">{metric.departamento}</td>
                <td className="px-6 py-4">${metric.ventas.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={metric.crecimiento >= 0 ? 'text-gray-700' : 'text-red-600'}>
                    {metric.crecimiento >= 0 ? '↑' : '↓'} {Math.abs(metric.crecimiento)}%
                  </span>
                </td>
                <td className="px-6 py-4">{metric.conversion}%</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(metric.estado)}`}>
                    {getStatusText(metric.estado)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
