# 📊 Ejemplos Visuales de Reportes - Sistema KPI

## Cómo se Verían los Reportes

A continuación, ejemplos de cómo se verían algunos de los reportes más importantes del sistema:

---

## 📁 1. Estado General de Proyectos

```
┌─────────────────────────────────────────────────────────────────────┐
│ REPORTE: ESTADO GENERAL DE PROYECTOS                    Abril 2026 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Proyecto                    Depto.      Avance    Tareas    Estado │
│ ─────────────────────────────────────────────────────────────────  │
│ Rediseño Web Corporativo    Desarrollo   78%     14/18    ✅ Activo│
│ App Móvil E-commerce        Desarrollo   45%      9/20    ✅ Activo│
│ Sistema CRM Interno         TI           92%     23/25    ✅ Activo│
│ Campaña Marketing Digital   Marketing    34%      8/24    🟡 Riesgo│
│ Automatización Ventas Q2    Ventas       15%      3/20    🔴 Atras.│
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  DISTRIBUCIÓN POR ESTADO                             │          │
│ │                                                       │          │
│ │  ███████████ En Progreso (60%)                       │          │
│ │  █████ Completados (25%)                             │          │
│ │  ███ Pausados (10%)                                  │          │
│ │  ██ Cancelados (5%)                                  │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ RESUMEN:                                                           │
│ • Total de proyectos: 5                                           │
│ • Promedio de avance: 52.8%                                       │
│ • Proyectos en riesgo: 2                                          │
│ • Presupuesto total: $485,000                                     │
│ • Presupuesto gastado: $312,450 (64.4%)                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⚠️ 2. Proyectos Críticos / En Riesgo

```
┌─────────────────────────────────────────────────────────────────────┐
│ ALERTA: PROYECTOS CRÍTICOS                              20/04/2026 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 🔴 CRÍTICO: Automatización Ventas Q2                               │
│    ├─ Avance: 15% (Esperado: 45%)                                 │
│    ├─ Días de retraso: 12 días                                    │
│    ├─ Vence en: 10 días                                           │
│    ├─ Responsable: Carlos Rodríguez                               │
│    ├─ Tareas bloqueadas: 8                                        │
│    └─ Acción requerida: Reasignar recursos urgente                │
│                                                                     │
│ 🟠 EN RIESGO: Campaña Marketing Digital                           │
│    ├─ Avance: 34% (Esperado: 40%)                                 │
│    ├─ Días de retraso: 3 días                                     │
│    ├─ Vence en: 25 días                                           │
│    ├─ Responsable: Ana López                                      │
│    ├─ Tareas pendientes alta prioridad: 5                         │
│    └─ Acción requerida: Revisión de sprint                        │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  ANÁLISIS DE RIESGO                                  │          │
│ │                                                       │          │
│ │  Progreso ─────────────────────────────────────      │          │
│ │  actual:     ████████░░░░░░░░░░░░░░░░░ 15%          │          │
│ │                                                       │          │
│ │  Progreso ─────────────────────────────────────      │          │
│ │  esperado:   █████████████████████░░░░░ 45%          │          │
│ │                                                       │          │
│ │  Desviación: -30%  🔴 CRÍTICO                        │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ RECOMENDACIONES:                                                   │
│ 1. Convocar reunión urgente con equipo de Ventas                  │
│ 2. Reasignar 2 desarrolladores a automatización                   │
│ 3. Revisar alcance del proyecto                                   │
│ 4. Considerar extensión de plazo                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 👥 3. Ranking de Empleados (Top Performers)

```
┌─────────────────────────────────────────────────────────────────────┐
│ TOP 10 EMPLEADOS - RENDIMIENTO ABRIL 2026                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Posición  Nombre              Depto.      Rend.  Tareas  Horas    │
│ ────────────────────────────────────────────────────────────────   │
│                                                                     │
│   🥇 1    Pedro Martínez      Desarrollo   95%   28/30   42h      │
│           ████████████████████░ Excelente                          │
│                                                                     │
│   🥈 2    María González      Diseño       88%   24/28   40h      │
│           █████████████████░░░ Muy Bueno                           │
│                                                                     │
│   🥉 3    Juan Pérez          Desarrollo   85%   26/32   38h      │
│           ████████████████░░░░ Muy Bueno                           │
│                                                                     │
│   4       Ana López           Marketing    78%   22/30   35h      │
│           ██████████████░░░░░░ Bueno                               │
│                                                                     │
│   5       Carlos Rodríguez    Ventas       82%   20/25   40h      │
│           ███████████████░░░░░ Bueno                               │
│                                                                     │
│   6       Lucía Sánchez       Soporte      65%   18/35   36h      │
│           ███████████░░░░░░░░░ Regular                             │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  DISTRIBUCIÓN DE RENDIMIENTO                         │          │
│ │                                                       │          │
│ │  90-100% ███████ (15%)  Excelente                    │          │
│ │  80-89%  ████████████ (35%)  Muy Bueno               │          │
│ │  70-79%  ████████ (25%)  Bueno                       │          │
│ │  60-69%  ████ (15%)  Regular                         │          │
│ │  <60%    ██ (10%)  Necesita mejora                   │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ MÉTRICAS DEL MES:                                                  │
│ • Rendimiento promedio general: 78.2%                             │
│ • Tareas completadas totales: 248                                 │
│ • Horas trabajadas totales: 960h                                  │
│ • Tasa de cumplimiento: 82.5%                                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⏱️ 4. Horas Estimadas vs Trabajadas

```
┌─────────────────────────────────────────────────────────────────────┐
│ ANÁLISIS: HORAS ESTIMADAS VS TRABAJADAS                Abril 2026 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Proyecto                   Estimadas  Trabajadas  Desviación      │
│ ─────────────────────────────────────────────────────────────────  │
│ Rediseño Web Corporativo      120h       138h      +15% 🔴        │
│ App Móvil E-commerce          160h       145h       -9% 🟢        │
│ Sistema CRM Interno           80h        92h       +15% 🔴        │
│ Campaña Marketing             100h       85h       -15% 🟢        │
│ Automatización Ventas         140h       125h      -11% 🟢        │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  GRÁFICO COMPARATIVO                                 │          │
│ │                                                       │          │
│ │  Proyecto A  ████████████ Est.                       │          │
│ │              ██████████████░ Real (+15%)              │          │
│ │                                                       │          │
│ │  Proyecto B  ████████████████ Est.                   │          │
│ │              ██████████████ Real (-9%)                │          │
│ │                                                       │          │
│ │  Proyecto C  ████████ Est.                           │          │
│ │              █████████░ Real (+15%)                   │          │
│ │                                                       │          │
│ │  Proyecto D  ██████████ Est.                         │          │
│ │              ████████ Real (-15%)                     │          │
│ │                                                       │          │
│ │  Proyecto E  ██████████████ Est.                     │          │
│ │              ████████████ Real (-11%)                 │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ ANÁLISIS:                                                          │
│ • Total estimado: 600h                                            │
│ • Total trabajado: 585h                                           │
│ • Precisión general: 97.5% 🟢                                     │
│ • Proyectos subestimados: 2 (40%)                                 │
│ • Proyectos sobreestimados: 3 (60%)                               │
│                                                                     │
│ RECOMENDACIONES:                                                   │
│ • Revisar estimaciones de proyectos de desarrollo web             │
│ • Considerar factor de complejidad +20% para integraciones        │
│ • Equipo de marketing estima muy conservadoramente                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📈 5. Dashboard Ejecutivo

```
┌─────────────────────────────────────────────────────────────────────┐
│ DASHBOARD EJECUTIVO                                     Abril 2026 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐│
│ │ PROYECTOS    │ │ TAREAS       │ │ EMPLEADOS    │ │ HORAS      ││
│ │ ACTIVOS      │ │ COMPLETADAS  │ │ ACTIVOS      │ │ TRABAJADAS ││
│ │              │ │              │ │              │ │            ││
│ │     4        │ │     54       │ │     24       │ │    960h    ││
│ │              │ │              │ │              │ │            ││
│ │   ↑ 33.3%   │ │   ↑ 15.2%   │ │   ↑ 8.3%    │ │  ↑ 5.7%   ││
│ └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘│
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  ESTADO DE PROYECTOS                                 │          │
│ │                                                       │          │
│ │  ████████████████████ 60% En Progreso                │          │
│ │  ██████████ 25% Completados                          │          │
│ │  ████ 10% Pausados                                   │          │
│ │  ██ 5% Cancelados                                    │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  PRODUCTIVIDAD SEMANAL (Tareas completadas)          │          │
│ │                                                       │          │
│ │  60│                                          ●       │          │
│ │  50│                    ●               ●             │          │
│ │  40│         ●                                        │          │
│ │  30│                                                  │          │
│ │  20│    ●                                             │          │
│ │  10│                                                  │          │
│ │   0└────────────────────────────────────────────────│          │
│ │     Sem1  Sem2  Sem3  Sem4  Sem5  Sem6             │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ ALERTAS CRÍTICAS:                                                  │
│ 🔴 2 proyectos en riesgo de incumplimiento                         │
│ 🟠 8 tareas vencen en las próximas 48 horas                        │
│ 🟡 1 empleado sobrecargado (>50 horas pendientes)                  │
│                                                                     │
│ ACCIONES RECOMENDADAS:                                             │
│ 1. Revisar proyecto "Automatización Ventas Q2"                    │
│ 2. Reasignar tareas de Pedro Martínez                             │
│ 3. Convocar sprint planning para Marketing                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🏢 6. Comparativa entre Departamentos

```
┌─────────────────────────────────────────────────────────────────────┐
│ REPORTE: COMPARATIVA DE DEPARTAMENTOS                   Abril 2026 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Depto.         Empleados  Proyectos  Tareas   Rendim.  Horas      │
│ ─────────────────────────────────────────────────────────────────  │
│ Desarrollo        8          3       45/52     87%     320h       │
│ Diseño            4          2       28/35     82%     160h       │
│ Marketing         5          2       32/45     68%     200h       │
│ Ventas            6          1       18/28     72%     240h       │
│ TI                3          1       15/18     92%     120h       │
│ RRHH              2          0        8/12     75%      80h       │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  RENDIMIENTO POR DEPARTAMENTO                        │          │
│ │                                                       │          │
│ │  TI          ██████████████████░░ 92%                │          │
│ │  Desarrollo  █████████████████░░░ 87%                │          │
│ │  Diseño      ████████████████░░░░ 82%                │          │
│ │  RRHH        ███████████████░░░░░ 75%                │          │
│ │  Ventas      ██████████████░░░░░░ 72%                │          │
│ │  Marketing   █████████████░░░░░░░ 68%                │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  CARGA DE TRABAJO (Tareas por empleado)              │          │
│ │                                                       │          │
│ │  Desarrollo  6.5 tareas/empleado                     │          │
│ │  Diseño      7.0 tareas/empleado                     │          │
│ │  Marketing   6.4 tareas/empleado  🔴 Sobrecarga      │          │
│ │  Ventas      3.0 tareas/empleado  🟢 Subcapacidad    │          │
│ │  TI          5.0 tareas/empleado                     │          │
│ │  RRHH        4.0 tareas/empleado                     │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ INSIGHTS:                                                          │
│ • TI tiene el mejor rendimiento (92%) con menos empleados          │
│ • Marketing está sobrecargado - considerar contratar               │
│ • Ventas tiene capacidad disponible - reasignar tareas             │
│ • Desarrollo mantiene productividad alta a pesar del volumen       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 💰 7. Estado de Presupuestos

```
┌─────────────────────────────────────────────────────────────────────┐
│ CONTROL DE PRESUPUESTOS                                 Abril 2026 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ Proyecto                  Asignado   Gastado    Restante   Estado │
│ ─────────────────────────────────────────────────────────────────  │
│ Rediseño Web            $120,000   $95,400    $24,600   🟢 79%   │
│ App E-commerce          $185,000  $148,000    $37,000   🟢 80%   │
│ CRM Interno              $80,000   $72,800     $7,200   🟡 91%   │
│ Marketing Digital       $100,000  $112,000   -$12,000   🔴 112%  │
│ Automatización           $85,000   $68,250    $16,750   🟢 80%   │
│                                                                     │
│ ┌──────────────────────────────────────────────────────┐          │
│ │  CONSUMO DE PRESUPUESTO                              │          │
│ │                                                       │          │
│ │  Web        ████████████████░░░░ 79%                 │          │
│ │  E-com      ████████████████░░░░ 80%                 │          │
│ │  CRM        ██████████████████░░ 91%  ⚠️             │          │
│ │  Marketing  ████████████████████░ 112% 🔴            │          │
│ │  Auto.      ████████████████░░░░ 80%                 │          │
│ └──────────────────────────────────────────────────────┘          │
│                                                                     │
│ RESUMEN FINANCIERO:                                                │
│ • Presupuesto total: $570,000                                     │
│ • Gastado a la fecha: $496,450 (87%)                              │
│ • Disponible: $73,550                                             │
│ • Sobregirado: $12,000 (Marketing Digital)                        │
│                                                                     │
│ PROYECCIÓN:                                                        │
│ • Gasto proyectado fin de mes: $542,000                           │
│ • Desviación esperada: -$5,000 (dentro del margen)                │
│                                                                     │
│ ALERTAS:                                                           │
│ 🔴 Marketing Digital excedió presupuesto en $12,000                │
│ 🟡 CRM Interno al 91% - monitorear de cerca                        │
│                                                                     │
│ ACCIONES REQUERIDAS:                                               │
│ 1. Solicitar extensión presupuestaria para Marketing              │
│ 2. Revisar gastos adicionales no planificados                     │
│ 3. Optimizar recursos en CRM para no exceder                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Formatos de Exportación

Todos estos reportes se pueden exportar en:

### 📄 PDF
- Formato profesional para presentaciones
- Incluye gráficos de alta resolución
- Logo de la empresa
- Firma digital opcional

### 📊 Excel
- Datos en tablas dinámicas
- Gráficos editables
- Fórmulas incluidas
- Filtros y segmentadores

### 📋 CSV
- Datos crudos para análisis
- Compatible con cualquier herramienta
- Perfecto para importar a otros sistemas

### 🎨 PowerPoint
- Slides pre-diseñadas
- Gráficos animados
- Listo para presentar

---

## Personalización

Cada reporte puede personalizarse con:

- ✅ Logo de la empresa
- ✅ Colores corporativos
- ✅ Filtros específicos (fecha, departamento, empleado)
- ✅ Métricas adicionales
- ✅ Comentarios y anotaciones
- ✅ Firma digital
- ✅ Watermark

---

**Sistema KPI v1.0** | Reportería Avanzada | Abril 2026
