"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const colors_1 = require("colors");
const utils_1 = require("./utils/utils");
event_1.events.serverOpen.on(() => {
    utils_1.console_message.dos_space();
    utils_1.console_message.specific("title");
    utils_1.console_message.specific("auther");
    utils_1.console_message.dos_space();
    utils_1.console_message.dos_log_server("Plugins Loading", colors_1.yellow);
    require("./src/loader");
    utils_1.console_message.dos_log_server("Plugins Loaded", colors_1.green);
    utils_1.console_message.dos_space();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUNwQyxtQ0FBdUM7QUFDdkMseUNBQWdFO0FBRWhFLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0Qix1QkFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLHVCQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLHVCQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLHVCQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUIsdUJBQWUsQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsZUFBTSxDQUFDLENBQUM7SUFDMUQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3hCLHVCQUFlLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGNBQUssQ0FBQyxDQUFDO0lBQ3hELHVCQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMifQ==