// components/CitaCard.tsx
import React from 'react';
import { Cita } from '../models/Cita';
import styles from './CitaCard.module.css'
import { Col, Row } from 'react-bootstrap';

interface CitaCardProps {
  cita: Cita;
  onClick: (cita: Cita) => void;
}

const CitaCard: React.FC<CitaCardProps> = ({ cita,onClick }) => {
  return (
    <div style={{ width: '1250rem' }} className={`card ${styles['card-alargado']} ${styles['card-container']}`}
    onClick={() => onClick(cita)}
    >
      <div className="card-body">
        <Row>
            <Col>
                <p className="card-title">{cita.paciente.nombre}</p>
            </Col>

            <Col>
                <p className="card-subtitle mb-2 text-muted">{cita.paciente.dni}</p>
            </Col>

            <Col>
                <p className="card-text">{cita.paciente.genero}</p>
            </Col>

            <Col>
                <p className="card-text">{cita.fechaCita}</p>
            </Col>

            <Col>
                <p className="card-text">{cita.horaCita}</p>
            </Col>

            <Col>
                <p className="card-text">{cita.sintomas}</p>
            </Col>
        </Row>
        
      </div>
    </div>
  );
};

export default CitaCard;
