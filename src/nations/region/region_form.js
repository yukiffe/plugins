"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.map = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const form_1 = require("bdsx/bds/form");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
exports.map = new Map(); //임시용
class Region {
    static async main_menu(ni) {
        const actor = ni.getActor();
        const areaTerritory = new region_base_1.AreaTerritory(ni);
        const [x, z] = utils_1.Territory.xz_chunk(areaTerritory);
        const area_json = utils_1.Territory.area_json(x, z);
        const user_json = utils_1.Territory.player_json(ni);
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "명령어 제작중, 땅건축은 내 땅 내에서만 건축가능하게\n(외부로부터 보호되는 영역만 건축할수있도록 도와줌\n한번더누르면해제 ",
            buttons: [
                {
                    text: "§l§e땅 정보",
                },
                {
                    text: "§l§a땅 이동",
                },
                {
                    text: "§l§a땅 건축",
                },
                {
                    text: "§l§a땅 초대",
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
                if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_AREA, area_json)) {
                    const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
                    actor.sendMessage(utils_1.chat.mid(`${data._player_name}님의 토지입니다.`));
                }
                else {
                    actor.sendMessage(utils_1.chat.mid(`주인이 없는 토지입니다.`));
                }
                return;
            case 1:
                if (await this.check_cancel(ni, "땅 이동"))
                    return;
                if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, user_json)) {
                    const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_PLAYERS, user_json);
                    actor.teleport(blockpos_1.Vec3.create(data._spawn_position));
                    actor.sendMessage(utils_1.chat.mid(`${data._player_name}님의 땅으로 이동했습니다.`));
                }
                else {
                    actor.sendMessage(utils_1.chat.mid(`가진 땅이 존재하지 않습니다.`));
                }
                return;
            case 2:
                if (await this.check_cancel(ni, "땅 건축"))
                    return;
                if (exports.map[actor.getNameTag()] === null || exports.map[actor.getNameTag()] === undefined || exports.map[actor.getNameTag()] === false) {
                    exports.map[actor.getNameTag()] = true;
                    actor.sendMessage(utils_1.chat.mid("땅 전용 건축이 켜졌습니다."));
                }
                else {
                    exports.map[actor.getNameTag()] = false;
                    actor.sendMessage(utils_1.chat.mid("땅 전용 건축이 꺼졌습니다."));
                }
                return;
            case 3:
                actor.sendMessage(utils_1.chat.mid("추가중인 기능입니다."));
                return;
            case 4:
                if (await this.check_cancel(ni, "땅 삭제(주의 복구불가)"))
                    return;
                actor.sendMessage(utils_1.chat.mid("땅을 삭제했습니다."));
                if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, user_json)) {
                    const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_PLAYERS, user_json);
                    const loc = data._spawn_position;
                    const [x, z] = utils_1.Territory.make_xz_chunk(blockpos_1.Vec3.create(loc));
                    const area_json = utils_1.Territory.area_json(x, z);
                    utils_1.database.unlink(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
                    utils_1.database.unlink(utils_1.root.DATABASE_TERRITORY_PLAYERS, user_json);
                }
                return;
            case 5:
                actor.sendMessage(utils_1.chat.mid("추가중인 기능입니다."));
                return;
            default:
                actor.sendMessage(utils_1.chat.mid("§c명령어가 취소되었습니다."));
        }
    }
    static async check_cancel(ni, command) {
        const res = await form_1.Form.sendTo(ni, {
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
        if (res === 0 || res === null)
            return false;
        else
            return true;
    }
}
exports.Region = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFDekMsd0NBQXFDO0FBRXJDLGdEQUF1RTtBQUN2RSxnREFBK0M7QUFFbEMsUUFBQSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUMsQ0FBQyxLQUFLO0FBQ3BELE1BQWEsTUFBTTtJQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQXFCO1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUM3QixNQUFNLGFBQWEsR0FBRyxJQUFJLDJCQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxNQUFNLFNBQVMsR0FBRyxpQkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsTUFBTSxTQUFTLEdBQUcsaUJBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxNQUFNO1lBQ2IsT0FBTyxFQUFFLHVFQUF1RTtZQUNoRixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2dCQUNEO29CQUNJLElBQUksRUFBRSxVQUFVO2lCQUNuQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2dCQUNEO29CQUNJLElBQUksRUFBRSxVQUFVO2lCQUNuQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsa0JBQWtC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