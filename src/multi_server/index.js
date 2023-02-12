"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
command_1.command.register("월드변경", "Transfer servers").overload((params, origin, output) => {
    const actor = origin.getEntity();
    if (params.action == "평지생존") {
        if (actor === null || actor === void 0 ? void 0 : actor.isPlayer())
            actor.transferServer("stovel.kr", 19134);
    }
    else if (params.action == "개발자서버") {
        if (actor === null || actor === void 0 ? void 0 : actor.isPlayer())
            actor.transferServer("stovel.kr", 19136);
    }
}, {
    action: command_1.command.enum("action.list", "평지생존", "개발자서버"),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUV2QyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQ2pELENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN2QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFHLENBQUM7SUFDbEMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtRQUN6QixJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUU7WUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNuRTtTQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDakMsSUFBSSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsUUFBUSxFQUFFO1lBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkU7QUFDTCxDQUFDLEVBQ0Q7SUFDSSxNQUFNLEVBQUUsaUJBQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Q0FDdkQsQ0FDSixDQUFDIn0=