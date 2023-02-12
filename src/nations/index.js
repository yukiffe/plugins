"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const fs_1 = require("fs");
const utils_1 = require("../../utils/utils");
const message = new utils_1.Utils.ConsoleMessage();
const root = new utils_1.Utils.Root();
const database = (0, fs_1.existsSync)(root.DATABASE);
if (database == false)
    (0, fs_1.mkdirSync)(root.DATABASE);
message.dos_log_server("pioneer Loading", colors_1.yellow, 2);
require("./pioneer/pioneer");
message.dos_log_server("pioneer Loaded", colors_1.green, 2);
message.dos_log_server("Region Loading", colors_1.yellow, 2);
require("./region/region");
message.dos_log_server("Region Loaded", colors_1.green, 2);
message.dos_log_server("events Loading", colors_1.yellow, 2);
require("./events/events");
message.dos_log_server("events Loaded", colors_1.green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUF1QztBQUN2QywyQkFBMkM7QUFDM0MsNkNBQTBDO0FBRTFDLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzNDLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRTlCLE1BQU0sUUFBUSxHQUFHLElBQUEsZUFBVSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzQyxJQUFJLFFBQVEsSUFBSSxLQUFLO0lBQUUsSUFBQSxjQUFTLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWhELE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JELDZCQUEyQjtBQUMzQixPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNwRCwyQkFBeUI7QUFDekIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xELE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BELDJCQUF5QjtBQUN6QixPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxjQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==