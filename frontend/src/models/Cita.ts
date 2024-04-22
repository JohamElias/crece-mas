import { Paciente } from "./Paciente";

export interface Cita {
    id:number
    paciente: Paciente;
    fechaCita: string;
    horaCita: string;
    sintomas: string;
  }