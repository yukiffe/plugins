import { command } from "bdsx/command";
import { CommandEnum } from "bdsx/commandenum";
import { events } from "bdsx/event";
import { territory_areas, territory_players } from ".";
import { word } from "../../utils/utils";
import { Poineer } from "./pioneer/pioneer_form";
import { Region } from "./region/region_form";

territory_areas;
territory_players;

command.register("토지", word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity()!;
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor()!;
    const xuid = actor.getXuid();
    if (territory_players.get(xuid)?.region_territory === null) {
        Poineer.form(ni);
    } else {
        Region.main_menu(ni);
    }
    return;
}, {});
