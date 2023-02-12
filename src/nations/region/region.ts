import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { existsSync, mkdirSync } from "fs";
import { Utils } from "../../../utils/utils";
import { RegionBase as AreaBase } from "../region_base";
import * as fs from "fs";
import { green, yellow } from "colors";

const root = new Utils.Root();
let database;
database = existsSync(root.DATABASE_REGION);
if (database == false) mkdirSync(root.DATABASE_REGION);

const message = new Utils.ConsoleMessage();

message.dos_log_server("region_command Loading", yellow, 3);
import "./region_command";
message.dos_log_server("region_command Loaded", green, 3);
