import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'; 
import database from './database';
import authMiddleware from './middlewares/auth.js';
import cors from 'cors';
// import acl from 'express-acl'

// acl.config({
  //   baseUrl: '/',
  //   path: 'config'
  // })
const app = express();

const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:8585',
  'https://dental-manager.herokuapp.com',
  'https://dentalmanager.com.br',
];
  
const port = process.env.PORT || 3033;
const configureExpress = () => {
  app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    }
  }));
  // app.use(acl.authorize.unless({ path: ['/users/authenticate'] }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(authMiddleware);
  app.use('/', routes);
  app.database = database;
  app.port = port;

  return app;
};

export default async () => {
  const app = configureExpress();
  await app.database.connect();

  return app;
};
