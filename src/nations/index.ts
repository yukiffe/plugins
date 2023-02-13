import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { console_message, database, root } from "./../../utils/utils";
import * as fs from "fs";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY);

export const territory_areas = new Map();
export const territory_players = new Map();

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

console_message.dos_log_server("pioneer Loading", yellow, 2);
import "./pioneer";
console_message.dos_log_server("pioneer Loaded", green, 2);
console_message.dos_log_server("Region Loading", yellow, 2);
import "./region";
console_message.dos_log_server("Region Loaded", green, 2);
console_message.dos_log_server("events Loading", yellow, 2);
import "./events/events";
import { AreaTerritory, RegionBase } from "./region_base";
console_message.dos_log_server("events Loaded", green, 2);
