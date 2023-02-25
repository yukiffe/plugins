import territory from "../register/region_register";
import { nations_players } from "../..";
import { Region } from "../../form/region_form";
import { NationsPlayer } from "../../nations_base";
import { command } from "bdsx/command";
import { Form } from "bdsx/bds/form";
import { Poineer } from "../../form/pioneer_form";
import { int32_t } from "bdsx/nativetype";

territory.overload(async (params, origin, output) => {
    const ni = origin.getEntity()!.getNetworkIdentifier()!;

    const actor = ni.getActor()!;
    const xuid = actor.getXuid();

    const data_player: NationsPlayer = nations_players.get(xuid)!;

    if (data_player.belong_region) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l§f토지",
            content: "",
            buttons: [
                {
                    text: "정보",
                },
                {
                    text: "§l§1이동",
                },
                {
                    text: "§l§2확인",
                },
                {
                    text: "확장",
                },
                {
                    text: "취소",
                },
            ],
        });
        switch (res) {
            case 0:
                Region.info(ni);
                return;
            case 1:
                Region.move(ni);
                return;
            case 2:
                Region.view(ni);
                return;
            case 3:
                Region.expand(ni);
                return;
            case 4:
                actor.sendMessage("토지 명령어 취소");
                return;
            default:
                actor.sendMessage("명령어가 취소되었습니다.");
                return;
        }
    } else {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l§f토지",
            content: "",
            buttons: [
                {
                    text: "정보",
                },
                {
                    text: "§l§1생성",
                },
                {
                    text: "§l§2취소",
                },
            ],
        });
        switch (res) {
            case 0:
                Region.info(ni);
                return;
            case 1: //이동
                Poineer.create_region(ni);
                return;
            case 2: //내 토지 확인
                actor.sendMessage("기록 취소");
                return;
            default:
                actor.sendMessage("명령어 취소");
                return;
        }
    }
}, {});

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()!.getNetworkIdentifier()!;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player: NationsPlayer = nations_players.get(xuid)!;

        if (data_player.belong_region === null) {
            actor.sendMessage("토지가 없습니다.");
            actor.sendMessage("/개척");
            return;
        }
        if (params.args0 === "정보") {
            Region.info(ni);
            actor.sendMessage("제작중");
        } else if (params.args0 === "이동") {
            Region.move(ni);
        } else if (params.args0 === "확인") {
            Region.view(ni);
        }
    },
    {
        args0: command.enum("command", "정보", "이동", "확인"),
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
            return;
        }

        if (params.args1 === "확장") {
            Region.expand(ni);
        } else if (params.args1 === "축소") {
            Region.reduction(ni);
        } else if (params.args1 === "삭제") {
            Region.delete(ni);
        } else if (params.args1 === "스폰포인트") {
            Region.set_move(ni);
        }
    },
    {
        setting: command.enum("setting", "설정"),
        args1: [command.enum("command2", "확장", "축소", "납부", "삭제", "스폰포인트"), true],
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
            return;
        }

        Region.probability_pay(ni, params.money);
    },
    {
        setting: command.enum("setting", "설정"),
        args1: command.enum("command2", "납부"),
        money: int32_t,
    },
);
