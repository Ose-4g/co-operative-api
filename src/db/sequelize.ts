import { Dialect, Sequelize } from 'sequelize';

import config from '../config/config';
const { username, password, database, dialect, host } = config.development;
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect as Dialect,
});

export default sequelize;
