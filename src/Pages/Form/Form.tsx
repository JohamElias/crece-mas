import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";


function FormularioCitasMedicas() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useLocalStorage("nombre", "");
  const [dni, setDni] = useLocalStorage("dni", "");
  const [sintomas, setSintomas] = useLocalStorage("sintomas", "");
  const [fecha, setFecha] = useLocalStorage("fecha", "");
  const [hora, setHora] = useLocalStorage("hora", "");
  const [genero, setGenero] = useLocalStorage("genero", "");


  const limpiarCampos=()=>{
    setNombre('');
      setDni('');
      setSintomas('');
      setFecha('');
      setHora('');
      setGenero('');
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === true) {
      const nuevaCita = {
        paciente: {
          nombre,
          dni,
          genero,
        },
        fechaCita: fecha,
        horaCita: hora,
        sintomas: sintomas,
      };
  
      // Obtener citas actuales de LocalStorage y agregar la nueva cita
      const citasActuales = JSON.parse(localStorage.getItem("citas") || "[]");
      citasActuales.push(nuevaCita);
      localStorage.setItem("citas", JSON.stringify(citasActuales));
  
      // Limpiar formulario o redirigir a otra página si es necesario
      limpiarCampos()
      navigate('/');
    }
  
    setValidated(true);
  };

  const handleChangeDni = (e: any) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 8) {
      setDni(value);
    }
  };



  return (
    <div className="container">
      <Card
        className="text-white"
        style={{ width: "60rem", backgroundColor: "#485361" }}
      >
        <Card.Body>
          <Link to="/">
            <Button
              variant="secondary"
              style={{ position: "absolute", top: "10px", left: "10px" }}
            >
              Volver
            </Button>
          </Link>

            <Button
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={limpiarCampos}
            >
              Limpiar
            </Button>

          <Card.Title className="card-header text-center">
            FORMULARIO DE CITAS MÉDICAS
          </Card.Title>

          <Card.Title className="card-title text-center md-4">
            HACER UNA CITA
          </Card.Title>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="nombrePaciente">
                <Form.Label style={{ textAlign: "left" }}>
                  Nombre del Paciente
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Seleccionar fecha</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Fecha"
                  style={{ color: "black", textDecoration: "black" }}
                  min={new Date().toISOString().split("T")[0]}
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="dniPaciente">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="DNI"
                  value={dni}
                  onChange={handleChangeDni}
                  pattern="\d{8}"
                  title="El DNI debe tener 8 números sin espacios ni letras"
                  maxLength={8}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="horaCita">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Hora de la cita"
                  style={{ color: "black", textDecoration: "black" }}
                  min="07:00"
                  max="21:00"
                  value={hora}
                  onChange={e=>setHora(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="sintomasPaciente">
                <Form.Label>Síntomas</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Síntomas"
                  value={sintomas}
                  onChange={(e) => setSintomas(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="horaCita">
                <Form.Label>Género</Form.Label>
                <Form.Select aria-label="Seleccione el género" 
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required>
                <option value="">Seleccione el género...</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <p>{}</p>

            <Button
              className="mt-4"
              type="submit"
              variant="warning"
              style={{ width: "10rem", color: "white" }}
            >
              Agendar Cita
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FormularioCitasMedicas;
