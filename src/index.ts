import serverless from "serverless-http";
import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from './database/models';
import UserRoutes from './routes/UserRoutes';
import DashboardRoutes from './routes/DashboardRoutes'

(async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
})();

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/user', UserRoutes)
app.use('/dashboard', DashboardRoutes)

app.listen(3001, () => console.log(`Online na porta ${3001}!`));


module.exports.handler = serverless(app);
