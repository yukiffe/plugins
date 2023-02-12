import { Form, FormButton, SimpleForm } from "bdsx/bds/form";
import { command } from "bdsx/command";
import { chat, database, root, word } from "../../../utils/utils";
import { Poineer } from "./pioneer_form";

command.register("개척", word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity()!;
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor()!;
    actor.sendMessage(chat.begin("개척"));

    if (database.exist_file(root.DATABASE_TERRITORY_PLAYERS, `${ni.getAddressHigh}_${ni.getAddressLow}.json`)) {
        actor.sendMessage(chat.mid("§c이미 땅을 가지고있습니다. §f/땅"));
    } else {
        Poineer.main_menu(ni);
    }
    return;
}, {});
