"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.map = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
const region_base_2 = require("./../region_base");
exports.map = new Map(); //임시용
class Region {
    static async main_menu(ni) {
        var _a;
        const actor = ni.getActor();
        const position = actor.getPosition();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const xuid_player = new region_base_1.XuidPlayer(name, xuid);
        const [x, z] = utils_1.Maker.xz_process_chunk(position.x, position.z);
        const xz_split = utils_1.Maker.xz_area_split(x, z);
        const xz_chunk = new region_base_2.XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const area_territory = new region_base_1.AreaTerritory(xuid_player, xz_chunk, dimention);
        const data_area_territory = __1.territory_areas.get(xz_split);
        // const data_region_territory = territory_regions.get(xz_chunk.xz_area_split());
        const data_player_territory = __1.territory_players.get(xuid);
        const area = utils_1.Maker.xz_area_split(x, z);
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "명령어 제작중, 땅건축은 내 땅 내에서만 건축가능하게\n(외부로부터 보호되는 영역만 건축할수있도록 도와줌\n한번더누르면해제 ",
            buttons: [
                {
                    text: "§l§e땅 정보",
                },
                {
                    text: "§l§f땅 이동",
                },
                {
                    text: "§l§f땅 건축",
                },
                {
                    text: "§l§f땅 초대",
                },
                {
                    text: "§l§c땅 삭제",
                },
                {
                    text: "§l§f땅 확장(추가예정기능)",
                },
            ],
        });
        switch (res) {
            case 0:
                if (data_area_territory === null || data_area_territory === undefined) {
                    actor.sendMessage(utils_1.chat.mid(`주인이 없는 토지입니다.`));
                }
                else {
                    actor.sendMessage(utils_1.chat.mid(`${data_area_territory === null || data_area_territory === void 0 ? void 0 : data_area_territory.player.name}님의 토지입니다.`));
                }
                return;
            case 1:
                if (await this.check_cancel(ni, "땅 이동"))
                    return;
                if (data_area_territory === null || data_area_territory === undefined) {
                    actor.sendMessage(utils_1.chat.mid(`가진 땅이 존재하지 않습니다.`));
                }
                else {
                    actor.teleport((_a = data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) === null || _a === void 0 ? void 0 : _a.spawn_position); //Vec3으로 안만들어줘서 오류날수도있음
                    actor.sendMessage(utils_1.chat.mid(`${data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.player.name}님의 땅으로 이동했습니다.`));
                }
                return;
            case 2:
                if (await this.check_cancel(ni, "땅 건축(자기땅 외 부수기/설치x)"))
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
                /*
                0. 땅이 있는지 확인
                1. 지금위치에 주인 플레이어 받아오기
                2. 주인의 region 가져오기
                3. 내따잉 아니면 주인의 공유함 확인
                4. 공유함에 포함되어있으면 땅ok
                */
                if (data_player_territory === null || data_player_territory === undefined) {
                    actor.sendMessage(utils_1.chat.mid(`가진 땅이 존재하지 않습니다.`));
                }
                return;
            case 4:
                if (await this.check_cancel(ni, "땅 삭제(주의 복구불가)"))
                    return;
                // actor.sendMessage(chat.mid("땅을 삭제했습니다."));
                // if (territory_players.has(user)) {
                //     const data: RegionBase = territory_players.get(user);
                //     const loc = data._spawn_position;
                //     const [x, z] = Maker.xz_process_chunk(Vec3.create(loc));
                //     const area = Maker.xz_area_split(x, z);
                //     territory_areas.delete(area);
                //     territory_players.delete(user);
                // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx3Q0FBcUM7QUFFckMsMEJBQXdEO0FBQ3hELGdEQUFtRTtBQUNuRSxnREFBMkQ7QUFDM0Qsa0RBQTJDO0FBRTlCLFFBQUEsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDLENBQUMsS0FBSztBQUNwRCxNQUFhLE1BQU07SUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFxQjs7UUFDeEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWhDLE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxhQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxRQUFRLEdBQUcsYUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxxQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFM0UsTUFBTSxtQkFBbUIs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