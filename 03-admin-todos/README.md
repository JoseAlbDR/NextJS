# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env y reemplazar las variables de entorno
3. Ejecutar `npm install`
4. Ejecutar `npx prisma migrate dev && npx prisma generate`
5. Ejecutar `npm run dev`
6. Ejecutar el seed para [poblar la base de datos](http://localhost:3000/api/seed)

# Prisma commands

```

npx prisma init
npx prisma migrate dev
npx prisma generate

```

```

```
