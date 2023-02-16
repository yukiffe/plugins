"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("../utils/utils");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE);
utils_1.console_message.dos_log_server("basic_item Loading", colors_1.yellow, 1);
require("./basic_item");
utils_1.console_message.dos_log_server("basic_item Loaded", colors_1.green, 1);
utils_1.console_message.dos_log_server("multi_server Loading", colors_1.yellow, 1);
require("./multi_server");
utils_1.console_message.dos_log_server("multi_server Loaded", colors_1.green, 1);
utils_1.console_message.dos_log_server("nations Loading", colors_1.yellow, 1);
require("./nations");
utils_1.console_message.dos_log_server("nations Loaded", colors_1.green, 1);
// console_message.dos_log_server("story Loading", yellow, 1);
// import "./story";
// console_message.dos_log_server("story Loaded", green, 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXVDO0FBRXZDLDBDQUFpRTtBQUlqRSxnQkFBUSxDQUFDLDBCQUEwQixDQUFDLFlBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVuRCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEUsd0JBQXNCO0FBQ3RCLHVCQUFlLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5RCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEUsMEJBQXdCO0FBQ3hCLHVCQUFlLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoRSx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0QscUJBQW1CO0FBQ25CLHVCQUFlLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRCw4REFBOEQ7QUFDOUQsb0JBQW9CO0FBQ3BCLDREQUE0RCJ9