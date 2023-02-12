import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { AreaTerritory, Utils } from "../../../utils/utils";
import { map } from "./../region/region_form";

const database = new Utils.Database();
const root = new Utils.Root();

events.chestOpen.on(ev => {
    const player = ev.player;
    const ni = player.getNetworkIdentifier();
    const block_position = ev.blockPos;
    const x = Math.ceil(block_position.x / 8);
    const z = Math.ceil(block_position.z / 8);
    const area_territory = new AreaTerritory(ni);
    const area_json = `${x}_${z}.json`;
    if (database.exist_file(root.DATABASE_AREA, area_json)) {
        const data = database.load(root.DATABASE_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return CANCEL; //남땅이면 CANCEL
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});

events.blockDestroy.on(ev => {
    const player = ev.player;
    const ni = player.getNetworkIdentifier();
    const block_position = ev.blockPos;
    const x = Math.ceil(block_position.x / 8);
    const z = Math.ceil(block_position.z / 8);
    const area_territory = new AreaTerritory(ni);
    const area_json = `${x}_${z}.json`;
    if (database.exist_file(root.DATABASE_AREA, area_json)) {
        const data = database.load(root.DATABASE_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return CANCEL;
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});

events.blockPlace.on(ev => {
    const player = ev.player;
    const ni = player.getNetworkIdentifier();
    const block_position = ev.blockPos;
    const x = Math.ceil(block_position.x / 8);
    const z = Math.ceil(block_position.z / 8);
    const area_territory = new AreaTerritory(ni);
    const area_json = `${x}_${z}.json`;
    if (database.exist_file(root.DATABASE_AREA, area_json)) {
        const data = database.load(root.DATABASE_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return CANCEL;
        }
    } else {
        if (map[player.getNameTag()] == true) return CANCEL; //내땅아니면 CANCEL(조건)
    }
});
