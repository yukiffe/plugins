"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("../utils/utils");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE);
// console_message.dos_log_server("basic_item Loading", yellow, 1);
// import "./basic_item";
// console_message.dos_log_server("basic_item Loaded", green, 1);
// console_message.dos_log_server("multi_server Loading", yellow, 1);
// import "./multi_server";
// console_message.dos_log_server("multi_server Loaded", green, 1);
utils_1.console_message.dos_log_server("nations Loading", colors_1.yellow, 1);
require("./nations");
utils_1.console_message.dos_log_server("nations Loaded", colors_1.green, 1);
// console_message.dos_log_server("story Loading", yellow, 1);
// import "./story";
// console_message.dos_log_server("story Loaded", green, 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXVDO0FBRXZDLDBDQUFpRTtBQUVqRSxnQkFBUSxDQUFDLDBCQUEwQixDQUFDLFlBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVuRCxtRUFBbUU7QUFDbkUseUJBQXlCO0FBQ3pCLGlFQUFpRTtBQUNqRSxxRUFBcUU7QUFDckUsMkJBQTJCO0FBQzNCLG1FQUFtRTtBQUNuRSx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0QscUJBQW1CO0FBQ25CLHVCQUFlLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRCw4REFBOEQ7QUFDOUQsb0JBQW9CO0FBQ3BCLDREQUE0RCJ9