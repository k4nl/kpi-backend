import serverless from "serverless-http";
import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "src/database/models/index";

// routes imports
import UserRoutes from 'src/routes/UserRoutes';
import DashboardRoutes from 'src/routes/DashboardRoutes'

(async () => {
  await sequelize.sync({ force: true });
})

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/user', UserRoutes)
app.use('/dashboard', DashboardRoutes)

app.listen(3001, () => console.log(`Online na porta ${3001}!`));


module.exports.handler = serverless(app);
