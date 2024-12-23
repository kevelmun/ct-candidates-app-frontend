# Sistema de Reserva de Tickets - Frontend

Este proyecto corresponde a la **parte frontend** del sistema de reserva de tickets. Ahora, el frontend y el backend se gestionan de manera **separada** utilizando **Docker Compose**, lo que facilita su despliegue y mantenimiento independiente.

---

## **Inicio del Frontend**

Para ejecutar únicamente el frontend, sigue los pasos a continuación:

### **Requisitos Previos**
- **Docker**: Asegúrate de tener Docker instalado y en funcionamiento en tu sistema.
- **Estructura de Carpetas**: Verifica que tu proyecto tenga la siguiente estructura:
  ```
  your_path/
  │
  ├── frontend/
  │   ├── Dockerfile
  │   ├── .env
  │   └── ... (otros archivos y carpetas del frontend)
  └── docker-compose.yml
  ```

### **Configuración de Variables de Entorno**

El frontend utiliza las siguientes variables de entorno, definidas en el archivo `.env` dentro de la carpeta `frontend`:

```env
NEXT_APP_API_URL=http://localhost:3000
FRONT_PORT=3000
```

Asegúrate de que estas variables estén correctamente configuradas según tus necesidades.

### **Comando para Iniciar el Frontend**

Ejecuta el siguiente comando desde la raíz del proyecto para construir y levantar el contenedor del frontend:

```bash
docker compose --env-file ./frontend/.env up --build
```

Este comando realizará lo siguiente:
- **Construcción de la Imagen**: Compilará la imagen Docker utilizando el `Dockerfile` ubicado en `./frontend`.
- **Levantar el Contenedor**: Iniciará el contenedor del frontend, permitiendo que el frontend esté accesible en el puerto especificado.

### **Resolución de Problemas**

Si encuentras inconvenientes al iniciar el frontend, puedes reiniciar el contenedor asegurando una configuración limpia:

```bash
docker compose --env-file ./frontend/.env down -v
docker compose --env-file ./frontend/.env up --build
```

Estos comandos:
1. **Apagan y eliminan** el contenedor actual del frontend, junto con los volúmenes asociados.
2. **Reconstruyen y levantan** nuevamente el contenedor, garantizando una configuración fresca.

---

## **Resumen del Frontend**

El frontend del sistema de reserva de tickets incluye las siguientes funcionalidades:

- **Interfaz Amigable**:
  - Desarrollada con **Next.js** y **Tailwind CSS** para una experiencia de usuario moderna y responsiva.
  
- **Autenticación**:
  - Registro e inicio de sesión de usuarios.
  
- **Eventos**:
  - **Listado de Eventos**: Visualización de todos los eventos disponibles.
  - **Detalles de Eventos**: Información detallada de cada evento.
  - **Reserva de Eventos**: Permite a los usuarios reservar tickets para eventos seleccionados.
  - **Filtros Avanzados**: Búsqueda y filtrado de eventos por fecha, ubicación y disponibilidad.
  
- **Administración**:
  - Gestión completa de eventos para usuarios con permisos de administrador, incluyendo creación, edición y eliminación de eventos.

---

## **Pruebas Unitarias**

Se han implementado pruebas unitarias para asegurar la calidad y funcionalidad del frontend. Puedes ejecutar las pruebas utilizando el siguiente comando:

### **Ejecutar Pruebas Unitarias**

#### **Opción 1: Dentro del Contenedor Docker**

1. **Identifica el ID o nombre del contenedor del frontend**:
   ```bash
   docker ps
   ```
   Busca el contenedor con el nombre `frontend`.

2. **Ejecuta las pruebas dentro del contenedor**:
   ```bash
   docker exec -it frontend npm run test
   ```

#### **Opción 2: Localmente en tu Máquina**

Si tienes **Node.js** y **npm** instalados en tu máquina local, puedes ejecutar las pruebas directamente desde la carpeta `frontend`:

1. **Navega a la carpeta del frontend**:
   ```bash
   cd frontend
   ```

2. **Instala las dependencias** (si aún no lo has hecho):
   ```bash
   npm install
   ```

3. **Ejecuta las pruebas**:
   ```bash
   npm run test
   ```

### **Notas sobre las Pruebas Unitarias**
- **Configuración**: Asegúrate de que todas las dependencias estén correctamente instaladas antes de ejecutar las pruebas.
- **Resultados**: Las pruebas proporcionarán un informe detallado de los casos que han pasado o fallado, ayudándote a identificar y corregir posibles errores en el código.

---

## **Notas Adicionales**

- **Docker en Funcionamiento**: Asegúrate de que Docker esté corriendo correctamente antes de intentar levantar el contenedor del frontend.
  
- **Configuración Correcta de `.env`**: Verifica que todas las variables de entorno en `./frontend/.env` estén correctamente definidas para evitar errores en la conexión con el backend u otros servicios.
  
- **Dependencias Externas**: Aunque el frontend está separado, asegúrate de que el backend esté corriendo y accesible en la URL definida por `NEXT_APP_API_URL` para que las funcionalidades de reserva y autenticación funcionen correctamente.

- **Acceso al Frontend**: Una vez levantado el contenedor, el frontend estará accesible en `http://localhost:3000` (o el puerto que hayas configurado en `FRONT_PORT`).

---

## **Comandos Útiles**

- **Levantar el Frontend**:
  ```bash
  docker compose --env-file ./frontend/.env up --build
  ```

- **Detener el Frontend**:
  ```bash
  docker compose --env-file ./frontend/.env down
  ```

- **Ejecutar Pruebas Unitarias Dentro del Contenedor**:
  ```bash
  docker exec -it frontend npm run test
  ```

- **Ejecutar Pruebas Unitarias Localmente**:
  ```bash
  cd frontend
  npm install
  npm run test
  ```

---

¡Disfruta utilizando el sistema de reserva de tickets!