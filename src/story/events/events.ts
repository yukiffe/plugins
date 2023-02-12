import { events } from "bdsx/event";
import { database, root, Territory } from "./../../../utils/utils";
import { StoryBase } from "./../story_base";
import { ItemStack } from "bdsx/bds/inventory";
import { ConnectionRequest } from "bdsx/bds/connreq";
import { BlockSource } from "bdsx/bds/block";
import { makefunc } from "bdsx/makefunc";
import { Player } from "bdsx/bds/player";

events.blockDestroy.on(() => {});

events.playerJoin.on(ev => {
    const player = ev.player;
    const ni = player.getNetworkIdentifier();
    const player_json = Territory.player_json(ni);
    database.create_file_if_not_exist(root.DATABASE_STORY, player_json);
    const story: StoryBase = new StoryBase();
    database.upload(root.DATABASE_STORY, player_json, story);
});

events.blockDestroy.on(ev => {
    const itemStack = ev.itemStack;
    const player = ev.player;
    const ni = player.getNetworkIdentifier();
    const player_json = Territory.player_json(ni);
    const data = database.load(root.DATABASE_STORY, player_json);
    const story: StoryBase = Object.assign(new StoryBase(), data);

    const item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
    switch (item_name) {
        case "tile.dirt":
            story._fairy_tale_ratio = fairy_tale_ratio_func(player, story._fairy_tale_ratio, 2);
            break;
        case "tile.stone":
            story._fairy_tale_ratio = fairy_tale_ratio_func(player, story._fairy_tale_ratio, 3);
            break;
        default:
            story._fairy_tale_ratio = fairy_tale_ratio_func(player, story._fairy_tale_ratio, 1);
            break;
    }
    database.upload(root.DATABASE_STORY, player_json, story);
});

function fairy_tale_ratio_func(player: Player, fairy_tale_ratio: number, weight: number): number {
    player.runCommand(`titleraw @s actionbar{"rawtext":[{"text":"개연성 [${fairy_tale_ratio}] + ${weight}"}]}`);
    return fairy_tale_ratio + weight;
}
