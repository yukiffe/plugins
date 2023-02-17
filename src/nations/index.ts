import { green, yellow } from "colors";
import { console_message, database, root } from "./../../utils/utils";
import * as fs from "fs";
import { TerritoryPlayer, TerritoryArea, TerritoryCountry, TerritoryRegion, TerritoryVillage, PlayerNameXuid, Chunk } from "./territory_base";

database.create_folder_if_not_exist(root.DATABASE_TERRITORY);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_AREA);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_REGION);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_VILLAGE);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_COUNTRY);
database.create_folder_if_not_exist(root.DATABASE_TERRITORY_PLAYER);

export const territory_areas = new Map<string, TerritoryArea>();
export const territory_regions = new Map<string, TerritoryRegion>();
export const territory_villages = new Map<string, TerritoryVillage>();
export const territory_countrys = new Map<string, TerritoryCountry>();
export const territory_players = new Map<string, TerritoryPlayer>();

const area_files = fs.readdirSync(root.DATABASE_TERRITORY_AREA);
area_files.forEach(file => {
    const data_area_territory_json = database.load(root.DATABASE_TERRITORY_AREA, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_area_territory_json.owner.name, data_area_territory_json.owner.xuid);
    const data_chunk = new Chunk(data_area_territory_json.chunk.x, data_area_territory_json.chunk.z, data_area_territory_json.chunk.dimention_id);
    const data_area_territory = new TerritoryArea(data_owner_name_xuid, data_chunk);
    territory_areas.set(`${data_area_territory.chunk.get_dxz_chunk_line()}`, data_area_territory);
});

const region_files = fs.readdirSync(root.DATABASE_TERRITORY_REGION);
region_files.forEach(file => {
    const data_region_territory: TerritoryRegion = database.load(root.DATABASE_TERRITORY_REGION, file);
    territory_regions.set(`${data_region_territory.name}`, data_region_territory);
});
const village_files = fs.readdirSync(root.DATABASE_TERRITORY_VILLAGE);
village_files.forEach(file => {
    const data_village_territory: TerritoryVillage = database.load(root.DATABASE_TERRITORY_VILLAGE, file);
    territory_villages.set(`${data_village_territory.name}`, data_village_territory);
});
const country_files = fs.readdirSync(root.DATABASE_TERRITORY_COUNTRY);
country_files.forEach(file => {
    const data_country_territory: TerritoryCountry = database.load(root.DATABASE_TERRITORY_COUNTRY, file);
    territory_countrys.set(`${data_country_territory.name}`, data_country_territory);
});

const player_files = fs.readdirSync(root.DATABASE_TERRITORY_PLAYER);
player_files.forEach(file => {
    const data_player_territory: TerritoryPlayer = database.load(root.DATABASE_TERRITORY_PLAYER, file);
    territory_players.set(`${data_player_territory.owner.xuid}`, data_player_territory);
});

console_message.dos_log_server("nations_command Loading", yellow, 2);
import "./command/overload/pioneer_command";
console_message.dos_log_server("nations_command Loaded", green, 2);
console_message.dos_log_server("events Loading", yellow, 2);
import "./events";
import { DimensionId } from "bdsx/bds/actor";
console_message.dos_log_server("events Loaded", green, 2);
