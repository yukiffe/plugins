import { ItemStack } from "bdsx/bds/inventory";
import { command } from "bdsx/command";

const itemStack: ItemStack[] = [];
itemStack.push(ItemStack.constructWith("minecraft:stone_axe", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_hoe", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_pickaxe", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_shovel", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:stone_sword", 1, 0));
itemStack.push(ItemStack.constructWith("minecraft:dried_kelp", 64, 0));

command.register("기본템", "basic item").overload((params, origin, output) => {
    const entity = origin.getEntity()!;
    const ni = entity.getNetworkIdentifier()!;
    const actor = ni.getActor()!;
    if (!actor.hasTag("basic_item")) {
        actor.addTag("basic_item");
        for (const item of itemStack) {
            actor.addItem(item);
        }
        actor?.sendMessage("기본템이 지급되었습니다.");
    } else {
        actor?.sendMessage("기본템은 최초 1회만 지급됩니다.");
    }
}, {});
