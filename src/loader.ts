import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { root, console_message, database } from "../utils/utils";

database.create_folder_if_not_exist(root.DATABASE);

console_message.dos_log_server("nations Loading", yellow, 1);
import "./nations";
console_message.dos_log_server("nations Loaded", green, 1);
