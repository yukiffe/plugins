"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("../utils/utils");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE);
utils_1.console_message.dos_log_server("nations Loading", colors_1.yellow, 1);
require("./nations");
utils_1.console_message.dos_log_server("nations Loaded", colors_1.green, 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXVDO0FBRXZDLDBDQUFpRTtBQUVqRSxnQkFBUSxDQUFDLDBCQUEwQixDQUFDLFlBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVuRCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0QscUJBQW1CO0FBQ25CLHVCQUFlLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyJ9