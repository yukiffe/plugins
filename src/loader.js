"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("../utils/utils");
const message = new utils_1.Utils.ConsoleMessage();
const root = new utils_1.Utils.Root();
message.dos_log_server("basic_item Loading", colors_1.yellow, 1);
require("./basic_item");
message.dos_log_server("basic_item Loaded", colors_1.green, 1);
message.dos_log_server("multi_server Loading", colors_1.yellow, 1);
require("./multi_server");
message.dos_log_server("multi_server Loaded", colors_1.green, 1);
message.dos_log_server("nations Loading", colors_1.yellow, 1);
require("./nations");
message.dos_log_server("nations Loaded", colors_1.green, 1);
message.dos_log_server("story Loading", colors_1.yellow, 1);
require("./story");
message.dos_log_server("story Loaded", colors_1.green, 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWdEO0FBRWhELDBDQUF1QztBQUd2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMzQyxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUU5QixPQUFPLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4RCx3QkFBc0I7QUFDdEIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxjQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUQsMEJBQXdCO0FBQ3hCLE9BQU8sQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hELE9BQU8sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsZUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JELHFCQUFtQjtBQUNuQixPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxPQUFPLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkQsbUJBQWlCO0FBQ2pCLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyJ9