import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { database, root, Territory } from "../../../utils/utils";
import { AreaTerritory } from "../region_base";
import { map } from "../region/region_form";
import { CommandPermissionLevel } from "bdsx/bds/command";

events.chestOpen.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
    const block_position = ev.blockPos;
    const [x, z] = Territory.make_xz_chunk(block_position);
    const area_json = Territory.area_json(x, z);
    if (database.exist_file(root.DATABASE_TERRITORY_AREA, area_json)) {
        const data = database.load(root.DATABASE_TERRITORY_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
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
    const [x, z] = Territory.make_xz_chunk(block_position);
    const area_json = Territory.area_json(x, z);
    if (database.exist_file(root.DATABASE_TERRITORY_AREA, area_json)) {
        const data = database.load(root.DATABASE_TERRITORY_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return CANCEL;
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});

events.blockPlace.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;
    const block_position = ev.blockPos;
    const [x, z] = Territory.make_xz_chunk(block_position);
    const area_json = Territory.area_json(x, z);
    if (database.exist_file(root.DATABASE_TERRITORY_AREA, area_json)) {
        const data = database.load(root.DATABASE_TERRITORY_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return CANCEL;
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});
