import setupApp from './app';

(async () => {
  try {
    const app = await setupApp();
    const port = app.port;
    
    app.set('port', port); // set express to use this port
    
    const server = app.listen(port, () =>
      console.info(`---------------------------- APP running on port ${port} ----------------------------`)
    );
        
    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

    exitSignals.map(sig =>
      process.on(sig, () =>
        server.close(err => {
          if (err) {
            console.error(err);
            process.exit(1);
          }

          app.database.connection.close(() => {
            console.info('Database connection closed!');
            process.exit(0);
          });
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
