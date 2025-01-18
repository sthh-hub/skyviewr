import express from 'express';
import bodyParser from 'body-parser';
// import weatherRoutes from './routes/weather';
// import interactionRoutes from './routes/interaction';
import dotenv from 'dotenv';

const app = express();
app.use(bodyParser.json());

// app.use('/api/weather', weatherRoutes);
// app.use('/api/interactions', interactionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});