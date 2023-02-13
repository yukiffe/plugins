import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { AreaTerritory, PlayerTerritory, XuidPlayer } from "./region_base";
import { map } from "./region/region_form";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { database, Maker, root } from "../../utils/utils";
import { territory_areas, territory_players } from ".";

territory_areas;
territory_players;

events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    if (database.exist_file(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
        const data_class: PlayerTerritory = database.load(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`);
        territory_players.set(`${xuid}`, data_class);
    } else {
        territory_players.set(`${xuid}`, new PlayerTerritory(new XuidPlayer(name, xuid), [new XuidPlayer(name, xuid)], null));
    }
});
events.playerLeft.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();
    database.upload(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`, territory_players.get(xuid));
    territory_players.delete(xuid);
});
events.serverClose.on(() => {
    territory_areas.forEach((value: any, key: any) => {
        database.upload(root.DATABASE_TERRITORY_AREA, `${key}.json`, value);
    });
    territory_players.forEach((value: any, key: any) => {
        database.upload(root.DATABASE_TERRITORY_PLAYERS, `${key}.json`, value);
    });
});

events.chestOpen.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
    const block_position = ev.blockPos;
    const [x, z] = Maker.xz_process_chunk(block_position);
    const area_json = Maker.xz_area_split(x, z);
    if (territory_areas.has(area_json)) {
        const data: AreaTerritory = territory_areas.get(area_json);
        if (player.getXuid() !== data.xuid) {
            return CANCEL; //남땅이면 CANCEL
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});

events.blockDestroy.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
    const block_position = ev.blockPos;
    const [x, z] = Maker.xz_process_chunk(block_position);
    const area_json = Maker.xz_area_split(x, z);
    if (territory_areas.has(area_json)) {
        const data: AreaTerritory = territory_areas.get(area_json);
        if (player.getXuid() !== data.xuid) {
            return CANCEL; //남땅이면 CANCEL
        }
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});

events.blockPlace.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
    const block_position = ev.blockPos;
    const [x, z] = Maker.xz_process_chunk(block_position);
    const area_json = Maker.xz_area_split(x, z);
    if (territory_areas.has(area_json)) {
        const data: AreaTerritory = territory_areas.get(area_json);
        if (player.getXuid() !== data.xuid) {
            return CANCEL; //남땅이면 CANCEL
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});
