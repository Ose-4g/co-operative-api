import { Dialect, Sequelize } from 'sequelize';

import config from '../config/config';
const { username, password, database, dialect, host } = config.development;
let sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect as Dialect,
  port: 5432,
});

export default sequelize;
