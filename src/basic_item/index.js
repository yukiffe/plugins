"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = require("bdsx/bds/inventory");
const command_1 = require("bdsx/command");
const itemStack = [];
itemStack.push(inventory_1.ItemStack.constructWith("minecraft:stone_axe", 1, 0));
itemStack.push(inventory_1.ItemStack.constructWith("minecraft:stone_hoe", 1, 0));
itemStack.push(inventory_1.ItemStack.constructWith("minecraft:stone_pickaxe", 1, 0));
itemStack.push(inventory_1.ItemStack.constructWith("minecraft:stone_shovel", 1, 0));
itemStack.push(inventory_1.ItemStack.constructWith("minecraft:stone_sword", 1, 0));
itemStack.push(inventory_1.ItemStack.constructWith("minecraft:dried_kelp", 64, 0));
command_1.command.register("기본템", "basic item").overload((params, origin, output) => {
    const entity = origin.getEntity();
    const ni = entity.getNetworkIdentifier();
    const actor = ni.getActor();
    if (!actor.hasTag("basic_item")) {
        actor.addTag("basic_item");
        for (const item of itemStack) {
            actor.addItem(item);
        }
        actor === null || actor === void 0 ? void 0 : actor.sendMessage("기본템이 지급되었습니다.");
    }
    else {
        actor === null || actor === void 0 ? void 0 : actor.sendMessage("기본템은 최초 1회만 지급됩니다.");
    }
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUErQztBQUMvQywwQ0FBdUM7QUFFdkMsTUFBTSxTQUFTLEdBQWdCLEVBQUUsQ0FBQztBQUNsQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RSxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkUsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV2RSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN0RSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFHLENBQUM7SUFDbkMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixFQUFHLENBQUM7SUFDMUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO0lBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0IsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUNELEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDdkM7U0FBTTtRQUNILEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUM1QztBQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyJ9