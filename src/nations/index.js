"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("./../../utils/utils");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_TERRITORY);
utils_1.console_message.dos_log_server("pioneer Loading", colors_1.yellow, 2);
require("./pioneer");
utils_1.console_message.dos_log_server("pioneer Loaded", colors_1.green, 2);
utils_1.console_message.dos_log_server("Region Loading", colors_1.yellow, 2);
require("./region");
utils_1.console_message.dos_log_server("Region Loaded", colors_1.green, 2);
utils_1.console_message.dos_log_server("events Loading", colors_1.yellow, 2);
require("./events/events");
utils_1.console_message.dos_log_server("events Loaded", colors_1.green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUF1QztBQUV2QywrQ0FBc0U7QUFFdEUsZ0JBQVEsQ0FBQywwQkFBMEIsQ0FBQyxZQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU3RCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0QscUJBQW1CO0FBQ25CLHVCQUFlLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUQsb0JBQWtCO0FBQ2xCLHVCQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxjQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsdUJBQWUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVELDJCQUF5QjtBQUN6Qix1QkFBZSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDIn0=