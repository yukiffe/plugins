import { green, yellow } from "colors";
import { console_message, database, root } from "./../../utils/utils";
import * as fs from "fs";
import { TerritoryPlayer, TerritoryArea, TerritoryCountry, TerritoryRegion, TerritoryVillage, PlayerNameXuid, Chunk } from "./territory_base";
import { StoryBase } from "../story_base";

database.create_folder_if_not_exist(root.DATABASE_NATIONS);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_AREA);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_REGION);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_VILLAGE);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_COUNTRY);
database.create_folder_if_not_exist(root.DATABASE_PLAYER);

export const territory_areas = new Map<string, TerritoryArea>();
export const territory_regions = new Map<string, TerritoryRegion>();
export const territory_villages = new Map<string, TerritoryVillage>();
export const territory_countrys = new Map<string, TerritoryCountry>();
export const territory_players = new Map<string, TerritoryPlayer>();

//Area
const area_files = fs.readdirSync(root.DATABASE_NATIONS_AREA);
area_files.forEach(file => {
    const data_area_territory_json: TerritoryArea = database.load(root.DATABASE_NATIONS_AREA, file);
    const data_chunk = new Chunk(
        data_area_territory_json.chunk.x,
        data_area_territory_json.chunk.y,
        data_area_territory_json.chunk.z,
        data_area_territory_json.chunk.dimention_id,
    );
    // const data_region_owner = new PlayerNameXuid(data_area_territory_json.region_owner?.name,data_area_territory_json.region_owner?.xuid);
    const data_area_territory = new TerritoryArea(
        data_chunk,
        data_area_territory_json.region_name,
        data_area_territory_json.village_name,
        data_area_territory_json.country_name,
    );
    territory_areas.set(`${data_area_territory.chunk.get_dxz_chunk_line()}`, data_area_territory);
});

//Region
const region_files = fs.readdirSync(root.DATABASE_NATIONS_REGION);
region_files.forEach(file => {
    const data_region_territory_json: TerritoryRegion = database.load(root.DATABASE_NATIONS_REGION, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_region_territory_json.owner.name, data_region_territory_json.owner.xuid);
    const data_chunk = new Chunk(
        data_region_territory_json.spawn_position.x,
        data_region_territory_json.spawn_position.y,
        data_region_territory_json.spawn_position.z,
        data_region_territory_json.spawn_position.dimention_id,
    );
    const data_area_territorys = data_region_territory_json.area_territorys;
    const data_region_territory = new TerritoryRegion(
        data_owner_name_xuid,
        data_chunk,
        data_area_territorys,
        data_region_territory_json.region_name,
        data_region_territory_json.money,
        data_region_territory_json.assimilate,
        data_region_territory_json.deposit,
    );
    territory_regions.set(`${data_region_territory.region_name}`, data_region_territory);
});
//Village
const village_files = fs.readdirSync(root.DATABASE_NATIONS_VILLAGE);
village_files.forEach(file => {
    const data_village_territory_json: TerritoryVillage = database.load(root.DATABASE_NATIONS_VILLAGE, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_village_territory_json.owner.name, data_village_territory_json.owner.xuid);
    const data_members_name_xuid = data_village_territory_json.members.map(member => new PlayerNameXuid(member.name, member.xuid));
    const data_chunk = new Chunk(
        data_village_territory_json.spawn_position.x,
        data_village_territory_json.spawn_position.y,
        data_village_territory_json.spawn_position.z,
        data_village_territory_json.spawn_position.dimention_id,
    );
    const data_area_territorys = data_village_territory_json.region_territorys;
    const data_village_territory = new TerritoryVillage(
        data_owner_name_xuid,
        data_members_name_xuid,
        data_chunk,
        data_area_territorys,
        data_village_territory_json.village_name,
        data_village_territory_json.money,
        data_village_territory_json.assimilate,
        data_village_territory_json.deposit,
    );
    territory_villages.set(`${data_village_territory.village_name}`, data_village_territory);
});
//Country
const country_files = fs.readdirSync(root.DATABASE_NATIONS_COUNTRY);
country_files.forEach(file => {
    const data_country_territory_json: TerritoryCountry = database.load(root.DATABASE_NATIONS_COUNTRY, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_country_territory_json.owner.name, data_country_territory_json.owner.xuid);
    const data_members_name_xuid = data_country_territory_json.members.map(member => new PlayerNameXuid(member.name, member.xuid));
    const data_chunk = new Chunk(
        data_country_territory_json.spawn_position.x,
        data_country_territory_json.spawn_position.y,
        data_country_territory_json.spawn_position.z,
        data_country_territory_json.spawn_position.dimention_id,
    );
    const data_area_territorys = data_country_territory_json.village_territorys;
    const data_country_territory = new TerritoryCountry(
        data_owner_name_xuid,
        data_members_name_xuid,
        data_chunk,
        data_area_territorys,
        data_country_territory_json.country_name,
        data_country_territory_json.money,
        data_country_territory_json.assimilate,
        data_country_territory_json.deposit,
    );
    territory_countrys.set(`${data_country_territory.country_name}`, data_country_territory);
});

//Player
const player_files = fs.readdirSync(root.DATABASE_PLAYER);
player_files.forEach(file => {
    const data_player_territory_json: TerritoryPlayer = database.load(root.DATABASE_PLAYER, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_player_territory_json.owner.name, data_player_territory_json.owner.xuid);
    const data_members_name_xuid = data_player_territory_json.friends.map(friend => new PlayerNameXuid(friend.name, friend.xuid));
    const data_player_territory = new TerritoryPlayer(
        data_player_territory_json.ban,
        data_owner_name_xuid,
        data_members_name_xuid,
        data_player_territory_json.money,
        data_player_territory_json.assimilate,
        data_player_territory_json.deposit,
        data_player_territory_json.belong_region,
        data_player_territory_json.belong_village,
        data_player_territory_json.belong_country,
    );
    territory_players.set(`${data_player_territory.owner.xuid}`, data_player_territory);
});

console_message.dos_log_server("nations_command 1 Loading", yellow, 2);
import "./command/overload/pioneer_command";
console_message.dos_log_server("nations_command 1 Loaded", green, 2);
console_message.dos_log_server("nations_command 2 Loading", yellow, 2);
import "./command/overload/region_command";
console_message.dos_log_server("nations_command 2 Loaded", green, 2);
console_message.dos_log_server("nations_command 3 Loading", yellow, 2);
import "./command/overload/village_command";
console_message.dos_log_server("nations_command 3 Loaded", green, 2);
console_message.dos_log_server("events Loading", yellow, 2);
import "./events";
console_message.dos_log_server("events Loaded", green, 2);
console_message.dos_log_server("scoreboard Loading", yellow, 2);
import "./scoreboard";
console_message.dos_log_server("scoreboard Loaded", green, 2);

database.create_folder_if_not_exist(root.DATABASE_STORY);

export const story = new Map<string, StoryBase>();
const story_files = fs.readdirSync(root.DATABASE_STORY);
story_files.forEach(file => {
    const story_class: StoryBase = database.load(root.DATABASE_STORY, file);
    story.set(`${story_class.player.xuid}`, story_class);
});

console_message.dos_log_server("events Loading", yellow, 2);
import "./events/events";
console_message.dos_log_server("events Loaded", green, 2);
