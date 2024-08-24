import {createLogger, transports, format, addColors} from "winston";
const {printf, combine, colorize, timestamp} = format; // de format desestructuramos 

// creo un objeto con los levels y colors
const customLevels = {
    levels : {
        error:0,
        warn: 1,
        info: 2,
        http: 3,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
    }
};

// agregamos los colores personalizados a Winston
addColors(customLevels.colors);

// formateo para nuestros logs -> lo que se imprime en consola
const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`
}) ;

// formateo la consola
// combinamos colores y el timestamp con el logFormat deseado
const consoleFormat = combine(
    colorize(),
    timestamp({format : "YYYY-MM-DD HH:mm:ss"}),
    logFormat
);

export const logger = createLogger({
    levels: customLevels.levels,
    format: combine(timestamp({format : "YYYY-MM-DD HH:mm:ss"}),logFormat),
    // creamos un transports
    transports : [
        new transports.Console({format: consoleFormat, level:"http"}), // permite al logger ejecutar en consola -> con level le indico el nivel mínimo a partir del cual puedo mostrar
        new transports.File({filename:"logs/app.log", level:"http"}), // permite guardar un archivo
        new transports.File({filename:"logs/error.log", level:"error"}),
        new transports.File({filename:"logs/info.log", level:"info"})
    ]
});

