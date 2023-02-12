import { ItemStack } from "bdsx/bds/inventory";
import { command } from "bdsx/command";
import { green, yellow } from "colors";
import { console_message, database, root } from "../../utils/utils";

database.create_folder_if_not_exist(root.DATABASE_BASICITEM);

console_message.dos_log_server("basicItem_command Loading", yellow, 2);
import "./basicItem_command";
console_message.dos_log_server("basicItem_command Loaded", green, 2);
console_message.dos_log_server("basicItem_events Loading", yellow, 2);
import "./basicItem_events";
console_message.dos_log_server("basicItem_events Loaded", green, 2);
