import { Form, FormButton, SimpleForm } from "bdsx/bds/form";
import { command } from "bdsx/command";
import { send } from "process";
import { chat, database, root, word } from "../../../utils/utils";
import { Region } from "./region_form";

command.register("땅", word.CUSTOM_COMMAND_NORMAL).overload((param, origin, output) => {
    const sender = origin.getEntity()!;
    const ni = sender.getNetworkIdentifier();
    const actor = ni.getActor()!;
    actor.sendMessage(chat.begin("땅"));

    if (database.exist_file(root.DATABASE_TERRITORY_PLAYERS, `${ni.getAddressHigh}_${ni.getAddressLow}.json`)) {
        Region.main_menu(ni);
    } else {
        actor.sendMessage(chat.mid("§c소유한 땅이 없습니다. §f/개척"));
    }
    return;
}, {});
//
