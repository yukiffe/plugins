import { CommandPermissionLevel } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { Inventory, ItemStack, PlayerInventory } from "bdsx/bds/inventory";
import { database, root } from "./../../utils/utils";

command.register("기본템", "basic item", CommandPermissionLevel.Operator).overload((params, origin, output) => {
    const entity = origin.getEntity()!;
    const ni = entity.getNetworkIdentifier()!;
    const actor = ni.getActor()!;
    const itemStack: ItemStack[] = [];
    const inventory: PlayerInventory = actor.getInventory();
    for (let i = 0; i <= 35; i++) {
        if (inventory.getItem(i, 0) !== null) itemStack.push();
    }
    database.upload(root.DATABASE_BASICITEM, "basic_item.json", itemStack);
}, {});
