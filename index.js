const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  // Si no se proporciona un parámetro de fecha, usar la fecha actual
  if (!dateParam) {
    date = new Date();
  } else {
    // Verificar si dateParam es un timestamp (número) o una fecha (string)
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Verificar si la fecha es válida
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});