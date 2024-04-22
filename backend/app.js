const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const sequelize = require("./database/bd");
const Cita = require("./model/Cita");
const Paciente = require("./model/Paciente");

const sync = false;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    if (sync) {
      await sequelize.sync();
      console.log("Modelos sincronizados correctamente con la base de datos.");
    }
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

app.get("/citas", async (req, res) => {
  try {
    const citas = await Cita.findAll({
      where: {
        activo: true, 
      },
    });
    res.json(citas);
  } catch (error) {
    console.error("Error al obtener las citas:", error);
    res.status(500).json({ error: "Error al obtener las citas" });
  }
});

app.post("/citas", async (req, res) => {
  const { pacienteId, fechaCita, horaCita, sintomas } = req.body;

  try {
    // Crear una nueva cita en la base de datos
    const cita = await Cita.create({
      PacienteId: pacienteId,
      fechaCita,
      horaCita,
      sintomas,
      activo:true
    });

    // Retornar el ID de la cita creada
    res.json({ id: cita.id });
  } catch (error) {
    console.error("Error al crear la cita:", error);
    res.status(500).json({ error: "Error al crear la cita" });
  }
});

app.patch('/citas/:id', async (req, res) => {
    const { id } = req.params;  // Obtiene el ID de la cita desde la URL

    try {
        // Busca la cita por ID y actualiza el campo 'activo' a false
        const result = await Cita.update({ activo: false }, {
            where: { id }
        });

        if (result[0] === 0) {  // Verifica si la actualización tuvo efecto
            res.status(404).json({ error: 'Cita no encontrada o ya está inactiva' });
        } else {
            res.json({ message: 'Cita desactivada exitosamente' });
        }
    } catch (error) {
        console.error('Error al desactivar la cita:', error);
        res.status(500).json({ error: 'Error interno al desactivar la cita' });
    }
});


app.get("/pacientes/:dni", async (req, res) => {
  const dni = req.params.dni;

  try {
    const paciente = await Paciente.findOne({ where: { dni } });

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    res.json(paciente);
  } catch (error) {
    console.error("Error al encontrar el paciente:", error);
    res.status(500).json({ error: "Error al encontrar el paciente" });
  }
});

app.get("/pacientes/id/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const paciente = await Paciente.findOne({ where: { id } });

    if (!paciente) {
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    res.json(paciente);
  } catch (error) {
    console.error("Error al encontrar el paciente:", error);
    res.status(500).json({ error: "Error al encontrar el paciente" });
  }
});

app.post("/pacientes", async (req, res) => {
  console.log(req.body);
  const { nombre, dni, genero } = req.body;

  try {
    // Crear un nuevo paciente en la base de datos
    const paciente_c = await Paciente.create({ nombre, dni, genero });

    // Retornar el ID del paciente creado
    res.json({ id: paciente_c.id });
  } catch (error) {
    console.error("Error al crear el paciente:", error);
    res.status(500).json({ error: "Error al crear el paciente" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
