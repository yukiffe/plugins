"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const colors_1 = require("colors");
const utils_1 = require("./utils/utils");
const message = new utils_1.Utils.ConsoleMessage();
event_1.events.serverOpen.on(() => {
    message.dos_space();
    message.specific("title");
    message.specific("auther");
    message.dos_space();
    message.dos_log_server("Plugins Loading", colors_1.yellow);
    require("./src/loader");
    message.dos_log_server("Plugins Loaded", colors_1.green);
    message.dos_space();
});
//
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUNwQyxtQ0FBdUM7QUFDdkMseUNBQXNDO0FBRXRDLE1BQU0sT0FBTyxHQUFHLElBQUksYUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRTNDLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNwQixPQUFPLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLGVBQU0sQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4QixPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssQ0FBQyxDQUFDO0lBQ2hELE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUNILEVBQUUifQ==