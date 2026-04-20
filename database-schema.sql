-- =============================================
-- SISTEMA KPI - ESQUEMA DE BASE DE DATOS
-- Base de datos: PostgreSQL 14+
-- Charset: UTF8
-- =============================================

-- Eliminar tablas existentes (en orden inverso por dependencias)
DROP TABLE IF EXISTS auditoria CASCADE;
DROP TABLE IF EXISTS responsables CASCADE;
DROP TABLE IF EXISTS tareas CASCADE;
DROP TABLE IF EXISTS objetivos CASCADE;
DROP TABLE IF EXISTS proyectos CASCADE;
DROP TABLE IF EXISTS empleados CASCADE;
DROP TABLE IF EXISTS permisos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS departamentos CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Eliminar tipos enum existentes
DROP TYPE IF EXISTS estado_usuario CASCADE;
DROP TYPE IF EXISTS tipo_rol CASCADE;
DROP TYPE IF EXISTS estado_empleado CASCADE;
DROP TYPE IF EXISTS estado_proyecto CASCADE;
DROP TYPE IF EXISTS estado_tarea CASCADE;
DROP TYPE IF EXISTS prioridad_tarea CASCADE;
DROP TYPE IF EXISTS estado_objetivo CASCADE;
DROP TYPE IF EXISTS tipo_responsabilidad CASCADE;
DROP TYPE IF EXISTS estado_responsable CASCADE;

-- =============================================
-- TIPOS ENUM
-- =============================================

CREATE TYPE estado_usuario AS ENUM ('activo', 'inactivo', 'suspendido');
CREATE TYPE tipo_rol AS ENUM ('administrador', 'gerente', 'lider-equipo', 'empleado');
CREATE TYPE estado_empleado AS ENUM ('activo', 'inactivo', 'vacaciones', 'licencia');
CREATE TYPE estado_proyecto AS ENUM ('planificacion', 'en-progreso', 'completado', 'pausado', 'cancelado');
CREATE TYPE estado_tarea AS ENUM ('pendiente', 'en-progreso', 'en-revision', 'completada', 'cancelada');
CREATE TYPE prioridad_tarea AS ENUM ('baja', 'media', 'alta', 'urgente');
CREATE TYPE estado_objetivo AS ENUM ('no-iniciado', 'en-progreso', 'completado', 'atrasado');
CREATE TYPE tipo_responsabilidad AS ENUM ('proyecto', 'departamento', 'equipo', 'proceso');
CREATE TYPE estado_responsable AS ENUM ('activo', 'inactivo');

-- =============================================
-- TABLA: ROLES
-- Define los roles de usuario en el sistema
-- =============================================

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    tipo tipo_rol NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: DEPARTAMENTOS
-- Estructura organizacional de la empresa
-- =============================================

CREATE TABLE departamentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    responsable_id INTEGER,
    descripcion TEXT,
    empleados_count INTEGER DEFAULT 0,
    presupuesto DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: USUARIOS
-- Usuarios del sistema con autenticación
-- =============================================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    departamento_id INTEGER REFERENCES departamentos(id) ON DELETE SET NULL,
    estado estado_usuario DEFAULT 'activo',
    avatar_url VARCHAR(500),
    telefono VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Agregar foreign key de departamento a responsable después de crear usuarios
ALTER TABLE departamentos
    ADD CONSTRAINT fk_departamento_responsable
    FOREIGN KEY (responsable_id)
    REFERENCES usuarios(id) ON DELETE SET NULL;

-- =============================================
-- TABLA: PERMISOS
-- Permisos granulares por rol
-- =============================================

CREATE TABLE permisos (
    id SERIAL PRIMARY KEY,
    rol_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    modulo VARCHAR(50) NOT NULL,
    accion VARCHAR(50) NOT NULL,
    permitido BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_permiso UNIQUE (rol_id, modulo, accion)
);

-- =============================================
-- TABLA: EMPLEADOS
-- Información detallada del personal
-- =============================================

CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(150) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    departamento_id INTEGER REFERENCES departamentos(id) ON DELETE SET NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    fecha_ingreso DATE NOT NULL,
    fecha_salida DATE,
    estado estado_empleado DEFAULT 'activo',
    salario DECIMAL(10, 2),
    tareas_completadas INTEGER DEFAULT 0,
    total_tareas INTEGER DEFAULT 0,
    horas_trabajadas DECIMAL(8, 2) DEFAULT 0,
    rendimiento DECIMAL(5, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fecha_salida_check CHECK (fecha_salida IS NULL OR fecha_salida > fecha_ingreso)
);

-- =============================================
-- TABLA: PROYECTOS
-- Proyectos de la organización
-- =============================================

CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    departamento_id INTEGER REFERENCES departamentos(id) ON DELETE SET NULL,
    creado_por INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    estado estado_proyecto DEFAULT 'planificacion',
    progreso INTEGER DEFAULT 0,
    total_tareas INTEGER DEFAULT 0,
    tareas_completadas INTEGER DEFAULT 0,
    presupuesto DECIMAL(12, 2),
    presupuesto_gastado DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT progreso_range CHECK (progreso >= 0 AND progreso <= 100),
    CONSTRAINT fecha_fin_check CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio),
    CONSTRAINT presupuesto_check CHECK (presupuesto_gastado <= presupuesto)
);

-- =============================================
-- TABLA: OBJETIVOS
-- Objetivos vinculados a proyectos
-- =============================================

CREATE TABLE objetivos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
    asignado_a INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado estado_objetivo DEFAULT 'no-iniciado',
    progreso INTEGER DEFAULT 0,
    tareas_totales INTEGER DEFAULT 0,
    tareas_completadas INTEGER DEFAULT 0,
    prioridad prioridad_tarea DEFAULT 'media',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT progreso_range CHECK (progreso >= 0 AND progreso <= 100),
    CONSTRAINT fecha_objetivo_check CHECK (fecha_fin >= fecha_inicio)
);

-- =============================================
-- TABLA: TAREAS
-- Tareas asignadas a empleados
-- =============================================

CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    proyecto_id INTEGER REFERENCES proyectos(id) ON DELETE CASCADE,
    objetivo_id INTEGER REFERENCES objetivos(id) ON DELETE SET NULL,
    asignado_a INTEGER REFERENCES empleados(id) ON DELETE SET NULL,
    creado_por INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    prioridad prioridad_tarea DEFAULT 'media',
    estado estado_tarea DEFAULT 'pendiente',
    fecha_inicio DATE,
    fecha_vencimiento DATE NOT NULL,
    fecha_completada TIMESTAMP,
    progreso INTEGER DEFAULT 0,
    horas_estimadas DECIMAL(6, 2),
    horas_trabajadas DECIMAL(6, 2) DEFAULT 0,
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT progreso_range CHECK (progreso >= 0 AND progreso <= 100),
    CONSTRAINT horas_check CHECK (horas_trabajadas >= 0)
);

-- =============================================
-- TABLA: RESPONSABLES
-- Asignación de responsabilidades
-- =============================================

CREATE TABLE responsables (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    departamento_id INTEGER REFERENCES departamentos(id) ON DELETE SET NULL,
    tipo_responsabilidad tipo_responsabilidad NOT NULL,
    nombre_asignacion VARCHAR(200) NOT NULL,
    area VARCHAR(100),
    fecha_asignacion DATE DEFAULT CURRENT_DATE,
    fecha_fin DATE,
    estado estado_responsable DEFAULT 'activo',
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fecha_responsable_check CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_asignacion)
);

-- =============================================
-- TABLA: AUDITORIA
-- Registro de cambios en el sistema
-- =============================================

CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL,
    accion VARCHAR(50) NOT NULL,
    modulo VARCHAR(50) NOT NULL,
    tabla VARCHAR(50),
    registro_id INTEGER,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =============================================

-- Usuarios
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_rol ON usuarios(rol_id);
CREATE INDEX idx_usuarios_departamento ON usuarios(departamento_id);
CREATE INDEX idx_usuarios_estado ON usuarios(estado);
CREATE INDEX idx_usuarios_ultimo_acceso ON usuarios(ultimo_acceso);

-- Empleados
CREATE INDEX idx_empleados_departamento ON empleados(departamento_id);
CREATE INDEX idx_empleados_estado ON empleados(estado);
CREATE INDEX idx_empleados_usuario ON empleados(usuario_id);
CREATE INDEX idx_empleados_email ON empleados(email);

-- Proyectos
CREATE INDEX idx_proyectos_departamento ON proyectos(departamento_id);
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_proyectos_fechas ON proyectos(fecha_inicio, fecha_fin);
CREATE INDEX idx_proyectos_creado_por ON proyectos(creado_por);

-- Tareas
CREATE INDEX idx_tareas_proyecto ON tareas(proyecto_id);
CREATE INDEX idx_tareas_objetivo ON tareas(objetivo_id);
CREATE INDEX idx_tareas_asignado ON tareas(asignado_a);
CREATE INDEX idx_tareas_estado ON tareas(estado);
CREATE INDEX idx_tareas_prioridad ON tareas(prioridad);
CREATE INDEX idx_tareas_vencimiento ON tareas(fecha_vencimiento);
CREATE INDEX idx_tareas_tags ON tareas USING GIN(tags);

-- Objetivos
CREATE INDEX idx_objetivos_proyecto ON objetivos(proyecto_id);
CREATE INDEX idx_objetivos_asignado ON objetivos(asignado_a);
CREATE INDEX idx_objetivos_estado ON objetivos(estado);
CREATE INDEX idx_objetivos_fechas ON objetivos(fecha_inicio, fecha_fin);

-- Responsables
CREATE INDEX idx_responsables_usuario ON responsables(usuario_id);
CREATE INDEX idx_responsables_departamento ON responsables(departamento_id);
CREATE INDEX idx_responsables_tipo ON responsables(tipo_responsabilidad);
CREATE INDEX idx_responsables_estado ON responsables(estado);

-- Auditoría
CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_fecha ON auditoria(created_at);
CREATE INDEX idx_auditoria_modulo ON auditoria(modulo);
CREATE INDEX idx_auditoria_tabla ON auditoria(tabla);

-- Índice para búsqueda en JSONB
CREATE INDEX idx_auditoria_datos ON auditoria USING GIN(datos_nuevos);

-- =============================================
-- FUNCIONES Y TRIGGERS
-- =============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger a todas las tablas con updated_at
CREATE TRIGGER actualizar_usuarios_timestamp
    BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_empleados_timestamp
    BEFORE UPDATE ON empleados
    FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_proyectos_timestamp
    BEFORE UPDATE ON proyectos
    FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_tareas_timestamp
    BEFORE UPDATE ON tareas
    FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_objetivos_timestamp
    BEFORE UPDATE ON objetivos
    FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TRIGGER actualizar_responsables_timestamp
    BEFORE UPDATE ON responsables
    FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

-- Función para registrar auditoría automáticamente
CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO auditoria (
        usuario_id,
        accion,
        modulo,
        tabla,
        registro_id,
        datos_anteriores,
        datos_nuevos
    ) VALUES (
        CURRENT_USER::INTEGER,
        TG_OP,
        TG_TABLE_SCHEMA,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger de auditoría para usuarios (ejemplo)
CREATE TRIGGER auditoria_usuarios
    AFTER INSERT OR UPDATE OR DELETE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();

-- =============================================
-- DATOS INICIALES (SEEDS)
-- =============================================

-- Roles básicos
INSERT INTO roles (nombre, descripcion, tipo) VALUES
    ('Administrador', 'Acceso completo al sistema', 'administrador'),
    ('Gerente', 'Gestión de departamento y reportes', 'gerente'),
    ('Líder de Equipo', 'Gestión de equipo y tareas', 'lider-equipo'),
    ('Empleado', 'Acceso básico a tareas asignadas', 'empleado');

-- Permisos para Administrador (ID: 1)
INSERT INTO permisos (rol_id, modulo, accion, permitido) VALUES
    (1, 'usuarios', 'crear', true),
    (1, 'usuarios', 'editar', true),
    (1, 'usuarios', 'eliminar', true),
    (1, 'usuarios', 'ver', true),
    (1, 'proyectos', 'crear', true),
    (1, 'proyectos', 'editar', true),
    (1, 'proyectos', 'eliminar', true),
    (1, 'proyectos', 'ver', true),
    (1, 'tareas', 'crear', true),
    (1, 'tareas', 'editar', true),
    (1, 'tareas', 'eliminar', true),
    (1, 'tareas', 'ver', true),
    (1, 'reportes', 'ver', true),
    (1, 'configuracion', 'editar', true);

-- Permisos para Empleado (ID: 4)
INSERT INTO permisos (rol_id, modulo, accion, permitido) VALUES
    (4, 'tareas', 'ver', true),
    (4, 'tareas', 'editar', true),
    (4, 'proyectos', 'ver', true);

-- Departamentos iniciales
INSERT INTO departamentos (nombre, descripcion) VALUES
    ('Desarrollo', 'Desarrollo de software y aplicaciones'),
    ('Diseño', 'Diseño UX/UI y gráfico'),
    ('Marketing', 'Marketing digital y contenidos'),
    ('Ventas', 'Ventas y atención al cliente'),
    ('Recursos Humanos', 'Gestión de personal'),
    ('TI', 'Tecnología e infraestructura');

-- Usuario administrador por defecto
-- Contraseña: admin123 (hash bcrypt)
INSERT INTO usuarios (nombre, email, password_hash, rol_id, departamento_id) VALUES
    ('Administrador', 'admin@empresa.com', '$2a$10$XQjZ5bYY5bYY5bYY5bYY5e', 1, 6);

-- =============================================
-- VISTAS ÚTILES
-- =============================================

-- Vista: Resumen de proyectos con métricas
CREATE OR REPLACE VIEW vista_proyectos_resumen AS
SELECT
    p.id,
    p.nombre,
    p.estado,
    p.progreso,
    d.nombre AS departamento,
    u.nombre AS creador,
    p.total_tareas,
    p.tareas_completadas,
    CASE
        WHEN p.total_tareas > 0
        THEN ROUND((p.tareas_completadas::DECIMAL / p.total_tareas) * 100, 2)
        ELSE 0
    END AS porcentaje_completado,
    p.fecha_inicio,
    p.fecha_fin,
    CASE
        WHEN p.fecha_fin < CURRENT_DATE AND p.estado != 'completado'
        THEN true
        ELSE false
    END AS atrasado
FROM proyectos p
LEFT JOIN departamentos d ON p.departamento_id = d.id
LEFT JOIN usuarios u ON p.creado_por = u.id;

-- Vista: Dashboard de empleados
CREATE OR REPLACE VIEW vista_empleados_dashboard AS
SELECT
    e.id,
    e.nombre,
    e.cargo,
    d.nombre AS departamento,
    e.estado,
    e.tareas_completadas,
    e.total_tareas,
    CASE
        WHEN e.total_tareas > 0
        THEN ROUND((e.tareas_completadas::DECIMAL / e.total_tareas) * 100, 2)
        ELSE 0
    END AS porcentaje_tareas,
    e.horas_trabajadas,
    e.rendimiento
FROM empleados e
LEFT JOIN departamentos d ON e.departamento_id = d.id;

-- Vista: Tareas pendientes por vencer
CREATE OR REPLACE VIEW vista_tareas_por_vencer AS
SELECT
    t.id,
    t.titulo,
    t.prioridad,
    t.estado,
    t.fecha_vencimiento,
    DATE_PART('day', t.fecha_vencimiento - CURRENT_DATE) AS dias_restantes,
    e.nombre AS asignado_a,
    p.nombre AS proyecto
FROM tareas t
LEFT JOIN empleados e ON t.asignado_a = e.id
LEFT JOIN proyectos p ON t.proyecto_id = p.id
WHERE t.estado IN ('pendiente', 'en-progreso')
  AND t.fecha_vencimiento >= CURRENT_DATE
ORDER BY t.fecha_vencimiento ASC;

-- =============================================
-- COMENTARIOS EN TABLAS
-- =============================================

COMMENT ON TABLE usuarios IS 'Usuarios del sistema con autenticación';
COMMENT ON TABLE roles IS 'Roles y niveles de acceso';
COMMENT ON TABLE permisos IS 'Permisos granulares por rol';
COMMENT ON TABLE departamentos IS 'Estructura organizacional';
COMMENT ON TABLE empleados IS 'Información detallada del personal';
COMMENT ON TABLE proyectos IS 'Proyectos de la organización';
COMMENT ON TABLE tareas IS 'Tareas asignadas a empleados';
COMMENT ON TABLE objetivos IS 'Objetivos vinculados a proyectos';
COMMENT ON TABLE responsables IS 'Asignaciones de responsabilidad';
COMMENT ON TABLE auditoria IS 'Registro de cambios en el sistema';

-- =============================================
-- FIN DEL ESQUEMA
-- =============================================
