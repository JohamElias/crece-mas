import axios from 'axios';

export const crearCita = async (pacienteId:number, fechaCita:Date, horaCita:TimerHandler, sintomas:string) => {
  try {
    const response = await axios.post('http://localhost:3000/citas', { pacienteId, fechaCita, horaCita, sintomas });
    return response.data.id;
  } catch (error) {
    console.error('Error al crear la cita:', error);
    throw new Error('Error al crear la cita');
  }
};

export const obtenerCitas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/citas');
    return response.data; // Retorna todas las citas
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    throw new Error('Error al obtener las citas');
  }
};

export const desactivarCita = async (citaId:number) => {
  try {
    const response = await axios.patch(`http://localhost:3000/citas/${citaId}`);
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al desactivar la cita:', error);
    throw new Error('No se pudo desactivar la cita');
  }
};