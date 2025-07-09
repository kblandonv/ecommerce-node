# Ecommerce API

Este repositorio contiene una API RESTful para una tienda en línea, desarrollada con Node.js, Express y Sequelize (PostgreSQL). Incluye autenticación JWT, gestión de usuarios, productos y órdenes de compra, tests automatizados, documentación Swagger y configuración Docker.

---

## Tabla de Contenidos

- [Ecommerce API](#ecommerce-api)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción](#descripción)
  - [Características](#características)
  - [Tecnologías](#tecnologías)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Configuración](#instalación-y-configuración)
    - [Clonar el repositorio](#clonar-el-repositorio)
    - [Instalar dependencias](#instalar-dependencias)
    - [Variables de entorno](#variables-de-entorno)
    - [Configuración de la base de datos](#configuración-de-la-base-de-datos)
  - [Ejecución Local](#ejecución-local)
  - [Seed de Datos](#seed-de-datos)
  - [Tests](#tests)
  - [Docker \& Docker Compose](#docker--docker-compose)
  - [Documentación con Swagger](#documentación-con-swagger)
  - [Despliegue](#despliegue)
  - [Arquitectura](#arquitectura)
  - [Licencia](#licencia)
  - [Contacto](#contacto)

---

## Descripción

Esta API permite:

* Registrar usuarios y autenticarse con JWT.
* Consultar el perfil del usuario autenticado.
* Listar y consultar productos.
* Crear y listar órdenes de compra, calculando el total automáticamente.

Además incluye:

* Tests unitarios e integración con Jest y Supertest.
* Generación de datos de ejemplo (seed).
* Containerización con Docker y Docker Compose.
* Documentación interactiva con Swagger UI.

---

## Características

* **Autenticación**: registro e inicio de sesión con JWT.
* **Usuarios**: endpoint protegido `/me` para obtener datos.
* **Productos**: CRUD (solo lectura pública).
* **Órdenes**: creación y listado de órdenes protegidas.
* **Tests**: cobertura mínima del 80%, simulación de errores.
* **Docker**: servicios de la API y PostgreSQL orquestados.
* **Swagger**: documentación y prueba en `/docs`.

---

## Tecnologías

* **Node.js** 18
* **Express**
* **Sequelize** (PostgreSQL)
* **JWT** (jsonwebtoken)
* **bcryptjs**
* **Jest** + **Supertest**
* **Swagger (OpenAPI)**
* **Docker** + **Docker Compose**

---

## Requisitos Previos

* [Node.js](https://nodejs.org/) v16 o superior
* [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/) (para ejecución local)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## Instalación y Configuración

### Clonar el repositorio

```bash
git clone https://github.com/<kblandonv>/ecommerce-node.git
cd ecommerce-node
```

### Instalar dependencias

```bash
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes variables (usa tus propios valores):

```dotenv
PORT=3000

# PostgreSQL
POSTGRES_USER=<tu_usuario_postgres>
POSTGRES_PASSWORD=<tu_contraseña_postgres>
POSTGRES_DB=<tu_base_de_datos>
POSTGRES_HOST=localhost

# URL de conexión Sequelize
db_url_construido_o_usar_directamente_DB_URL
DB_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}

# Secreto para JWT
JWT_SECRET=<tu_valor_aleatorio_para_JWT>
```

### Configuración de la base de datos

1. Asegúrate de tener PostgreSQL corriendo.
2. Crea el rol y la base de datos (o ajústalo a tu configuración):

   ```sql
   CREATE ROLE <tu_usuario_postgres> WITH LOGIN PASSWORD '<tu_contraseña_postgres>';
   CREATE DATABASE <tu_base_de_datos> OWNER <tu_usuario_postgres>;
   ```

---

## Ejecución Local

Levanta la API en modo desarrollo:

```bash
npm run dev
```

* La API estará en `http://localhost:3000`.
* Ruta de prueba: `GET /` → `🚀 API corriendo`.

---

## Seed de Datos

Para poblar productos de ejemplo:

```bash
npm run seed
```

Esto insertará productos predefinidos si aún no existen.

---

## Tests

Ejecuta la suite de pruebas y genera cobertura:

```bash
npm test
```

* Tests de Auth, Products y Orders.
* Cobertura mínima establecida en 80%.

---

## Docker & Docker Compose

Levanta todo con Docker:

```bash
docker-compose build
docker-compose up -d
```

* **app** expuesta en `localhost:3001` (o el puerto que definas).
* **db** expuesta en `localhost:5432`.

Para sembrar datos dentro del contenedor:

```bash
docker-compose exec app npm run seed
```

---

## Documentación con Swagger

Una vez la API esté en marcha, abre:

Local: http://localhost:3000/docs

Producción: https://ecommerce-node-production-ae91.up.railway.app/docs

Podrás ver y probar todos los endpoints de forma interactiva.

---

## Despliegue

Se recomienda desplegar en plataformas como Railway o Render:

1. Sube el código a GitHub.
2. Conecta el repositorio en Railway.
3. Define variables de entorno en el panel de tu servicio.
4. Railway se encargará de build y deploy automáticos.

---

## Arquitectura

Este proyecto está dividido en dos entornos principales:

1. **Desarrollo local**  
   - **Docker Compose** orquesta dos contenedores:
     - **app**: tu API Node.js (Express + Sequelize)  
     - **db**: PostgreSQL  
   - Comunicación interna: `app:3000` ↔ `db:5432`  
   - Exposición a tu host:
     - API → `localhost:3001`  
     - Base de datos → `localhost:5432`  

2. **Producción (Railway)**  
   - Railway crea dos servicios:
     1. **PostgreSQL**: instancia gestionada, expone `DATABASE_URL`  
     2. **Docker**: construye tu `Dockerfile` y lo despliega  
   - La variable `DATABASE_URL` se inyecta en el contenedor de la app, que se conecta a la base de datos  
   - URL pública de la API:  
     ```
     https://ecommerce-node-production-ae91.up.railway.app
     ```
   - Swagger UI disponible en  
     ```
     https://ecommerce-node-production-ae91.up.railway.app/docs
     ```


---

## Licencia

Este proyecto está bajo la licencia MIT. Véase [LICENSE](LICENSE) para más detalles.

---

## Contacto

Para dudas o sugerencias, contácteme a via email: [kblandonv@unal.edu.co](mailto:kblandonv@unal.edu.co)
