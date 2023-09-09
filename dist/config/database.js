"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose_1.default.connect(dbConfig_1.default.DB.URI, dbOptions).then(r => { });
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('Connection established');
});
connection.on('error', err => {
    console.log(err);
    process.exit(0);
});
