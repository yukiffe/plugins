import { green, magenta, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { Utils } from "../utils/utils";
import { events } from "bdsx/event";

const message = new Utils.ConsoleMessage();
const root = new Utils.Root();

message.dos_log_server("basic_item Loading", yellow, 1);
import "./basic_item";
message.dos_log_server("basic_item Loaded", green, 1);
message.dos_log_server("multi_server Loading", yellow, 1);
import "./multi_server";
message.dos_log_server("multi_server Loaded", green, 1);
message.dos_log_server("nations Loading", yellow, 1);
import "./nations";
message.dos_log_server("nations Loaded", green, 1);
message.dos_log_server("story Loading", yellow, 1);
import "./story";
message.dos_log_server("story Loaded", green, 1);
