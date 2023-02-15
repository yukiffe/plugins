import { command } from "bdsx/command";

command.register("월드변경", "Transfer servers").overload(
    (params, origin, output) => {
        const actor = origin.getEntity()!;
        if (params.action == "평지생존") {
            if (actor?.isPlayer()) actor.transferServer("stovel.kr", 19134);
        } else if (params.action == "개발자서버") {
            if (actor?.isPlayer()) actor.transferServer("stovel.kr", 19136);
        }
        // } else if (params.action == "TEST") {
        //     if (actor?.isPlayer()) actor.transferServer("stovel.kr", 19000);
        // } else if (params.action == "TEST2") {
        //     if (actor?.isPlayer()) actor.transferServer("127.0.0.1", 19132);
        // }
    },
    {
        action: command.enum("action.list", "평지생존", "개발자서버"),
    },
);
