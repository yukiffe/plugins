"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_form_1 = require("./region_form");
__1.territory_areas;
__1.territory_players;
command_1.command.register("땅", utils_1.word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity();
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor();
    const xuid = actor.getXuid();
    const territory_player = __1.territory_players.get(xuid);
    if (territory_player === null) {
        actor.sendMessage(utils_1.chat.mid("§c소유한 땅이 없습니다. §f/개척"));
    }
    else {
        region_form_1.Region.main_menu(ni);
    }
}, {});
//
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QywwQkFBd0Q7QUFDeEQsZ0RBQWtFO0FBQ2xFLCtDQUF1QztBQUV2QyxtQkFBZSxDQUFDO0FBQ2hCLHFCQUFpQixDQUFDO0FBRWxCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxZQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2pGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQztJQUNuQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7SUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTdCLE1BQU0sZ0JBQWdCLEdBQUcscUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELElBQUksZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1FBQzNCLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7S0FDdkQ7U0FBTTtRQUNILG9CQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCO0FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1AsRUFBRSJ9