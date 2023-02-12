import { green, yellow } from "colors";
import { console_message, database, root } from "../../utils/utils";

database.create_folder_if_not_exist(root.DATABASE_MULTISERVER);

console_message.dos_log_server("multiServer_command Loading", yellow, 2);
import "./multiServer_command";
console_message.dos_log_server("multiServer_command Loaded", green, 2);
