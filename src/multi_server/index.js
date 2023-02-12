"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("../../utils/utils");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_MULTISERVER);
utils_1.console_message.dos_log_server("multiServer_command Loading", colors_1.yellow, 2);
require("./multiServer_command");
utils_1.console_message.dos_log_server("multiServer_command Loaded", colors_1.green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUF1QztBQUN2Qyw2Q0FBb0U7QUFFcEUsZ0JBQVEsQ0FBQywwQkFBMEIsQ0FBQyxZQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUUvRCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekUsaUNBQStCO0FBQy9CLHVCQUFlLENBQUMsY0FBYyxDQUFDLDRCQUE0QixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyJ9