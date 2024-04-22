# Sistema de Registro de Citas Médicas

Este proyecto es una aplicación web diseñada para facilitar el registro y seguimiento de citas médicas. Está construido utilizando React con TypeScript, lo que proporciona una sólida estructura de tipos para una mayor seguridad y mantenibilidad del código.

## Estructura del Repositorio

El repositorio contiene dos ramas principales con diferentes versiones de la aplicación:

- `main`: Utiliza `LocalStorage` para la persistencia de datos. Ideal para pruebas rápidas y entornos donde no se requiere una base de datos.
- `backend-included`: Incluye un backend desarrollado que utiliza una base de datos relacional MySQL. Esta rama permite la persistencia de datos más allá del almacenamiento local y funciona en integración con el frontend.

## Cómo Correr el Proyecto

### Requisitos Previos
Asegúrate de tener instalado `node.js` y `npm` en tu sistema para poder instalar dependencias y correr el proyecto.

### Instalación y Ejecución en la Rama `main`

1. Clona el repositorio:
### Para la versión con LocalStorage (rama `main`):
2. Cambia a la rama `main`:
3. Navega al directorio `frontend` e instala las dependencias:
4. Ejecuta la aplicación:
La aplicación se abrirá automáticamente en `localhost:3000` en tu navegador por defecto.

### Para la versión con backend incluido (rama `backend-included`):

2. Cambia a la rama `backend-included`:
3. Configura la base de datos MySQL según las instrucciones encontradas en `backend/database/`.

4. Instala las dependencias y ejecuta el backend:
5. En una nueva terminal, instala las dependencias y ejecuta el frontend:

El frontend se comunicará con el backend que se está ejecutando en tu máquina local.
