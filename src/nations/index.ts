import { green, yellow } from "colors";
import { Chunk, console_message, database, PlayerNameXuid, root } from "./../../utils/utils";
import * as fs from "fs";
import {
    NationsPlayer as NationsPlayer,
    NationsArea as NationsArea,
    NationsCountry as NationsCountry,
    NationsRegion as NationsRegion,
    NationsVillage as NationsVillage,
} from "./nations_base";

database.create_folder_if_not_exist(root.DATABASE_NATIONS);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_AREA);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_REGION);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_VILLAGE);
database.create_folder_if_not_exist(root.DATABASE_NATIONS_COUNTRY);
database.create_folder_if_not_exist(root.DATABASE_PLAYER);
database.create_folder_if_not_exist(root.DATABASE_STORY);
// database.create_folder_if_not_exist(root.DATABASE_STORY_DESTROY);
// database.create_folder_if_not_exist(root.DATABASE_STORY_PLACE);

export const nations_areas = new Map<string, NationsArea>();
export const nations_regions = new Map<string, NationsRegion>();
export const nations_villages = new Map<string, NationsVillage>();
export const nations_countrys = new Map<string, NationsCountry>();
export const nations_players = new Map<string, NationsPlayer>();
export const story_tiles = new Map<string, number>();
// export const story_place_tiles = new Map<string, number>();

//Area
const area_files = fs.readdirSync(root.DATABASE_NATIONS_AREA);
area_files.forEach(file => {
    const data_area_nations_json: NationsArea = database.load(root.DATABASE_NATIONS_AREA, file);
    const data_chunk = new Chunk(
        data_area_nations_json.chunk.x,
        data_area_nations_json.chunk.y,
        data_area_nations_json.chunk.z,
        data_area_nations_json.chunk.dimention_id,
    );
    // const data_region_owner = new PlayerNameXuid(data_area_nations_json.region_owner?.name,data_area_nations_json.region_owner?.xuid);
    const data_area_nations = new NationsArea(
        data_chunk,
        data_area_nations_json.region_name,
        data_area_nations_json.village_name,
        data_area_nations_json.country_name,
    );
    nations_areas.set(`${data_area_nations.chunk.get_dxz_chunk_line()}`, data_area_nations);
});

//Region
const region_files = fs.readdirSync(root.DATABASE_NATIONS_REGION);
region_files.forEach(file => {
    const data_region_nations_json: NationsRegion = database.load(root.DATABASE_NATIONS_REGION, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_region_nations_json.owner.name, data_region_nations_json.owner.xuid);
    const data_chunk = new Chunk(
        data_region_nations_json.chunk.x,
        data_region_nations_json.chunk.y,
        data_region_nations_json.chunk.z,
        data_region_nations_json.chunk.dimention_id,
    );
    const data_area_nationss = data_region_nations_json.area_nations;
    const data_region_nations = new NationsRegion(
        data_owner_name_xuid,
        data_chunk,
        data_area_nationss,
        data_region_nations_json.region_name,
        data_region_nations_json.belong_village,
        data_region_nations_json.belong_country,
        data_region_nations_json.deposit,
        data_region_nations_json.assimilate,
        data_region_nations_json.probability,
    );
    nations_regions.set(`${data_region_nations.region_name}`, data_region_nations);
});
//Village
const village_files = fs.readdirSync(root.DATABASE_NATIONS_VILLAGE);
village_files.forEach(file => {
    const data_village_nations_json: NationsVillage = database.load(root.DATABASE_NATIONS_VILLAGE, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_village_nations_json.owner.name, data_village_nations_json.owner.xuid);
    const data_members_name_xuid = data_village_nations_json.members.map(member => new PlayerNameXuid(member.name, member.xuid));
    const data_chunk = new Chunk(
        data_village_nations_json.chunk.x,
        data_village_nations_json.chunk.y,
        data_village_nations_json.chunk.z,
        data_village_nations_json.chunk.dimention_id,
    );
    const data_area_nationss = data_village_nations_json.region_nations;
    const data_village_nations = new NationsVillage(
        data_owner_name_xuid,
        data_members_name_xuid,
        data_chunk,
        data_area_nationss,
        data_village_nations_json.village_name,
        data_village_nations_json.belong_country,
        data_village_nations_json.deposit,
        data_village_nations_json.assimilate,
        data_village_nations_json.probability,
    );
    nations_villages.set(`${data_village_nations.village_name}`, data_village_nations);
});
//Country
const country_files = fs.readdirSync(root.DATABASE_NATIONS_COUNTRY);
country_files.forEach(file => {
    const data_country_nations_json: NationsCountry = database.load(root.DATABASE_NATIONS_COUNTRY, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_country_nations_json.owner.name, data_country_nations_json.owner.xuid);
    const data_members_name_xuid = data_country_nations_json.members.map(member => new PlayerNameXuid(member.name, member.xuid));
    const data_chunk = new Chunk(
        data_country_nations_json.chunk.x,
        data_country_nations_json.chunk.y,
        data_country_nations_json.chunk.z,
        data_country_nations_json.chunk.dimention_id,
    );
    const data_area_nationss = data_country_nations_json.village_nations;
    const data_country_nations = new NationsCountry(
        data_owner_name_xuid,
        data_members_name_xuid,
        data_chunk,
        data_area_nationss,
        data_country_nations_json.country_name,
        data_country_nations_json.deposit,
        data_country_nations_json.assimilate,
        data_country_nations_json.probability,
    );
    nations_countrys.set(`${data_country_nations.country_name}`, data_country_nations);
});

//Player
const player_files = fs.readdirSync(root.DATABASE_PLAYER);
player_files.forEach(file => {
    const data_player_nations_json: NationsPlayer = database.load(root.DATABASE_PLAYER, file);
    const data_owner_name_xuid = new PlayerNameXuid(data_player_nations_json.owner.name, data_player_nations_json.owner.xuid);
    const data_members_name_xuid = data_player_nations_json.friends.map(friend => new PlayerNameXuid(friend.name, friend.xuid));
    const data_player_nations = new NationsPlayer(
        data_player_nations_json.ban,
        data_owner_name_xuid,
        data_members_name_xuid,
        data_player_nations_json.belong_region,
        data_player_nations_json.belong_village,
        data_player_nations_json.belong_country,
        data_player_nations_json.deposit,
        data_player_nations_json.assimilate,
        data_player_nations_json.probability,
    );
    nations_players.set(`${data_player_nations.owner.xuid}`, data_player_nations);
});

const story_files = fs.readdirSync(root.DATABASE_STORY);
story_files.forEach(file => {
    const data_story_tile = database.load(root.DATABASE_STORY, file);
    story_tiles.set(file.replace(".json", ""), data_story_tile);
});

// const story_place_files = fs.readdirSync(root.DATABASE_STORY_PLACE);
// story_place_files.forEach(file => {
//     const data_story_tile = database.load(root.DATABASE_STORY_PLACE, file);
//     story_place_tiles.set(file.replace(".json", ""), data_story_tile);
// });

console_message.dos_log_server("nations_command pioneer Loading", yellow, 2);
import "./command/overload/pioneer_command";
console_message.dos_log_server("nations_command pioneer Loaded", green, 2);
console_message.dos_log_server("nations_command region Loading", yellow, 2);
import "./command/overload/region_command";
console_message.dos_log_server("nations_command region Loaded", green, 2);
// console_message.dos_log_server("nations_command village Loading", yellow, 2);
// import "./command/overload/village_command";
// console_message.dos_log_server("nations_command village Loaded", green, 2);
// console_message.dos_log_server("nations_command country Loading", yellow, 2);
// import "./command/overload/country_command";
// console_message.dos_log_server("nations_command country Loaded", green, 2);
console_message.dos_log_server("friend Loading", yellow, 2);
import "./command/overload/friend_command";
console_message.dos_log_server("friend Loaded", green, 2);
console_message.dos_log_server("events Loading", yellow, 2);
import "./events";
console_message.dos_log_server("events Loaded", green, 2);
console_message.dos_log_server("scoreboard Loading", yellow, 2);
import "./scoreboard";
console_message.dos_log_server("scoreboard Loaded", green, 2);
