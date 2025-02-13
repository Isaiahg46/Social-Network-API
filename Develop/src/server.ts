import express from 'express';
import db from './config/connection.js';
import routes from './routes/api/index.js';

await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use(routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});