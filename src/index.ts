import { app } from "./app";
import cors from 'cors';

const port = process.env.PORT || 5000;
app.set("port", port);

const corsOptions = {
  origin: '*', // Allow all origins to access
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["my-custom-header"], // Allow these custom headers
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions)); // Pass corsOptions to cors()

// Create an HTTP server
const server = app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});