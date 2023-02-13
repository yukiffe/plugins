"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.territory_players = exports.territory_areas = void 0;
const colors_1 = require("colors");
const utils_1 = require("./../../utils/utils");
const fs = require("fs");
const region_base_1 = require("./region_base"); // 좀있다 수정
const event_1 = require("bdsx/event");
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_TERRITORY);
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_TERRITORY_AREA);
utils_1.database.create_folder_if_not_exist(utils_1.root.DATABASE_TERRITORY_PLAYERS);
exports.territory_areas = new Map();
exports.territory_players = new Map();
const area_files = fs.readdirSync(utils_1.root.DATABASE_TERRITORY_AREA);
area_files.forEach(file => {
    const area_territory_class = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, file);
    exports.territory_areas.set(`${area_territory_class.xz_chunk.x}_${area_territory_class.xz_chunk.z}`, area_territory_class);
});
event_1.events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
        const data_class = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`);
        exports.territory_players.set(`${xuid}`, data_class);
    }
    else {
        exports.territory_players.set(`${xuid}`, new region_base_1.PlayerTerritory(new region_base_1.XuidPlayer(name, xuid), [new region_base_1.XuidPlayer(name, xuid)], null));
    }
});
event_1.events.serverClose.on(() => {
    exports.territory_areas.forEach((value, key) => {
        console.log(key);
        console.log(value);
        utils_1.database.upload(utils_1.root.DATABASE_TERRITORY_AREA, `${key}.json`, value);
    });
    exports.territory_players.forEach((value, key) => {
        console.log(key);
        console.log(value);
        utils_1.database.upload(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${key}.json`, value);
    });
});
utils_1.console_message.dos_log_server("nations_command Loading", colors_1.yellow, 2);
require("./nations_command");
utils_1.console_message.dos_log_server("nations_command Loaded", colors_1.green, 2);
// console_message.dos_log_server("Region Loading", yellow, 2);
// import "./region";
// console_message.dos_log_server("Region Loaded", green, 2);
// console_message.dos_log_server("events Loading", yellow, 2);
// import "./events/events";
// console_message.dos_log_server("events Loaded", green, 2);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBdUM7QUFFdkMsK0NBQXNFO0FBQ3RFLHlCQUF5QjtBQUN6QiwrQ0FBb0YsQ0FBQyxTQUFTO0FBQzlGLHNDQUFvQztBQUVwQyxnQkFBUSxDQUFDLDBCQUEwQixDQUFDLFlBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzdELGdCQUFRLENBQUMsMEJBQTBCLENBQUMsWUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDbEUsZ0JBQVEsQ0FBQywwQkFBMEIsQ0FBQyxZQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUV4RCxRQUFBLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztBQUNuRCxRQUFBLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO0FBRXBFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsWUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDaEUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUN0QixNQUFNLG9CQUFvQixHQUFrQixnQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsdUJBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3ZILENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLElBQUksZ0JBQVEsQ0FBQyxVQUFVLENBQUMsWUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRTtRQUN0RSxNQUFNLFVBQVUsR0FBb0IsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsWUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQztRQUNuRyx5QkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUNoRDtTQUFNO1FBQ0gseUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBSSw2QkFBZSxDQUFDLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUN6SDtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0gsY0FBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3ZCLHVCQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBVSxFQUFFLEdBQVEsRUFBRSxFQUFFO1FBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixnQkFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFJLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxHQUFHLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztJQUNILHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxHQUFRLEVBQUUsRUFBRTtRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsWUFBSSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsR0FBRyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0UsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILHVCQUFlLENBQUMsY0FBYyxDQUFDLHlCQUF5QixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyRSw2QkFBMkI7QUFDM0IsdUJBQWUsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLEVBQUUsY0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLCtEQUErRDtBQUMvRCxxQkFBcUI7QUFDckIsNkRBQTZEO0FBQzdELCtEQUErRDtBQUMvRCw0QkFBNEI7QUFDNUIsNkRBQTZEIn0=