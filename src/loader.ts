import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { root, console_message, database } from "../utils/utils";
import { AreaTerritory } from "./nations/region_base";
import * as fs from "fs";

database.create_folder_if_not_exist(root.DATABASE);

console_message.dos_log_server("basic_item Loading", yellow, 1);
import "./basic_item";
console_message.dos_log_server("basic_item Loaded", green, 1);
console_message.dos_log_server("multi_server Loading", yellow, 1);
import "./multi_server";
console_message.dos_log_server("multi_server Loaded", green, 1);
console_message.dos_log_server("nations Loading", yellow, 1);
import "./nations";
console_message.dos_log_server("nations Loaded", green, 1);
// console_message.dos_log_server("story Loading", yellow, 1);
// import "./story";
// console_message.dos_log_server("story Loaded", green, 1);
