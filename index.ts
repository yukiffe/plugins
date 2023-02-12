import { events } from "bdsx/event";
import { green, yellow } from "colors";
import { console_message, database, root } from "./utils/utils";

events.serverOpen.on(() => {
    console_message.dos_space();
    console_message.specific("title");
    console_message.specific("auther");
    console_message.dos_space();
    console_message.dos_log_server("Plugins Loading", yellow);
    require("./src/loader");
    console_message.dos_log_server("Plugins Loaded", green);
    console_message.dos_space();
});
