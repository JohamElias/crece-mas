import { Paciente } from "./Paciente";

export interface Cita {
    paciente: Paciente;
    fechaCita: string;
    horaCita: string;
    sintomas: string;
  }