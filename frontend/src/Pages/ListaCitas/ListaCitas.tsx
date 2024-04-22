// components/ListaCitas.tsx
import React, { useState } from "react";
import CitaCard from "../../Components/CitaCard";
import { Cita } from "../../models/Cita";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCitas from "../../hooks/useCitas";
import { desactivarCita } from "../../helpers/cita";

const ListaCitas: React.FC = () => {
  /*const [citas, setCitas] = useState<Cita[]>(
    JSON.parse(localStorage.getItem("citas") || "[]")
  );*/
  const [flag,setFlag] = useState(true)
  const{citas, isLoading} = useCitas(flag)

  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);
  const [modalShow, setModalShow] = useState(false);

  const handleCardClick = (cita: Cita) => {
    setCitaSeleccionada(cita);
    setModalShow(true);
  };

  const handleDelete = async () => {
    if (citaSeleccionada) {
      console.log(citaSeleccionada);
      await desactivarCita(citaSeleccionada.id)
      setFlag(!flag)
      handleClose();
    }
  };

  const handleClose = () => setModalShow(false);

  
  if(isLoading){
    return("Cargando...")
  }

  return (
    <>
      <div className="container">
        <h2 className="mb-5">Lista de Citas Médicas</h2>
        <Link to="nuevaCita">
          <Button
            type="submit"
            style={{ width: "10rem", color: "white", margin: "auto" }}
            className="mb-5"
          >
            Añadir Cita
          </Button>
        </Link>

        <div
          className="card-body"
          style={{ backgroundColor: "#485361", color: "white" }}
        >
          <Row>
            <Col>
              <p className="card-title">Nombre</p>
            </Col>

            <Col>
              <p className="card-subtitle">DNI</p>
            </Col>

            <Col>
              <p className="card-text">Género</p>
            </Col>

            <Col>
              <p className="card-text">Fecha</p>
            </Col>

            <Col>
              <p className="card-text">Hora</p>
            </Col>

            <Col>
              <p className="card-text">Síntomas</p>
            </Col>
          </Row>
        </div>
        <div className="d-flex flex-column align-items-center">
          {citas.map((cita, index) => (
            <CitaCard key={index} cita={cita} onClick={handleCardClick} />
          ))}
        </div>
        <Modal show={modalShow} onHide={handleClose}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#485361", color: "white" }}
          >
            <Modal.Title>Detalles de la Cita</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#485361", color: "white" }}>
            {citaSeleccionada && (
              <>
                <p>
                  <strong>Paciente:</strong> {citaSeleccionada.paciente.nombre}
                </p>
                <p>
                  <strong>DNI:</strong> {citaSeleccionada.paciente.dni}
                </p>
                <Form.Label>Síntomas</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={citaSeleccionada.sintomas}
                  aria-label={citaSeleccionada.sintomas}
                  readOnly
                />
                <Form.Label>Género</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={citaSeleccionada.paciente.genero}
                  aria-label={citaSeleccionada.paciente.genero}
                  readOnly
                />
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={citaSeleccionada.fechaCita}
                  aria-label={citaSeleccionada.fechaCita}
                  readOnly
                />
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={citaSeleccionada.horaCita}
                  aria-label={citaSeleccionada.horaCita}
                  readOnly
                />
              </>
            )}
            <div style={{ display: "flex", textAlign: "center" }}>
              <Button
                type="submit"
                className="mt-3"
                onClick={handleDelete}
                variant="warning"
                style={{ width: "10rem", color: "white", margin: "auto" }}
              >
                Borrar
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ListaCitas;
