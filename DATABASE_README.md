# 📚 Documentación de Base de Datos - Sistema KPI

## 📋 Archivos Disponibles

Este directorio contiene la documentación completa del diseño de base de datos para el Sistema KPI:

| Archivo | Descripción |
|---------|-------------|
| `DATABASE_SCHEMA.md` | Diagrama ERD en Mermaid y descripción detallada de tablas |
| `database-schema.sql` | Script SQL completo con DDL (CREATE TABLE, índices, triggers) |
| `SQL_QUERIES_EJEMPLOS.md` | Colección de consultas SQL útiles y reportes |
| `DIAGRAMA_VISUAL.txt` | Diagrama visual en ASCII para referencia rápida |

## 🚀 Cómo Usar

### 1. Visualizar el Diagrama ERD

El archivo `DATABASE_SCHEMA.md` contiene un diagrama en formato **Mermaid** que puedes visualizar en:

- **GitHub**: Se renderiza automáticamente
- **VSCode**: Instala la extensión "Markdown Preview Mermaid Support"
- **Mermaid Live Editor**: https://mermaid.live
- **Notion, Obsidian, etc.**: La mayoría soportan Mermaid

### 2. Crear la Base de Datos

#### Opción A: PostgreSQL (Recomendado)

```bash
# Crear base de datos
createdb sistema_kpi

# Ejecutar el schema
psql -d sistema_kpi -f database-schema.sql
```

#### Opción B: Docker

```bash
# Crear contenedor PostgreSQL
docker run --name kpi-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=sistema_kpi \
  -p 5432:5432 \
  -d postgres:14

# Ejecutar schema
docker exec -i kpi-postgres psql -U postgres -d sistema_kpi < database-schema.sql
```

#### Opción C: Supabase (Recomendado para el proyecto Lovable)

1. Ve a https://supabase.com y crea un proyecto
2. Ve a SQL Editor
3. Copia y pega el contenido de `database-schema.sql`
4. Ejecuta el script

### 3. Configurar Conexión

#### Node.js con pg

```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sistema_kpi',
  password: 'mysecretpassword',
  port: 5432,
});

export default pool;
```

#### Prisma ORM

```bash
# Instalar Prisma
npm install prisma @prisma/client

# Inicializar
npx prisma init

# Configurar schema.prisma basándote en database-schema.sql
# Luego:
npx prisma generate
```

#### Supabase Client

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tu-proyecto.supabase.co';
const supabaseKey = 'tu-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

## 📊 Estructura de la Base de Datos

### Tablas Principales

```
10 tablas principales:
├── roles (Roles de usuario)
├── usuarios (Autenticación y perfiles)
├── permisos (Control de acceso)
├── departamentos (Estructura organizacional)
├── empleados (Información del personal)
├── proyectos (Proyectos en ejecución)
├── objetivos (Metas de proyectos)
├── tareas (Unidades de trabajo)
├── responsables (Asignaciones especiales)
└── auditoria (Registro de cambios)
```

### Relaciones Clave

- **1:1** → Usuario ↔ Empleado
- **1:N** → Proyecto → Tareas
- **1:N** → Departamento → Empleados
- **1:N** → Objetivo → Tareas
- **N:1** → Usuario → Rol

## 🔍 Consultas de Ejemplo

Ver `SQL_QUERIES_EJEMPLOS.md` para consultas completas. Ejemplos rápidos:

### Ver proyectos activos

```sql
SELECT * FROM proyectos
WHERE estado = 'en-progreso'
ORDER BY fecha_fin ASC;
```

### Tareas de un empleado

```sql
SELECT t.*, p.nombre AS proyecto
FROM tareas t
JOIN proyectos p ON t.proyecto_id = p.id
WHERE t.asignado_a = 5  -- ID del empleado
  AND t.estado != 'completada'
ORDER BY t.fecha_vencimiento;
```

### Dashboard de métricas

```sql
SELECT
    (SELECT COUNT(*) FROM proyectos WHERE estado = 'en-progreso') AS proyectos_activos,
    (SELECT COUNT(*) FROM tareas WHERE estado IN ('pendiente', 'en-progreso')) AS tareas_pendientes,
    (SELECT COUNT(*) FROM empleados WHERE estado = 'activo') AS empleados_activos;
```

## 🔐 Seguridad

### Configuración Recomendada

1. **Contraseñas**:
   - Usa bcrypt o Argon2 para hashear
   - Salt rounds: mínimo 10

2. **Conexión**:
   - Usa SSL/TLS en producción
   - Nunca expongas credenciales en el código

3. **Permisos**:
   - Crea usuarios de BD con permisos limitados
   - Usuario de app: solo SELECT, INSERT, UPDATE
   - Usuario admin: acceso completo

4. **SQL Injection**:
   - SIEMPRE usa prepared statements
   - Valida inputs del usuario

### Ejemplo de Usuario de BD Limitado

```sql
-- Crear usuario para la aplicación
CREATE USER app_kpi WITH PASSWORD 'strong_password';

-- Dar permisos específicos
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_kpi;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_kpi;

-- NO dar DELETE ni DROP
```

## 🧪 Datos de Prueba

El schema incluye datos iniciales (seeds):

- ✅ 4 roles (admin, gerente, líder, empleado)
- ✅ Permisos básicos configurados
- ✅ 6 departamentos
- ✅ 1 usuario administrador (email: admin@empresa.com, pass: admin123)

### Agregar más datos de prueba

```sql
-- Ver ejemplo en SQL_QUERIES_EJEMPLOS.md
-- O usar herramientas como:
-- - Faker.js para generar datos
-- - Mockaroo.com para datasets
```

## 📈 Optimización

### Índices Críticos

Los índices ya están creados en el schema. Los más importantes:

- `idx_usuarios_email` → Búsqueda por email (login)
- `idx_tareas_asignado` → Tareas por empleado
- `idx_tareas_estado` → Filtrar por estado
- `idx_proyectos_estado` → Proyectos activos

### Monitoreo de Performance

```sql
-- Ver consultas lentas (PostgreSQL)
SELECT
    query,
    mean_exec_time,
    calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Ver índices no utilizados
SELECT
    schemaname,
    tablename,
    indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0;
```

## 🔄 Migraciones

### Con Prisma

```bash
# Crear migración
npx prisma migrate dev --name add_new_feature

# Aplicar en producción
npx prisma migrate deploy
```

### Con Flyway

```bash
# Crear archivo V1__initial_schema.sql
# Ejecutar migración
flyway migrate
```

### Manual

```sql
-- Agregar columna (ejemplo)
ALTER TABLE empleados
ADD COLUMN nivel_experiencia VARCHAR(20);

-- Agregar índice
CREATE INDEX idx_empleados_nivel
ON empleados(nivel_experiencia);
```

## 🔧 Mantenimiento

### Backup

```bash
# Backup completo
pg_dump -U postgres sistema_kpi > backup_$(date +%Y%m%d).sql

# Restaurar
psql -U postgres sistema_kpi < backup_20260418.sql
```

### Vacuum y Analyze

```sql
-- Liberar espacio y actualizar estadísticas
VACUUM ANALYZE;

-- Solo para tabla específica
VACUUM ANALYZE tareas;
```

## 📚 Recursos Adicionales

### Documentación

- PostgreSQL: https://www.postgresql.org/docs/
- Supabase: https://supabase.com/docs
- Prisma: https://www.prisma.io/docs

### Herramientas Útiles

- **pgAdmin**: GUI para PostgreSQL
- **DBeaver**: Cliente universal de BD
- **Postico**: Cliente PostgreSQL para Mac
- **TablePlus**: Cliente multi-BD moderno

## 🐛 Troubleshooting

### Error: "relation does not exist"

```bash
# Verificar que el schema se ejecutó correctamente
psql -d sistema_kpi -c "\dt"
```

### Error: "permission denied"

```sql
-- Verificar permisos del usuario
SELECT * FROM information_schema.table_privileges
WHERE grantee = 'tu_usuario';
```

### Rendimiento lento

```sql
-- Ver queries activas
SELECT * FROM pg_stat_activity
WHERE state = 'active';

-- Matar query problemática
SELECT pg_terminate_backend(pid);
```

## 📞 Soporte

Para preguntas sobre:

- **Diseño de BD**: Ver `DATABASE_SCHEMA.md`
- **Consultas SQL**: Ver `SQL_QUERIES_EJEMPLOS.md`
- **Estructura visual**: Ver `DIAGRAMA_VISUAL.txt`
- **Issues**: Crear issue en GitHub

---

**Última actualización**: Abril 2026
**Versión del Schema**: 1.0.0
**Base de datos**: PostgreSQL 14+
