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
            story._likelihood = fairy_tale_ratio_func(player, story._likelihood, 2);
            break;
        case "tile.stone":
            story._likelihood = fairy_tale_ratio_func(player, story._likelihood, 3);
            break;
        default:
            story._likelihood = fairy_tale_ratio_func(player, story._likelihood, 0.1);
            break;
    }
    database.upload(root.DATABASE_STORY, player_json, story);
});

function fairy_tale_ratio_func(player: Player, likelihood: number, weight: number): number {
    player.runCommand(`titleraw @s actionbar{"rawtext":[{"text":"개연성 [${likelihood.toPrecision(2)}] + ${weight}"}]}`);
    return likelihood + weight;
}
