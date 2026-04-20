# Consultas SQL de Ejemplo - Sistema KPI

## Consultas Comunes

### 1. Dashboard Principal - Métricas Generales

```sql
-- KPIs principales del sistema
SELECT
    (SELECT COUNT(*) FROM proyectos WHERE estado = 'en-progreso') AS proyectos_activos,
    (SELECT COUNT(*) FROM tareas WHERE estado IN ('pendiente', 'en-progreso')) AS tareas_pendientes,
    (SELECT COUNT(*) FROM empleados WHERE estado = 'activo') AS empleados_activos,
    (SELECT COUNT(*) FROM usuarios WHERE ultimo_acceso >= CURRENT_DATE) AS usuarios_hoy,
    (SELECT ROUND(AVG(progreso), 2) FROM proyectos WHERE estado = 'en-progreso') AS progreso_promedio_proyectos;
```

### 2. Proyectos por Departamento con Métricas

```sql
SELECT
    d.nombre AS departamento,
    COUNT(p.id) AS total_proyectos,
    SUM(CASE WHEN p.estado = 'completado' THEN 1 ELSE 0 END) AS completados,
    SUM(CASE WHEN p.estado = 'en-progreso' THEN 1 ELSE 0 END) AS en_progreso,
    ROUND(AVG(p.progreso), 2) AS progreso_promedio,
    SUM(p.presupuesto) AS presupuesto_total,
    SUM(p.presupuesto_gastado) AS gastado_total
FROM departamentos d
LEFT JOIN proyectos p ON d.id = p.departamento_id
GROUP BY d.id, d.nombre
ORDER BY total_proyectos DESC;
```

### 3. Top 10 Empleados con Mejor Rendimiento

```sql
SELECT
    e.nombre,
    e.cargo,
    d.nombre AS departamento,
    e.tareas_completadas,
    e.total_tareas,
    ROUND((e.tareas_completadas::DECIMAL / NULLIF(e.total_tareas, 0)) * 100, 2) AS porcentaje_completado,
    e.horas_trabajadas,
    e.rendimiento
FROM empleados e
LEFT JOIN departamentos d ON e.departamento_id = d.id
WHERE e.estado = 'activo'
  AND e.total_tareas > 0
ORDER BY e.rendimiento DESC, porcentaje_completado DESC
LIMIT 10;
```

### 4. Tareas Atrasadas con Responsables

```sql
SELECT
    t.titulo,
    t.prioridad,
    t.estado,
    t.fecha_vencimiento,
    DATE_PART('day', CURRENT_DATE - t.fecha_vencimiento) AS dias_atrasados,
    e.nombre AS asignado_a,
    p.nombre AS proyecto,
    d.nombre AS departamento
FROM tareas t
LEFT JOIN empleados e ON t.asignado_a = e.id
LEFT JOIN proyectos p ON t.proyecto_id = p.id
LEFT JOIN departamentos d ON p.departamento_id = d.id
WHERE t.estado NOT IN ('completada', 'cancelada')
  AND t.fecha_vencimiento < CURRENT_DATE
ORDER BY dias_atrasados DESC, t.prioridad DESC;
```

### 5. Proyectos con Mayor Riesgo de Retraso

```sql
SELECT
    p.nombre,
    p.estado,
    p.progreso,
    p.fecha_inicio,
    p.fecha_fin,
    DATE_PART('day', p.fecha_fin - CURRENT_DATE) AS dias_restantes,
    ROUND(
        (DATE_PART('day', CURRENT_DATE - p.fecha_inicio)::DECIMAL /
         NULLIF(DATE_PART('day', p.fecha_fin - p.fecha_inicio), 0)) * 100,
        2
    ) AS porcentaje_tiempo_transcurrido,
    p.progreso - ROUND(
        (DATE_PART('day', CURRENT_DATE - p.fecha_inicio)::DECIMAL /
         NULLIF(DATE_PART('day', p.fecha_fin - p.fecha_inicio), 0)) * 100,
        2
    ) AS desviacion,
    d.nombre AS departamento,
    u.nombre AS responsable
FROM proyectos p
LEFT JOIN departamentos d ON p.departamento_id = d.id
LEFT JOIN usuarios u ON p.creado_por = u.id
WHERE p.estado = 'en-progreso'
  AND p.fecha_fin IS NOT NULL
  AND p.progreso < ROUND(
        (DATE_PART('day', CURRENT_DATE - p.fecha_inicio)::DECIMAL /
         NULLIF(DATE_PART('day', p.fecha_fin - p.fecha_inicio), 0)) * 100,
        2
    ) - 10  -- Más de 10% de desviación
ORDER BY desviacion ASC
LIMIT 10;
```

### 6. Distribución de Tareas por Estado y Prioridad

```sql
SELECT
    estado,
    prioridad,
    COUNT(*) AS cantidad,
    ROUND(
        COUNT(*)::DECIMAL * 100 / SUM(COUNT(*)) OVER(),
        2
    ) AS porcentaje
FROM tareas
WHERE estado != 'cancelada'
GROUP BY estado, prioridad
ORDER BY
    CASE estado
        WHEN 'pendiente' THEN 1
        WHEN 'en-progreso' THEN 2
        WHEN 'en-revision' THEN 3
        WHEN 'completada' THEN 4
    END,
    CASE prioridad
        WHEN 'urgente' THEN 1
        WHEN 'alta' THEN 2
        WHEN 'media' THEN 3
        WHEN 'baja' THEN 4
    END;
```

### 7. Carga de Trabajo por Empleado

```sql
SELECT
    e.nombre,
    e.cargo,
    d.nombre AS departamento,
    COUNT(t.id) AS tareas_asignadas,
    SUM(CASE WHEN t.estado = 'pendiente' THEN 1 ELSE 0 END) AS pendientes,
    SUM(CASE WHEN t.estado = 'en-progreso' THEN 1 ELSE 0 END) AS en_progreso,
    SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END) AS completadas,
    SUM(CASE WHEN t.fecha_vencimiento < CURRENT_DATE AND t.estado NOT IN ('completada', 'cancelada') THEN 1 ELSE 0 END) AS atrasadas,
    SUM(t.horas_estimadas) AS horas_estimadas_total,
    e.horas_trabajadas
FROM empleados e
LEFT JOIN departamentos d ON e.departamento_id = d.id
LEFT JOIN tareas t ON e.id = t.asignado_a
WHERE e.estado = 'activo'
GROUP BY e.id, e.nombre, e.cargo, d.nombre, e.horas_trabajadas
ORDER BY tareas_asignadas DESC;
```

### 8. Objetivos por Proyecto con Progreso

```sql
SELECT
    p.nombre AS proyecto,
    o.nombre AS objetivo,
    o.estado,
    o.progreso,
    o.tareas_totales,
    o.tareas_completadas,
    o.fecha_inicio,
    o.fecha_fin,
    DATE_PART('day', o.fecha_fin - CURRENT_DATE) AS dias_restantes,
    u.nombre AS responsable
FROM objetivos o
JOIN proyectos p ON o.proyecto_id = p.id
LEFT JOIN usuarios u ON o.asignado_a = u.id
WHERE o.estado != 'completado'
ORDER BY o.fecha_fin ASC;
```

### 9. Actividad de Usuarios (Últimos 30 días)

```sql
SELECT
    u.nombre,
    r.nombre AS rol,
    u.ultimo_acceso,
    DATE_PART('day', CURRENT_TIMESTAMP - u.ultimo_acceso) AS dias_sin_acceso,
    COUNT(a.id) AS acciones_realizadas,
    STRING_AGG(DISTINCT a.modulo, ', ') AS modulos_utilizados
FROM usuarios u
JOIN roles r ON u.rol_id = r.id
LEFT JOIN auditoria a ON u.id = a.usuario_id
    AND a.created_at >= CURRENT_DATE - INTERVAL '30 days'
WHERE u.estado = 'activo'
GROUP BY u.id, u.nombre, r.nombre, u.ultimo_acceso
ORDER BY u.ultimo_acceso DESC;
```

### 10. Presupuesto vs Gasto por Proyecto

```sql
SELECT
    p.nombre AS proyecto,
    d.nombre AS departamento,
    p.presupuesto,
    p.presupuesto_gastado,
    p.presupuesto - p.presupuesto_gastado AS presupuesto_restante,
    ROUND((p.presupuesto_gastado / NULLIF(p.presupuesto, 0)) * 100, 2) AS porcentaje_gastado,
    p.progreso,
    CASE
        WHEN p.presupuesto_gastado > p.presupuesto THEN 'Sobre presupuesto'
        WHEN (p.presupuesto_gastado / NULLIF(p.presupuesto, 0)) > (p.progreso / 100.0) THEN 'Gastando más rápido'
        ELSE 'Normal'
    END AS estado_presupuesto
FROM proyectos p
LEFT JOIN departamentos d ON p.departamento_id = d.id
WHERE p.estado IN ('planificacion', 'en-progreso')
  AND p.presupuesto IS NOT NULL
ORDER BY porcentaje_gastado DESC;
```

## Consultas de Análisis Avanzado

### 11. Tendencia de Tareas Completadas (Últimos 6 meses)

```sql
SELECT
    TO_CHAR(DATE_TRUNC('month', t.fecha_completada), 'YYYY-MM') AS mes,
    COUNT(*) AS tareas_completadas,
    COUNT(DISTINCT t.asignado_a) AS empleados_activos,
    ROUND(AVG(t.horas_trabajadas), 2) AS horas_promedio_por_tarea
FROM tareas t
WHERE t.estado = 'completada'
  AND t.fecha_completada >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY DATE_TRUNC('month', t.fecha_completada)
ORDER BY mes DESC;
```

### 12. Comparación de Rendimiento entre Departamentos

```sql
SELECT
    d.nombre AS departamento,
    COUNT(DISTINCT e.id) AS total_empleados,
    ROUND(AVG(e.rendimiento), 2) AS rendimiento_promedio,
    SUM(e.tareas_completadas) AS tareas_completadas_total,
    SUM(e.total_tareas) AS tareas_asignadas_total,
    ROUND(
        (SUM(e.tareas_completadas)::DECIMAL / NULLIF(SUM(e.total_tareas), 0)) * 100,
        2
    ) AS tasa_completado,
    SUM(e.horas_trabajadas) AS horas_trabajadas_total
FROM departamentos d
LEFT JOIN empleados e ON d.id = e.departamento_id AND e.estado = 'activo'
GROUP BY d.id, d.nombre
HAVING COUNT(DISTINCT e.id) > 0
ORDER BY rendimiento_promedio DESC;
```

### 13. Tareas Críticas (Alta prioridad próximas a vencer)

```sql
SELECT
    t.titulo,
    t.descripcion,
    t.prioridad,
    t.estado,
    t.fecha_vencimiento,
    DATE_PART('day', t.fecha_vencimiento - CURRENT_DATE) AS dias_restantes,
    e.nombre AS asignado_a,
    e.email AS email_empleado,
    p.nombre AS proyecto,
    u.nombre AS creado_por
FROM tareas t
LEFT JOIN empleados e ON t.asignado_a = e.id
LEFT JOIN proyectos p ON t.proyecto_id = p.id
LEFT JOIN usuarios u ON t.creado_por = u.id
WHERE t.prioridad IN ('alta', 'urgente')
  AND t.estado IN ('pendiente', 'en-progreso')
  AND t.fecha_vencimiento BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
ORDER BY t.fecha_vencimiento ASC, t.prioridad DESC;
```

### 14. Histórico de Cambios por Usuario (Auditoría)

```sql
SELECT
    u.nombre AS usuario,
    a.accion,
    a.modulo,
    a.tabla,
    a.registro_id,
    a.created_at,
    a.datos_nuevos->>'nombre' AS valor_modificado,
    a.ip_address
FROM auditoria a
LEFT JOIN usuarios u ON a.usuario_id = u.id
WHERE a.created_at >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY a.created_at DESC
LIMIT 100;
```

### 15. Proyectos y Tareas Sin Asignar

```sql
-- Proyectos sin departamento asignado
SELECT
    'Proyecto' AS tipo,
    p.nombre,
    p.estado,
    p.fecha_inicio,
    p.fecha_fin
FROM proyectos p
WHERE p.departamento_id IS NULL

UNION ALL

-- Tareas sin asignar a empleados
SELECT
    'Tarea' AS tipo,
    t.titulo AS nombre,
    t.estado::text,
    t.fecha_inicio,
    t.fecha_vencimiento AS fecha_fin
FROM tareas t
WHERE t.asignado_a IS NULL
  AND t.estado != 'cancelada'

ORDER BY tipo, fecha_fin;
```

## Procedimientos Almacenados Útiles

### Actualizar Progreso de Proyecto

```sql
CREATE OR REPLACE FUNCTION actualizar_progreso_proyecto(proyecto_id_param INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE proyectos
    SET progreso = CASE
        WHEN total_tareas > 0 THEN
            ROUND((tareas_completadas::DECIMAL / total_tareas) * 100)
        ELSE 0
    END,
    estado = CASE
        WHEN tareas_completadas = total_tareas AND total_tareas > 0 THEN 'completado'::estado_proyecto
        WHEN tareas_completadas > 0 THEN 'en-progreso'::estado_proyecto
        ELSE estado
    END
    WHERE id = proyecto_id_param;
END;
$$ LANGUAGE plpgsql;
```

### Calcular Rendimiento de Empleado

```sql
CREATE OR REPLACE FUNCTION calcular_rendimiento_empleado(empleado_id_param INTEGER)
RETURNS DECIMAL AS $$
DECLARE
    rendimiento DECIMAL;
BEGIN
    SELECT
        CASE
            WHEN total_tareas > 0 THEN
                ROUND(
                    ((tareas_completadas::DECIMAL / total_tareas) * 0.6 +
                     LEAST(horas_trabajadas / 160, 1) * 0.4) * 100,
                    2
                )
            ELSE 0
        END
    INTO rendimiento
    FROM empleados
    WHERE id = empleado_id_param;

    UPDATE empleados
    SET rendimiento = rendimiento
    WHERE id = empleado_id_param;

    RETURN rendimiento;
END;
$$ LANGUAGE plpgsql;
```

### Asignar Tarea y Actualizar Contadores

```sql
CREATE OR REPLACE FUNCTION asignar_tarea(
    tarea_id_param INTEGER,
    empleado_id_param INTEGER
)
RETURNS VOID AS $$
BEGIN
    -- Actualizar la tarea
    UPDATE tareas
    SET asignado_a = empleado_id_param,
        estado = 'en-progreso'::estado_tarea
    WHERE id = tarea_id_param;

    -- Incrementar contador de tareas del empleado
    UPDATE empleados
    SET total_tareas = total_tareas + 1
    WHERE id = empleado_id_param;

    -- Registrar en auditoría
    INSERT INTO auditoria (usuario_id, accion, modulo, tabla, registro_id)
    VALUES (empleado_id_param, 'ASIGNAR', 'tareas', 'tareas', tarea_id_param);
END;
$$ LANGUAGE plpgsql;
```

## Consultas de Reportes

### Reporte Mensual de Productividad

```sql
SELECT
    d.nombre AS departamento,
    COUNT(DISTINCT e.id) AS empleados,
    COUNT(t.id) AS tareas_totales,
    SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END) AS completadas,
    ROUND(
        (SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END)::DECIMAL / NULLIF(COUNT(t.id), 0)) * 100,
        2
    ) AS tasa_completado,
    SUM(t.horas_trabajadas) AS horas_trabajadas,
    ROUND(AVG(e.rendimiento), 2) AS rendimiento_promedio
FROM departamentos d
LEFT JOIN empleados e ON d.id = e.departamento_id AND e.estado = 'activo'
LEFT JOIN tareas t ON e.id = t.asignado_a
    AND DATE_TRUNC('month', t.created_at) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY d.id, d.nombre
ORDER BY tasa_completado DESC;
```

Este archivo incluye las consultas SQL más útiles para gestionar y analizar el sistema KPI.
