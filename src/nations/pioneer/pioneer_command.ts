import { command } from "bdsx/command";
import { territory_areas, territory_players } from "..";
import { chat, database, Maker, root, word } from "../../../utils/utils";
import { Poineer } from "./pioneer_form";

territory_areas;
territory_players;

command.register("개척", word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity()!;
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor()!;
    actor.sendMessage(chat.begin("개척"));

    if (territory_players.has(ni.getActor()?.getXuid())) {
        actor.sendMessage(chat.mid("§c이미 땅을 가지고있습니다. §f/땅"));
    } else {
        Poineer.main_menu(ni);
    }
    return;
}, {});
