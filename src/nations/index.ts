import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { Utils } from "../../utils/utils";

const message = new Utils.ConsoleMessage();
const root = new Utils.Root();

const database = existsSync(root.DATABASE);
if (database == false) mkdirSync(root.DATABASE);

message.dos_log_server("pioneer Loading", yellow, 2);
import "./pioneer/pioneer";
message.dos_log_server("pioneer Loaded", green, 2);
message.dos_log_server("Region Loading", yellow, 2);
import "./region/region";
message.dos_log_server("Region Loaded", green, 2);
message.dos_log_server("events Loading", yellow, 2);
import "./events/events";
message.dos_log_server("events Loaded", green, 2);
