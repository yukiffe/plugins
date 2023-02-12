"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const utils_1 = require("../../../utils/utils");
const region_form_1 = require("./region_form");
command_1.command.register("땅", utils_1.word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity();
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor();
    actor.sendMessage(utils_1.chat.begin("땅"));
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, utils_1.Territory.player_json(ni))) {
        region_form_1.Region.main_menu(ni);
    }
    else {
        actor.sendMessage(utils_1.chat.mid("§c소유한 땅이 없습니다. §f/개척"));
    }
    return;
}, {});
//
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxnREFBNkU7QUFDN0UsK0NBQXVDO0FBRXZDLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxZQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2pGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQztJQUNuQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7SUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFbkMsSUFBSSxnQkFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFJLENBQUMsMEJBQTBCLEVBQUUsaUJBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNqRixvQkFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4QjtTQUFNO1FBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztLQUN2RDtJQUNELE9BQU87QUFDWCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxFQUFFIn0=