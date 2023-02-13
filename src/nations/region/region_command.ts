import { command } from "bdsx/command";
import { territory_areas, territory_players } from "..";
import { chat, database, root, word } from "../../../utils/utils";
import { Region } from "./region_form";

territory_areas;
territory_players;

command.register("땅", word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity()!;
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor()!;
    actor.sendMessage(chat.begin("땅"));

    if (territory_players.has(ni.getActor()?.getXuid())) {
        Region.main_menu(ni);
    } else {
        actor.sendMessage(chat.mid("§c소유한 땅이 없습니다. §f/개척"));
    }
    return;
}, {});
//
