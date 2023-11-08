import databaseConfig from './database.config';
import serverConfig from './server.config';

export default () => ({
    ...databaseConfig,
    ...serverConfig,
})