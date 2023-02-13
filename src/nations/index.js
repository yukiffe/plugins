"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const utils_1 = require("./../../utils/utils");
const fs = require("fs");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_TERRITORY);
const files = fs.readdirSync(utils_1.root.DATABASE_TERRITORY_AREA);
console.log(files);
files.forEach(file => {
    console.log(file); //이걸로 보고 맵으로 만들기
});
utils_1.console_message.dos_log_server("pioneer Loading", colors_1.yellow, 2);
require("./pioneer");
utils_1.console_message.dos_log_server("pioneer Loaded", colors_1.green, 2);
utils_1.console_message.dos_log_server("Region Loading", colors_1.yellow, 2);
require("./region");
utils_1.console_message.dos_log_server("Region Loaded", colors_1.green, 2);
utils_1.console_message.dos_log_server("events Loading", colors_1.yellow, 2);
require("./events/events");
utils_1.console_message.dos_log_server("events Loaded", colors_1.green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUF1QztBQUV2QywrQ0FBc0U7QUFDdEUseUJBQXlCO0FBRXpCLGdCQUFRLENBQUMsMEJBQTBCLENBQUMsWUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFN0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxZQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtBQUN2QyxDQUFDLENBQUMsQ0FBQztBQUVILHVCQUFlLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3RCxxQkFBbUI7QUFDbkIsdUJBQWUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNELHVCQUFlLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM1RCxvQkFBa0I7QUFDbEIsdUJBQWUsQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLGNBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUQsMkJBQXlCO0FBQ3pCLHVCQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxjQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==