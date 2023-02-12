"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const utils_1 = require("../../../utils/utils");
const pioneer_form_1 = require("./pioneer_form");
command_1.command.register("개척", utils_1.word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity();
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor();
    actor.sendMessage(utils_1.chat.begin("개척"));
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, utils_1.Territory.player_json(ni))) {
        actor.sendMessage(utils_1.chat.mid("§c이미 땅을 가지고있습니다. §f/땅"));
    }
    else {
        pioneer_form_1.Poineer.main_menu(ni);
    }
    return;
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLGdEQUE2RTtBQUM3RSxpREFBeUM7QUFFekMsaUJBQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbEYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRyxDQUFDO0lBQ25DLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztJQUM3QixLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVwQyxJQUFJLGdCQUFRLENBQUMsVUFBVSxDQUFDLFlBQUksQ0FBQywwQkFBMEIsRUFBRSxpQkFBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQ2pGLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7S0FDeEQ7U0FBTTtRQUNILHNCQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsT0FBTztBQUNYLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyJ9