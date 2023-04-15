import log4js from 'log4js';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

log4js.configure({
    appenders: {
        terminal: {type: 'console'},
        infoFile: {type: 'file', filename: path.join(__dirname, '..', '..') + '/log/info.log'},
        warnFile: {type: 'file', filename: path.join(__dirname, '..', '..') + '/log/warn.log'},
        errorFile: {type: 'file', filename: path.join(__dirname, '..', '..') + '/log/error.log'},

        loggerInfo: {type: 'logLevelFilter', appender: 'infoFile', level: 'info', maxLevel:'info'},
        loggerWarn: {type: 'logLevelFilter', appender: 'warnFile', level: 'warn', maxLevel:'warn'},
        loggerError: {type: 'logLevelFilter', appender: 'errorFile', level: 'error', maxLevel: 'error'}
    },
    categories: {
        default: {appenders: ['infoFile', 'loggerWarn', 'loggerError'], level: 'info'}
    }
})

const logger4 = log4js.getLogger();

export default logger4;