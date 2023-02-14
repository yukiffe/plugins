import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { console_message, database, root } from "./../../utils/utils";
import * as fs from "fs";
import { AreaTerritory, PlayerTerritory, XuidPlayer, XZChunk } from "./region_base"; // 좀있다 수정
import { events } from "bdsx/event";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_AREA);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_PLAYERS);

export const territory_areas = new Map<string, AreaTerritory>();
export const territory_players = new Map<string, PlayerTerritory>();

const area_files = fs.readdirSync(root.DATABASE_TERRITORY_AREA);
area_files.forEach(file => {
    const area_territory_class: AreaTerritory = database.load(root.DATABASE_TERRITORY_AREA, file);
    territory_areas.set(`${area_territory_class.xz_chunk.x}_${area_territory_class.xz_chunk.z}`, area_territory_class);
});

console_message.dos_log_server("nations_command Loading", yellow, 2);
import "./nations_command";
console_message.dos_log_server("nations_command Loaded", green, 2);
console_message.dos_log_server("Region Loading", yellow, 2);
import "./region";
console_message.dos_log_server("Region Loaded", green, 2);
console_message.dos_log_server("events Loading", yellow, 2);
import "./events";
console_message.dos_log_server("events Loaded", green, 2);
