const express = require('express');
const app = express();

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  // Si no se proporciona la fecha, se usa la fecha actual
  if (!dateString) {
    date = new Date();
  } else {
    // Si dateString es un número (timestamp), se convierte a número
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Si dateString es una cadena de fecha ISO, se intenta parsearla directamente
      date = new Date(dateString);
    }
  }

  // Si la fecha no es válida, se devuelve un error
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Si la fecha es válida, se devuelve el objeto con las propiedades unix y utc
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});