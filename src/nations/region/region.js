"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("../../../utils/utils");
const colors_1 = require("colors");
const root = new utils_1.Utils.Root();
let database;
database = (0, fs_1.existsSync)(root.DATABASE_REGION);
if (database == false)
    (0, fs_1.mkdirSync)(root.DATABASE_REGION);
const message = new utils_1.Utils.ConsoleMessage();
message.dos_log_server("region_command Loading", colors_1.yellow, 3);
require("./region_command");
message.dos_log_server("region_command Loaded", colors_1.green, 3);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkJBQTJDO0FBQzNDLGdEQUE2QztBQUc3QyxtQ0FBdUM7QUFFdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDOUIsSUFBSSxRQUFRLENBQUM7QUFDYixRQUFRLEdBQUcsSUFBQSxlQUFVLEVBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzVDLElBQUksUUFBUSxJQUFJLEtBQUs7SUFBRSxJQUFBLGNBQVMsRUFBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFM0MsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUQsNEJBQTBCO0FBQzFCLE9BQU8sQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDIn0=