import { events } from "bdsx/event";
import { database, root } from "./../../../utils/utils";
import { StoryBase } from "./../story_base";
import { ItemStack } from "bdsx/bds/inventory";
import { ConnectionRequest } from "bdsx/bds/connreq";
import { BlockSource } from "bdsx/bds/block";
import { makefunc } from "bdsx/makefunc";
import { Player } from "bdsx/bds/player";
import { tile_weight } from "./../../../utils/tile_weight";

events.blockDestroy.on(() => {});

// events.playerJoin.on(ev => {
//     const player = ev.player;
//     const ni = player.getNetworkIdentifier();
//     const player_json = Territory.player_json(ni);
//     database.create_file_if_not_exist(root.DATABASE_STORY, player_json);
//     const story: StoryBase = new StoryBase(ni);
//     database.upload(root.DATABASE_STORY, player_json, story);
// });

// events.blockDestroy.on(ev => {
//     const itemStack = ev.itemStack;
//     const player = ev.player;
//     const ni = player.getNetworkIdentifier();
//     const player_json = Territory.player_json(ni);
//     const data = database.load(root.DATABASE_STORY, player_json);
//     const story: StoryBase = Object.assign(new StoryBase(ni), data);

//     const item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
//     console.log(item_name);
//     console.log(tile_weight.get(item_name)!);
//     let weight = tile_weight.get(item_name)!;
//     weight -= weight / 100; //0.01이하로는 안떨어지게 나중에 코드 수정
//     tile_weight.set(item_name, weight);
//     story._likelihood = fairy_tale_ratio_func(player, story._likelihood, weight);
//     database.upload(root.DATABASE_STORY, player_json, story);
// });

// events.blockPlace.on(ev => {
//     const player = ev.player;
//     const ni = player.getNetworkIdentifier();
//     const player_json = Territory.player_json(ni);
//     const data = database.load(root.DATABASE_STORY, player_json);
//     const story: StoryBase = Object.assign(new StoryBase(ni), data);

//     const item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
//     console.log(item_name);
//     console.log(tile_weight.get(item_name)!);
//     let weight = tile_weight.get(item_name)!;
//     weight -= weight / 100;
//     tile_weight.set(item_name, weight);
//     story._likelihood = fairy_tale_ratio_func(player, story._likelihood, weight);
//     database.upload(root.DATABASE_STORY, player_json, story);
// });

events.serverClose.on(() => {
    database.upload("../plugins/main/utils", "tiles.json", tile_weight);
    return;
});

function fairy_tale_ratio_func(player: Player, likelihood: number, weight: number): number {
    player.runCommand(`titleraw @s actionbar{"rawtext":[{"text":"개연성 [${Math.round(likelihood * 100) / 100}] + ${Math.round(weight * 100) / 100}"}]}`);
    return likelihood + weight;
}
