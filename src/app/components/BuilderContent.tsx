import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect } from 'react';

// Configura tu API Key de Builder.io
builder.init('TU_API_KEY_AQUI');

interface BuilderContentProps {
  model: string;
  content?: any;
}

export function BuilderContent({ model, content }: BuilderContentProps) {
  return (
    <div className="builder-content">
      <BuilderComponent model={model} content={content} />
    </div>
  );
}

// Ejemplo de uso con página dinámica
export function BuilderPage() {
  return (
    <div>
      <BuilderComponent model="page" />
    </div>
  );
}
