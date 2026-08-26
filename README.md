# PoC Drizzle ORM + MySQL

Prueba de concepto que demuestra el uso de Drizzle ORM con MySQL.

## Documentación

[Informe de la PoC](https://github.com/Luks-bot/PoC-2026/blob/main/docs/PoC.pdf)
[Presentación](https://github.com/Luks-bot/PoC-2026/blob/main/docs/PoC_Drizzle_ORM.pptx)

## ¿Qué hace?

El script `src/demo.ts`:

1. Crea dos cuentas (`accounts`): Ana con $1000 y Luis con $500.
2. Consulta las cuentas insertadas.
3. Ejecuta una transferencia de $200 de Ana a Luis dentro de una transacción (`db.transaction`), actualizando ambos saldos y registrando el movimiento en la tabla `transfers`.
4. Muestra los saldos finales.

## Estructura

- `src/schema.ts` — definición de las tablas `accounts` y `transfers`.
- `src/db.ts` — conexión a la base de datos.
- `src/demo.ts` — script de demostración.
- `drizzle.config.ts` — configuración de Drizzle Kit.

## Requisitos

- Node.js >= 20.6.0
- Un servidor MySQL corriendo

## Instalación y uso

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Configurar la base de datos: agregar el archivo `.env` y ajustar `DATABASE_URL=mysql://root:password@localhost:3306/drizzle_demo` con las credenciales de MySQL.

3. Crear la base de datos en MySQL (si no existe):

   ```sql
   CREATE DATABASE drizzle_demo;
   ```

4. Aplicar el esquema a la base de datos:

   ```bash
   npm run db:push
   ```

5. Ejecutar la demo:

   ```bash
   npm run demo
   ```

6. (Opcional) Explorar la base de datos visualmente:

   ```bash
   npm run db:studio
   ```

## Tecnologías

- Drizzle ORM
- MySQL
- TypeScript / tsx
