"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const fs_1 = require("fs");
const utils_1 = require("../utils/utils");
const message = new utils_1.Utils.ConsoleMessage();
const root = new utils_1.Utils.Root();
const database = (0, fs_1.existsSync)(root.DATABASE);
if (database == false)
    (0, fs_1.mkdirSync)(root.DATABASE);
message.dos_log_server("Loading", colors_1.yellow, 1);
message.dos_log_server("pioneer Loading", colors_1.yellow, 2);
require("./pioneer/pioneer");
message.dos_log_server("pioneer Loaded", colors_1.green, 2);
message.dos_log_server("Region Loading", colors_1.yellow, 2);
require("./region/region");
message.dos_log_server("Region Loaded", colors_1.green, 2);
message.dos_log_server("events Loading", colors_1.yellow, 2);
require("./events/events"); //
message.dos_log_server("events Loaded", colors_1.green, 2);
message.dos_log_server("Loaded", colors_1.green, 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdEO0FBQ2hELDJCQUEyQztBQUMzQywwQ0FBdUM7QUFHdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDM0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFOUIsTUFBTSxRQUFRLEdBQUcsSUFBQSxlQUFVLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLElBQUksUUFBUSxJQUFJLEtBQUs7SUFBRSxJQUFBLGNBQVMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRTdDLE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JELDZCQUEyQjtBQUMzQixPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCwyQkFBeUI7QUFDekIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xELE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BELDJCQUF5QixDQUFDLEVBQUU7QUFDNUIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWxELE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyJ9