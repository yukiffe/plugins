"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.story = void 0;
const colors_1 = require("colors");
const utils_1 = require("./../../utils/utils");
const fs = require("fs");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_STORY);
exports.story = new Map();
const story_files = fs.readdirSync(utils_1.root.DATABASE_STORY);
story_files.forEach(file => {
    const story_class = utils_1.database.load(utils_1.root.DATABASE_STORY, file);
    exports.story.set(`${story_class.player.xuid}`, story_class);
});
utils_1.console_message.dos_log_server("events Loading", colors_1.yellow, 2);
require("./events/events");
utils_1.console_message.dos_log_server("events Loaded", colors_1.green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBdUM7QUFFdkMsK0NBQXNFO0FBRXRFLHlCQUF5QjtBQUV6QixnQkFBUSxDQUFDLDBCQUEwQixDQUFDLFlBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU1QyxRQUFBLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBcUIsQ0FBQztBQUNsRCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN4RCxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3ZCLE1BQU0sV0FBVyxHQUFjLGdCQUFRLENBQUMsSUFBSSxDQUFDLFlBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsYUFBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDLENBQUM7QUFFSCx1QkFBZSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUQsMkJBQXlCO0FBQ3pCLHVCQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsRUFBRSxjQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==