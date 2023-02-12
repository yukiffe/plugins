import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { Utils } from "../../../utils/utils";

const root = new Utils.Root();
let database;
database = existsSync(root.DATABASE_AREA);
if (database == false) mkdirSync(root.DATABASE_AREA);

database = existsSync(root.DATABASE_PLAYERS);
if (database == false) mkdirSync(root.DATABASE_PLAYERS);
//
const message = new Utils.ConsoleMessage();

message.dos_log_server("pioneer_command Loading", yellow, 3);
import "./pioneer_command";
message.dos_log_server("pioneer_command Loaded", green, 3);
