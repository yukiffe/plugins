"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const utils_1 = require("../../../utils/utils");
const pioneer_form_1 = require("./pioneer_form");
const words = new utils_1.Utils.Words();
const chat = new utils_1.Utils.Chat();
const database = new utils_1.Utils.Database();
const root = new utils_1.Utils.Root();
//
command_1.command.register("개척", words.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity();
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor();
    actor.sendMessage(chat.begin("개척"));
    if (database.exist_file(root.DATABASE_PLAYERS, `${ni.getAddressHigh}_${ni.getAddressLow}.json`)) {
        actor.sendMessage(chat.mid("§c이미 땅을 가지고있습니다. §f/땅"));
    }
    else {
        pioneer_form_1.Poineer.main_menu(ni);
    }
    return;
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMENBQXVDO0FBRXZDLGdEQUE2QztBQUM3QyxpREFBeUM7QUFFekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDOUIsRUFBRTtBQUNGLGlCQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ25GLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQztJQUNuQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7SUFDN0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFcEMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLGFBQWEsT0FBTyxDQUFDLEVBQUU7UUFDN0YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztLQUN4RDtTQUFNO1FBQ0gsc0JBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekI7SUFDRCxPQUFPO0FBQ1gsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIn0=