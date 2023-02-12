"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const utils_1 = require("../../../utils/utils");
const region_form_1 = require("../region/region_form");
const command_1 = require("bdsx/bds/command");
event_1.events.chestOpen.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
        return;
    const block_position = ev.blockPos;
    const [x, z] = utils_1.Territory.make_xz_chunk(block_position);
    const area_json = utils_1.Territory.area_json(x, z);
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_AREA, area_json)) {
        const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return common_1.CANCEL; //남땅이면 CANCEL
        }
    }
    else {
        if (region_form_1.map[player.getNameTag()] == true)
            return common_1.CANCEL; //내땅아니면 CANCEL(조건)
    }
});
event_1.events.blockDestroy.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
        return;
    const block_position = ev.blockPos;
    const [x, z] = utils_1.Territory.make_xz_chunk(block_position);
    const area_json = utils_1.Territory.area_json(x, z);
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_AREA, area_json)) {
        const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return common_1.CANCEL;
        }
    }
    else {
        if (region_form_1.map[player.getNameTag()] == true)
            return common_1.CANCEL; //내땅아니면 CANCEL(조건)
    }
});
event_1.events.blockPlace.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === command_1.CommandPermissionLevel.Operator)
        return;
    const block_position = ev.blockPos;
    const [x, z] = utils_1.Territory.make_xz_chunk(block_position);
    const area_json = utils_1.Territory.area_json(x, z);
    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_AREA, area_json)) {
        const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
        if (player.getNameTag() !== data._player_name) {
            return common_1.CANCEL;
        }
    }
    else {
        if (region_form_1.map[player.getNameTag()] == true)
            return common_1.CANCEL; //내땅아니면 CANCEL(조건)
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXFDO0FBQ3JDLHNDQUFvQztBQUNwQyxnREFBaUU7QUFFakUsdURBQTRDO0FBQzVDLDhDQUEwRDtBQUUxRCxjQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNyQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksTUFBTSxDQUFDLHlCQUF5QixFQUFFLEtBQUssZ0NBQXNCLENBQUMsUUFBUTtRQUFFLE9BQU87SUFDbkYsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLGlCQUFTLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sU0FBUyxHQUFHLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxJQUFJLGdCQUFRLENBQUMsVUFBVSxDQUFDLFlBQUksQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsRUFBRTtRQUM5RCxNQUFNLElBQUksR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFJLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEUsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMzQyxPQUFPLGVBQU0sQ0FBQyxDQUFDLGFBQWE7U0FDL0I7S0FDSjtTQUFNO1FBQ0gsSUFBSSxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLElBQUk7WUFBRSxPQUFPLGVBQU0sQ0FBQyxDQUFDLGtCQUFrQjtLQUMxRTtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDeEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN6QixJQUFJLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLGdDQUFzQixDQUFDLFFBQVE7UUFBRSxPQUFPO0lBQ25GLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2RCxNQUFNLFNBQVMsR0FBRyxpQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxnQkFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFJLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDOUQsTUFBTSxJQUFJLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsWUFBSSxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDM0MsT0FBTyxlQUFNLENBQUM7U0FDakI7S0FDSjtTQUFNO1FBQ0gsSUFBSSxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLElBQUk7WUFBRSxPQUFPLGVBQU0sQ0FBQyxDQUFDLGtCQUFrQjtLQUMxRTtBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUN6QixJQUFJLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLGdDQUFzQixDQUFDLFFBQVE7UUFBRSxPQUFPO0lBQ25GLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7SUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2RCxNQUFNLFNBQVMsR0FBRyxpQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxnQkFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFJLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDOUQsTUFBTSxJQUFJLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsWUFBSSxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDM0MsT0FBTyxlQUFNLENBQUM7U0FDakI7S0FDSjtTQUFNO1FBQ0gsSUFBSSxpQkFBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLElBQUk7WUFBRSxPQUFPLGVBQU0sQ0FBQyxDQUFDLGtCQUFrQjtLQUMxRTtBQUNMLENBQUMsQ0FBQyxDQUFDIn0=