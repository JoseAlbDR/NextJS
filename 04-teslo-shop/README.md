# Descripción

## Arrancar en dev

1. Clonar el repositorio
2. Instalar dependencias `npm i`
3. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
4. Levantar la base de datos `docker compose up -d`
5. Lanzar las migraciones de prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Arrancar la aplicación `npm run dev`

## Arrancar en prod

1. Clonar el repositorio
2. Instalar dependencias `npm i`
3. Construir la aplicación `npm run build`
4. Arrancar la aplicación `npm start`
