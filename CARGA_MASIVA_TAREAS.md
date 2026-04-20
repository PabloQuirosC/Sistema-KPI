# 📤 Carga Masiva de Tareas - Guía Completa

## ¿Qué es la Carga Masiva?

La funcionalidad de **Carga Masiva** te permite importar múltiples tareas a la vez mediante un archivo CSV, en lugar de crear cada tarea manualmente. Esto es especialmente útil cuando:

- Tienes muchas tareas para crear al inicio de un proyecto
- Estás migrando desde otro sistema
- Quieres planificar sprints completos de una vez
- Necesitas duplicar tareas de un proyecto anterior

## 📋 Cómo Usar

### Paso 1: Accede a Carga Masiva

1. Ve al módulo **Gestión de Tareas**
2. Haz clic en el botón **"Carga Masiva"** (junto a "Nueva Tarea")

### Paso 2: Descarga la Plantilla

1. En el modal que se abre, haz clic en **"Descargar Plantilla CSV"**
2. Se descargará un archivo llamado `plantilla_tareas.csv`

### Paso 3: Completa la Plantilla

Abre el archivo CSV con:
- **Excel** (recomendado)
- **Google Sheets**
- **LibreOffice Calc**
- Cualquier editor de hojas de cálculo

#### Campos de la Plantilla

| Columna | Descripción | Ejemplo | Requerido |
|---------|-------------|---------|-----------|
| **Título** | Nombre de la tarea | "Diseñar landing page" | ✅ Sí |
| **Descripción** | Detalle de la tarea | "Crear diseño responsive para homepage" | ✅ Sí |
| **Asignado A** | Nombre del empleado | "Pedro Martínez" | ✅ Sí |
| **Prioridad** | Nivel de urgencia | `alta`, `media` o `baja` | ✅ Sí |
| **Estado** | Estado inicial | `pendiente`, `en-progreso` o `completada` | ✅ Sí |
| **Fecha Inicio** | Fecha de inicio | `2026-04-20` (YYYY-MM-DD) | ✅ Sí |
| **Fecha Vencimiento** | Fecha límite | `2026-04-30` (YYYY-MM-DD) | ✅ Sí |
| **Horas Estimadas** | Tiempo estimado | `16` (número) | ⚠️ Opcional |

### Paso 4: Selecciona el Proyecto

En el modal de Carga Masiva:
1. Selecciona el proyecto al que quieres asociar las tareas
2. Todas las tareas importadas quedarán vinculadas a ese proyecto

### Paso 5: Sube el Archivo

1. Haz clic en **"Seleccionar archivo"** o arrastra el CSV
2. Verifica que el archivo sea `.csv`
3. Haz clic en **"Importar Tareas"**

### Paso 6: Verificación

El sistema:
- ✅ Validará el formato de cada fila
- ✅ Verificará que los empleados existan
- ✅ Confirmará que las fechas sean válidas
- ✅ Creará todas las tareas en el proyecto seleccionado

## ⚠️ Reglas Importantes

### Formato de Fechas
- **SIEMPRE** usa el formato: `YYYY-MM-DD`
- ✅ Correcto: `2026-04-20`
- ❌ Incorrecto: `20/04/2026`, `04-20-2026`, `20 de abril`

### Prioridades Válidas
Solo se aceptan estos valores (en minúsculas):
- `alta`
- `media`
- `baja`

### Estados Válidos
Solo se aceptan estos valores:
- `pendiente`
- `en-progreso`
- `completada`

### Nombres de Empleados
- Deben coincidir **exactamente** con los nombres en el sistema
- Respeta mayúsculas y acentos
- ✅ Correcto: `Pedro Martínez`
- ❌ Incorrecto: `pedro martinez`, `Pedro Martinez`

### Horas Estimadas
- Debe ser un número positivo
- Puede tener decimales: `8.5`, `16`, `24.5`
- Si se deja vacío, se asignará `0`

## 📄 Ejemplo de CSV Válido

```csv
Título,Descripción,Asignado A,Prioridad,Estado,Fecha Inicio,Fecha Vencimiento,Horas Estimadas
Diseñar mockups,Crear diseños responsive,María González,alta,pendiente,2026-04-25,2026-05-05,16
Implementar API,Desarrollar endpoints REST,Pedro Martínez,alta,en-progreso,2026-04-20,2026-05-01,24
Configurar BD,Setup de PostgreSQL,Pedro Martínez,alta,pendiente,2026-04-22,2026-04-28,12
Testing QA,Pruebas de integración,Carlos Rodríguez,media,pendiente,2026-05-05,2026-05-12,18
```

## 🚨 Errores Comunes

### Error: "Formato de fecha inválido"
**Causa:** La fecha no está en formato `YYYY-MM-DD`  
**Solución:** Cambia el formato a `2026-04-20`

### Error: "Empleado no encontrado"
**Causa:** El nombre del empleado no existe en el sistema  
**Solución:** Verifica que el nombre sea exactamente igual al registrado

### Error: "Prioridad inválida"
**Causa:** Usaste un valor diferente a `alta`, `media` o `baja`  
**Solución:** Usa solo los valores permitidos en minúsculas

### Error: "Estado no válido"
**Causa:** Usaste un estado diferente a los permitidos  
**Solución:** Usa solo `pendiente`, `en-progreso` o `completada`

### Error: "Horas estimadas debe ser un número"
**Causa:** Escribiste texto en lugar de número  
**Solución:** Usa solo números: `16`, `8.5`, `24`

## 💡 Tips y Mejores Prácticas

### 1. Usa el Ejemplo
- Descarga `plantilla_tareas_ejemplo.csv` del proyecto
- Úsalo como referencia para el formato correcto

### 2. Valida en Excel Primero
- Revisa que no haya celdas vacías en columnas obligatorias
- Verifica fechas antes de subir
- Usa auto-completar para nombres de empleados

### 3. Empieza con Pocas Tareas
- Prueba primero con 2-3 tareas
- Una vez que funcione, importa el resto

### 4. Guarda una Copia
- Mantén el CSV original como respaldo
- Te servirá para importar tareas similares después

### 5. Planifica por Sprints
- Crea un CSV por sprint
- Facilita la organización y seguimiento

## 🔄 Flujo Completo

```
1. Click "Carga Masiva"
       ↓
2. Seleccionar Proyecto
       ↓
3. Descargar Plantilla CSV
       ↓
4. Completar Plantilla en Excel
       ↓
5. Guardar como CSV
       ↓
6. Subir Archivo
       ↓
7. Click "Importar Tareas"
       ↓
8. ✅ Tareas creadas exitosamente
```

## 📊 Límites

- **Máximo de tareas por importación:** 100
- **Tamaño máximo de archivo:** 5 MB
- **Formato aceptado:** Solo `.csv`

## 🛠️ Solución de Problemas

### El archivo no se sube
1. Verifica que sea formato `.csv`
2. Comprueba que el tamaño sea menor a 5 MB
3. Intenta con un navegador diferente

### Las tareas no aparecen
1. Refresca la página
2. Verifica el filtro de estado (puede estar ocultándolas)
3. Busca por nombre de tarea

### Errores de validación masivos
1. Descarga la plantilla nuevamente
2. Copia solo los datos (sin cabeceras duplicadas)
3. Verifica que no haya saltos de línea dentro de celdas

## 📞 Soporte

Si tienes problemas:
1. Revisa esta guía completa
2. Verifica el archivo de ejemplo: `plantilla_tareas_ejemplo.csv`
3. Contacta al administrador del sistema

---

**Última actualización:** Abril 2026  
**Versión:** 1.0.0
