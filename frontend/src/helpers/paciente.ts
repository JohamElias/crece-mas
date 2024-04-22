import axios from 'axios';


interface PacienteData {
  nombre: string;
  dni: string;
  genero: string;
}

export const crearPaciente = async (datos: PacienteData): Promise<number> => {
  try {
    //console.log('Datos del paciente:', datos);
    
    const response = await axios.post<{ id: number }>('http://localhost:3000/pacientes', datos);
    return response.data.id;
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    throw new Error('Error al crear el paciente');
  }
};


export const buscarPacientePorDNI = async (dni:string) => {
    try {
      const response = await axios.get(`http://localhost:3000/pacientes/${dni}`);
      return response.data; 
    } catch (error) {
      console.error('Error al buscar el paciente:', error);
      throw new Error('Error al buscar el paciente');
    }
  };

  export const buscarPacientePorID = async (id:number) => {
    try {
      const response = await axios.get(`http://localhost:3000/pacientes/id/${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error al buscar el paciente:', error);
      throw new Error('Error al buscar el paciente');
    }
  };