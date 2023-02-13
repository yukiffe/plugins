"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const event_1 = require("bdsx/event");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
const pioneer_form_1 = require("./pioneer_form");
__1.territory_areas;
__1.territory_players;
event_1.events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
        const data_class = utils_1.database.load_object(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`, region_base_1.PlayerTerritory);
        __1.territory_players.set(`${xuid}`, data_class);
        player.sendMessage("데이터베이스 로드");
    }
    else {
        __1.territory_players.set(`${xuid}`, new region_base_1.PlayerTerritory(new region_base_1.XuidPlayer(name, xuid), [new region_base_1.XuidPlayer(name, xuid)], null));
        player.sendMessage("데이터베이스 생성");
    }
});
event_1.events.serverClose.on(() => { });
command_1.command.register("토지", utils_1.word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity();
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor();
    const xuid = actor.getXuid();
    if (param.command) {
        if (param.command === "개척") {
            pioneer_form_1.Poineer.form(ni);
        }
    }
    else {
        actor.sendActionbar(utils_1.chat.mid("준비중"));
    }
    return;
}, {
    command: [command_1.command.enum("command", "개척"), true],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBRXZDLHNDQUFvQztBQUNwQywwQkFBd0Q7QUFDeEQsZ0RBQXlFO0FBQ3pFLGdEQUE2RDtBQUM3RCxpREFBeUM7QUFFekMsbUJBQWUsQ0FBQztBQUNoQixxQkFBaUIsQ0FBQztBQUVsQixjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsSUFBSSxnQkFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFJLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFO1FBQ3RFLE1BQU0sVUFBVSxHQUFvQixnQkFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFJLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxJQUFJLE9BQU8sRUFBRSw2QkFBZSxDQUFDLENBQUM7UUFDM0gscUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNuQztTQUFNO1FBQ0gscUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBSSw2QkFBZSxDQUFDLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0SCxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ25DO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUNoQyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsWUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsUUFBUSxDQUN2RCxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDdEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRyxDQUFDO0lBQ25DLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztJQUM3QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1FBQ2YsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtZQUN4QixzQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQjtLQUNKO1NBQU07UUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUN4QztJQUNELE9BQU87QUFDWCxDQUFDLEVBQ0Q7SUFDSSxPQUFPLEVBQUUsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDO0NBQ2pELENBQ0osQ0FBQyJ9