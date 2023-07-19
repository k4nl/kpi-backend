import serverless from "serverless-http";
import express from "express"
import cors from "cors";
import bodyParser from "body-parser";

// routes imports
import UserRoutes from './routes/UserRoutes';
import DashboardRoutes from './routes/DashboardRoutes'


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/user', UserRoutes)
app.use('/dashboard', DashboardRoutes)

app.listen(3001, () => console.log(`Online na porta ${3001}!`));


module.exports.handler = serverless(app);
