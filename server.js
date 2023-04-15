import app from './app.js'
import logger4 from './src/loggers/index.js';

const SERVER_PORT = process.env.SERVER_PORT || 2345;

app.listen(SERVER_PORT, () => 
    logger4.info(`🚀 Server up and running on port ${SERVER_PORT}`
));
