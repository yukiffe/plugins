import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export class Country {
    static async not_exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: `§l§f$title`,
            content: ``,
            buttons: [
                {
                    text: "§l§e국가 정보",
                }, //정본느 전부 sidebar로 집어넣기
                {
                    text: "§l§국가 선언",
                },
                {
                    text: "입국 신청",
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
        return;
    }
    static async exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: `§l§f$title`,
            content: ``,
            buttons: [
                {
                    text: "§l§e국가 정보",
                },
                {
                    text: "국가 삭제",
                },
                {
                    text: "국가 범위 확인",
                },
                {
                    text: "국가 초대",
                },
                {
                    text: "국가 추방",
                },
                {
                    text: "국가 설정", //마을 이름 변경 등
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
        return;
    }
}
