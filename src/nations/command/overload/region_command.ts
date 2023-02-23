import territory from "../register/region_register";
import { nations_players } from "../..";
import { Region } from "../../form/region_form";
import { NationsPlayer } from "../../nations_base";
import { command } from "bdsx/command";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()!.getNetworkIdentifier()!;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player: NationsPlayer = nations_players.get(xuid)!;

        if (data_player.belong_region === null) {
            actor.sendMessage("토지가 없습니다.");
            actor.sendMessage("/개척");
        }
        if (params.command === "정보") {
            Region.info(ni);
            actor.sendMessage("제작중");
        } else if (params.command === "이동") {
            Region.move(ni);
        } else if (params.command === "확인") {
            Region.view(ni);
        }
    },
    {
        command: [command.enum("command", "정보", "이동", "확인"), true],
    },
);

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()!.getNetworkIdentifier()!;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player: NationsPlayer = nations_players.get(xuid)!;

        if (data_player.belong_region === null) {
            actor.sendMessage("토지가 없습니다.");
            actor.sendMessage("/개척");
        }

        if (params.command === "확장") {
            Region.expand(ni);
        } else if (params.command === "축소") {
            Region.reduction(ni);
        } else if (params.command === "납부") {
            Region.probability_pay(ni);
        } else if (params.command === "삭제") {
            Region.delete(ni);
        }
    },
    {
        setting: command.enum("setting", "설정"),
        command: [command.enum("command", "확장", "축소", "납부", "삭제"), true],
    },
);
