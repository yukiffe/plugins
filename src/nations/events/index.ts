import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { console_message, database, root } from "../../../utils/utils";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY_AREA);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_PLAYERS);

console_message.dos_log_server("events Loading", yellow, 3);
import "./events";
console_message.dos_log_server("events Loaded", green, 3);
