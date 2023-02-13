import { command } from "bdsx/command";
import { CommandEnum } from "bdsx/commandenum";
import { events } from "bdsx/event";
import { territory_areas, territory_players } from ".";
import { chat, word } from "../../utils/utils";
import { Poineer } from "./pioneer/pioneer_form";
import { Region } from "./region/region_form";

territory_areas;
territory_players;

command.register("토지", word.CUSTOM_COMMAND_NORMAL).overload(
    (param, origin, output) => {
        const sender = origin.getEntity()!;
        const ni = sender.getNetworkIdentifier();
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        if (territory_players.get(xuid)?.region_territory === null || param.command === "개척") {
            Poineer.form(ni);
        } else {
            actor.sendActionbar(chat.mid("준비중"));
        }
        return;
    },
    {
        command: [command.enum("action:command", "개척"), true],
    },
);

command.register("땅", word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity()!;
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor()!;
    const xuid = actor.getXuid();

    const territory_player = territory_players.get(xuid);
    if (territory_player === null) {
        actor.sendMessage(chat.mid("§c소유한 땅이 없습니다. §f/개척"));
    } else {
        Region.main_menu(ni);
    }
}, {});
//
