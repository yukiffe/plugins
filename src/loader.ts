import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { root, console_message, database } from "../utils/utils";
import { AreaTerritory, RegionBase } from "./nations/region_base";
import * as fs from "fs";

database.create_folder_if_not_exist(root.DATABASE);

const territory_areas = new Map();
const territory_players = new Map();

const area_files = fs.readdirSync(root.DATABASE_TERRITORY_AREA);
area_files.forEach(file => {
    const data_class: AreaTerritory = database.load_object(root.DATABASE_TERRITORY, file, AreaTerritory);
    territory_areas.set(`${data_class.x_chunk}_${data_class.z_chunk}`, data_class);
});
const player_files = fs.readdirSync(root.DATABASE_TERRITORY_AREA);
player_files.forEach(file => {
    const data_class: RegionBase = database.load_object(root.DATABASE_TERRITORY, file, RegionBase);
    territory_players.set(`${data_class._owner_xuid}`, data_class);
});

console_message.dos_log_server("basic_item Loading", yellow, 1);
import "./basic_item";
console_message.dos_log_server("basic_item Loaded", green, 1);
console_message.dos_log_server("multi_server Loading", yellow, 1);
import "./multi_server";
console_message.dos_log_server("multi_server Loaded", green, 1);
console_message.dos_log_server("nations Loading", yellow, 1);
import "./nations";
console_message.dos_log_server("nations Loaded", green, 1);
console_message.dos_log_server("story Loading", yellow, 1);
import "./story";
console_message.dos_log_server("story Loaded", green, 1);
