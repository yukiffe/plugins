"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("../../utils/utils");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_BASICITEM);
utils_1.console_message.dos_log_server("basicItem_command Loading", colors_1.yellow, 2);
require("./basicItem_command");
utils_1.console_message.dos_log_server("basicItem_command Loaded", colors_1.green, 2);
utils_1.console_message.dos_log_server("basicItem_events Loading", colors_1.yellow, 2);
require("./basicItem_events");
utils_1.console_message.dos_log_server("basicItem_events Loaded", colors_1.green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG1DQUF1QztBQUN2Qyw2Q0FBb0U7QUFFcEUsZ0JBQVEsQ0FBQywwQkFBMEIsQ0FBQyxZQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUU3RCx1QkFBZSxDQUFDLGNBQWMsQ0FBQywyQkFBMkIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkUsK0JBQTZCO0FBQzdCLHVCQUFlLENBQUMsY0FBYyxDQUFDLDBCQUEwQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyRSx1QkFBZSxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEUsOEJBQTRCO0FBQzVCLHVCQUFlLENBQUMsY0FBYyxDQUFDLHlCQUF5QixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyJ9