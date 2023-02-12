import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import * as fs from "fs";
import { chat, database, root } from "../../../utils/utils";
import { AreaTerritory, RegionBase } from "../region_base";

export class Poineer {
    static async main_menu(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const areaTerritory = new AreaTerritory(ni);
        const area_json = `${areaTerritory.x_chunk}_${areaTerritory.z_chunk}.json`;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "토지의 소유권을 주장합니다.",
            buttons: [
                {
                    text: "§l§e땅 정보",
                },
                {
                    text: "§l§a땅 개척",
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                if (database.exist_file(root.DATABASE_TERRITORY_AREA, area_json)) {
                    const data = database.load(root.DATABASE_TERRITORY_AREA, area_json);
                    actor.sendMessage(chat.mid(`${data._player_name}님의 토지입니다.`));
                } else {
                    actor.sendMessage(chat.mid(`주인이 없는 토지입니다.`));
                }
                return;
            case 1:
                if (database.exist_file(root.DATABASE_TERRITORY_AREA, area_json)) {
                    const data = database.load(root.DATABASE_TERRITORY_AREA, area_json);
                    actor.sendMessage(chat.mid(`§c땅 개척에 실패했습니다.`));
                    actor.sendMessage(chat.mid(`${data._player_name}님의 토지입니다.`));
                } else {
                    database.upload(root.DATABASE_TERRITORY_AREA, area_json, areaTerritory);
                    database.upload(root.DATABASE_TERRITORY_PLAYERS, `${ni.getAddressHigh}_${ni.getAddressLow}.json`, new RegionBase(ni, areaTerritory));
                    actor.sendMessage(chat.mid(`§a새로운 땅을 개척했습니다.`));
                }
                return;
            case 2:
                actor.sendMessage(chat.mid("§c땅 개척을 취소했습니다."));
                return;
            default:
                actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
        }
    }
}
