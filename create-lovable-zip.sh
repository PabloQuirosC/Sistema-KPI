#!/bin/bash

# Script para crear ZIP para Lovable
# Uso: bash create-lovable-zip.sh

echo "🚀 Creando ZIP para Lovable..."
echo ""

# Nombre del archivo ZIP
ZIP_NAME="sistema-kpi-lovable.zip"

# Crear el ZIP excluyendo archivos innecesarios
zip -r "$ZIP_NAME" . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "dist/*" \
  -x "build/*" \
  -x "*.log" \
  -x ".DS_Store" \
  -x "*.zip" \
  -x ".vscode/*" \
  -x ".idea/*" \
  -x "coverage/*" \
  -x ".env.local" \
  -x ".env.*.local"

if [ $? -eq 0 ]; then
  echo "✅ ZIP creado exitosamente: $ZIP_NAME"
  echo ""
  echo "📦 Tamaño del archivo:"
  du -h "$ZIP_NAME"
  echo ""
  echo "🎯 Siguiente paso:"
  echo "1. Ve a https://lovable.dev"
  echo "2. Click en 'New Project'"
  echo "3. Selecciona 'Upload ZIP'"
  echo "4. Arrastra el archivo: $ZIP_NAME"
  echo ""
  echo "🚀 ¡Listo para subir a Lovable!"
else
  echo "❌ Error al crear el ZIP"
  exit 1
fi
