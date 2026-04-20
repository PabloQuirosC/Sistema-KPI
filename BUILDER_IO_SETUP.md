# Configuración de Builder.io

## Instalación
✅ Builder.io ya está instalado en el proyecto

## Configuración

### 1. Obtener API Key
1. Ve a https://builder.io
2. Crea una cuenta o inicia sesión
3. Copia tu API Key desde el dashboard

### 2. Configurar la API Key
Actualiza el archivo `src/app/components/BuilderContent.tsx` con tu API Key:

```typescript
builder.init('TU_API_KEY_AQUI');
```

### 3. Registrar componentes personalizados
Puedes registrar tus componentes existentes para usarlos en Builder.io:

```typescript
import { Builder } from '@builder.io/react';
import { KPICard } from './components/KPICard';
import { EmployeeCard } from './components/EmployeeCard';

// Registrar componentes
Builder.registerComponent(KPICard, {
  name: 'KPICard',
  inputs: [
    { name: 'title', type: 'string' },
    { name: 'value', type: 'string' },
    { name: 'change', type: 'number' },
  ]
});

Builder.registerComponent(EmployeeCard, {
  name: 'EmployeeCard',
  inputs: [
    { name: 'nombre', type: 'string' },
    { name: 'cargo', type: 'string' },
    { name: 'tareasCompletadas', type: 'number' },
    { name: 'totalTareas', type: 'number' },
    { name: 'horasTrabajadas', type: 'number' },
    { name: 'rendimiento', type: 'number' },
  ]
});
```

### 4. Usar Builder.io en tu aplicación

#### Opción A: Página completa dinámica
```typescript
import { BuilderComponent } from '@builder.io/react';

function DynamicPage() {
  return <BuilderComponent model="page" />;
}
```

#### Opción B: Sección específica
```typescript
import { BuilderContent } from './components/BuilderContent';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <BuilderContent model="section" />
    </div>
  );
}
```

## Documentación oficial
- https://www.builder.io/c/docs/developers
- https://github.com/BuilderIO/builder
