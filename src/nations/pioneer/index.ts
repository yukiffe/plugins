import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { console_message, database, root } from "../../../utils/utils";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY_AREA);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_PLAYERS);

console_message.dos_log_server("pioneer_command Loading", yellow, 3);
import "./pioneer_command";
console_message.dos_log_server("pioneer_command Loaded", green, 3);
