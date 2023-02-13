import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { AreaTerritory } from "../region_base";
import { map } from "../region/region_form";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { territory_areas, territory_players } from "..";
import { database, Maker, root } from "../../../utils/utils";

territory_areas;
territory_players;

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

events.serverClose.on(() => {
    territory_areas.forEach((value: string, key: string) => {
        database.upload(root.DATABASE_TERRITORY_AREA, key, value);
    });
    territory_players.forEach((value: string, key: string) => {
        database.upload(root.DATABASE_TERRITORY_PLAYERS, key, value);
    });
});
