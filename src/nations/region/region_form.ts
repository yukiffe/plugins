import { Vec3 } from "bdsx/bds/blockpos";
import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import * as fs from "fs";
import { AreaTerritory, Utils } from "../../../utils/utils";
import { RegionBase } from "../region_base";

const root = new Utils.Root();
const database = new Utils.Database();
const chat = new Utils.Chat();

export const map = new Map<string, boolean>(); //임시용
export class Region {
    static async main_menu(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const areaTerritory = new AreaTerritory(ni);
        const area_json = `${areaTerritory.x_chunk}_${areaTerritory.z_chunk}.json`;
        const user_json = `${ni.getAddressHigh}_${ni.getAddressLow}.json`;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "명령어 제작중, 땅건축은 내 땅 내에서만 건축가능하게\n(외부로부터 보호되는 영역만 건축할수있도록 도와줌\n한번더누르면해제 ",
            buttons: [
                {
                    text: "§l§e땅 정보",
                }, //
                {
                    text: "§l§a땅 이동",
                },
                {
                    text: "§l§a땅 건축",
                },
                {
                    text: "§l§4땅 삭제",
                },
                {
                    text: "§l§f땅 확장(추가예정기능)",
                },
            ],
        });
        switch (res) {
            case 0:
                if (database.exist_file(root.DATABASE_AREA, area_json)) {
                    const data = database.load(root.DATABASE_AREA, area_json);
                    actor.sendMessage(chat.mid(`${data._player_name}님의 토지입니다.`));
                } else {
                    actor.sendMessage(chat.mid(`주인이 없는 토지입니다.`));
                }
                return;
            case 1:
                if (await this.check_cancel(ni, "땅 이동")) return;
                if (database.exist_file(root.DATABASE_PLAYERS, user_json)) {
                    const data = database.load(root.DATABASE_PLAYERS, user_json);
                    actor.teleport(Vec3.create(data._spawn_position));
                    actor.sendMessage(chat.mid(`${data._player_name}님의 땅으로 이동했습니다.`));
                } else {
                    actor.sendMessage(chat.mid(`가진 땅이 존재하지 않습니다.`));
                }
                return;
            case 2:
                if (await this.check_cancel(ni, "땅 건축")) return;
                if (map[actor.getNameTag()] === null || map[actor.getNameTag()] === undefined || map[actor.getNameTag()] === false) {
                    map[actor.getNameTag()] = true;
                    actor.sendMessage(chat.mid("땅 전용 건축이 켜졌습니다."));
                } else {
                    map[actor.getNameTag()] = false;
                    actor.sendMessage(chat.mid("땅 전용 건축이 꺼졌습니다."));
                }
            case 3:
                if (await this.check_cancel(ni, "땅 삭제(주의 복구불가)")) return;
                actor.sendMessage(chat.mid("땅을 삭제했습니다."));
                if (database.exist_file(root.DATABASE_PLAYERS, user_json)) {
                    const data = database.load(root.DATABASE_PLAYERS, user_json);
                    const loc = data._spawn_position;
                    database.unlink(root.DATABASE_AREA, `${Math.ceil(loc.x / 8)}_${Math.ceil(loc.z / 8)}.json`);
                    database.unlink(root.DATABASE_PLAYERS, user_json);
                }
            default:
                actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
        }
    }
    static async check_cancel(ni: NetworkIdentifier, command: string): Promise<boolean> {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: command,
            content: "명령어를 사용하시겠습니까?",
            buttons: [
                {
                    text: "§l§e확인",
                },
                {
                    text: "§l§a취소",
                },
            ],
        });
        if (res === 0 || res === null) return false;
        else return true;
    }
}
