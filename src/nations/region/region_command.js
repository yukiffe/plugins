"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const utils_1 = require("../../../utils/utils");
const region_form_1 = require("./region_form");
const words = new utils_1.Utils.Words();
const chat = new utils_1.Utils.Chat();
const database = new utils_1.Utils.Database();
const root = new utils_1.Utils.Root();
command_1.command.register("땅", words.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity();
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor();
    actor.sendMessage(chat.begin("땅"));
    if (database.exist_file(root.DATABASE_PLAYERS, `${ni.getAddressHigh}_${ni.getAddressLow}.json`)) {
        region_form_1.Region.main_menu(ni);
    }
    else {
        actor.sendMessage(chat.mid("§c소유한 땅이 없습니다. §f/개척"));
    }
    return;
}, {});
//
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2NvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBDQUF1QztBQUV2QyxnREFBNkM7QUFDN0MsK0NBQXVDO0FBRXZDLE1BQU0sS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRTlCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2xGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQztJQUNuQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7SUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFbkMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLGFBQWEsT0FBTyxDQUFDLEVBQUU7UUFDN0Ysb0JBQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDeEI7U0FBTTtRQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7S0FDdkQ7SUFDRCxPQUFPO0FBQ1gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1AsRUFBRSJ9