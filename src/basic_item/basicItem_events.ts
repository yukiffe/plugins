import { ItemStack } from "bdsx/bds/inventory";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { database, root } from "../../utils/utils";

const itemStack: ItemStack[] = [];
itemStack.push(ItemStack.constructWith("minecraft:stone_axe", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_shovel", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_pickaxe", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_sword", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_heo", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:dried_kelp", 64, 0));

events.playerJoin.on(ev => {
    const player = ev.player;
    // const itemStack = database.load(root.DATABASE_BASICITEM, "basic_item.json");
    //추후 코드 추가 예정
    for (const item of itemStack) player.addItem(item);
});
