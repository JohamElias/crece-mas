import { useState, useEffect } from 'react';
import { obtenerCitas } from "../helpers/cita"; 
import { buscarPacientePorID } from '../helpers/paciente';
import { Cita } from '../models/Cita';

const useCitas = (flag:boolean) => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const citasData = await obtenerCitas(); 
        const citasConPacientes = await Promise.all(citasData.map(async (cita:any) => {
            //console.log(cita);
            
            const paciente = await buscarPacientePorID(cita.PacienteId);
            return { ...cita, paciente };
          }));
        setCitas(citasConPacientes);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [flag]);

  return { citas, isLoading };
};

export default useCitas;
