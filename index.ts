import { events } from "bdsx/event";
import { green, yellow } from "colors";
import { Utils } from "./utils/utils";

const message = new Utils.ConsoleMessage();

events.serverOpen.on(() => {
    message.dos_space();
    message.specific("title");
    message.specific("auther");
    message.dos_space();
    message.dos_log_server("Plugins Loading", yellow);
    require("./src/loader");
    message.dos_log_server("Plugins Loaded", green);
    message.dos_space();
});
//
