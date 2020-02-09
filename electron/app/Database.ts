import config from './config';
import { Sequelize } from 'sequelize-typescript';
import { AppSetting } from './models/AppSetting';
import { Settings } from './models/Settings';
import { TrackItem } from './models/TrackItem';
import { logManager } from './log-manager';

let logger = logManager.getLogger('Database');

class Database {
    private _sequelize: Sequelize;

    constructor() {
        let dbConfig = config.databaseConfig;

        logger.info('Database dir is:' + dbConfig.outputPath);

        if (config.isTest === true) {
        } else {
            this._sequelize = new Sequelize({
                database: dbConfig.database,
                dialect: 'sqlite',
                username: dbConfig.username,
                password: dbConfig.password,
                storage: dbConfig.outputPath,

                logging: log => logger.info(log),
            });
            this._sequelize.addModels([AppSetting]);
            this._sequelize.addModels([Settings]);
            this._sequelize.addModels([TrackItem]);

            logger.debug(
                'Added Models AppSetting, Settings, TrackItem',
                AppSetting,
                Settings,
                TrackItem,
            );
        }
    }

    getSequelize() {
        return this._sequelize;
    }
}

const database = new Database();
export const sequelize = database.getSequelize();
