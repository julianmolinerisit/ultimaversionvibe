import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './util/mongo.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Configura CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: 'http://localhost:3001', // Reemplaza con la dirección y el puerto de tu frontend
    credentials: true, // Habilita el intercambio de cookies entre el frontend y el backend si es necesario
  })
);

app.use(cookieParser()); // Asegúrate de importar cookie-parser si no lo has hecho

// Importa tus rutas aquí (usando import)
import newsRoute from './routes/api/news.js';
import ordersRoute from './routes/api/orders.js';
import productsRoute from './routes/api/products.js';
import loginRoute from './routes/api/user.js'; // Rutas de autenticación de usuario
import productidRoute from './routes/api/productid.js'; // Importa la nueva ruta de getProductById
import getNewsByIdRoute from "./routes/api/newsid.js"; // Importa las rutas de noticias por ID
import getOrderById from './routes/api/orderid.js'; // Asegúrate de que la ruta sea correcta

// Usa tus rutas
app.use('/api/news', newsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/products', productsRoute);
app.use('/api/user', loginRoute); // Agrega la ruta de autenticación de usuario
app.use('/api/productid', productidRoute); // Agrega la nueva ruta de getProductById
app.use('/api/news/id', getNewsByIdRoute); // Agrega la nueva ruta de noticias por ID
app.use('/api/orderid', getOrderById); // Asegúrate de que la ruta sea correcta


// Middleware de manejo de errores personalizado
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);

  // Determina el código de estado y el mensaje de acuerdo con el tipo de error
  let statusCode = 500;
  let errorMessage = 'Error interno del servidor';

  if (err instanceof MyCustomError) {
    statusCode = 400; // Por ejemplo, si es un error de validación personalizado
    errorMessage = err.message;
  }

  res.status(statusCode).json({ message: errorMessage });
});

// Define la clase MyCustomError (error personalizado)
class MyCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyCustomError';
  }
}

// Escucha en el puerto especificado
app.listen(port, async () => {
  try {
    await dbConnect();
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});
