import { console_message, database, root } from "../../../utils/utils";
import { green, yellow } from "colors";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY_REGION);

console_message.dos_log_server("region_command Loading", yellow, 3);
import "./region_command";
console_message.dos_log_server("region_command Loaded", green, 3);
