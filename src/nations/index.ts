import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { console_message, database, root } from "./../../utils/utils";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY);

console_message.dos_log_server("pioneer Loading", yellow, 2);
import "./pioneer";
console_message.dos_log_server("pioneer Loaded", green, 2);
console_message.dos_log_server("Region Loading", yellow, 2);
import "./region";
console_message.dos_log_server("Region Loaded", green, 2);
console_message.dos_log_server("events Loading", yellow, 2);
import "./events";
console_message.dos_log_server("events Loaded", green, 2);
