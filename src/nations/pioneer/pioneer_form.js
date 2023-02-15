"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poineer = exports.deepCopy = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepCopy = deepCopy;
class Poineer {
    static async form(ni) {
        const actor = ni.getActor();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const xuid_player = new region_base_1.XuidPlayer(name, xuid);
        const [x, z] = utils_1.Maker.xz_process_chunk(position.x, position.z);
        const xz_split = utils_1.Maker.xz_area_split(x, z);
        const xz_chunk = new region_base_1.XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const data_area_territory = __1.territory_areas.get(xz_split); //플레이어위치의 territory
        const data_player_territory = __1.territory_players.get(xuid); //플레이어 정보
        let res;
        if (data_area_territory === undefined) {
            const area_territory_player_name = "§l기록되지 않은 영역입니다.";
            res = await form_1.Form.sendTo(ni, {
                type: "form",
                title: `§l§l${area_territory_player_name}`,
                content: "새로운 기록을 작성합니다.",
                buttons: [
                    {
                        text: "§l§a토지 개척",
                    },
                    {
                        text: "§l§c취소",
                    },
                ],
            }); //여기코드 수정
            switch (res) {
                case 0:
                    const area_territory = new region_base_1.AreaTerritory(xuid_player, xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
                    const region_territory = new region_base_1.RegionTerritory([area_territory], deepCopy(position), dimention);
                    __1.territory_areas.set(xz_split, area_territory); //새로운 땅 생성
                    data_player_territory.region_territory = region_territory; //값 변경
                    // territory_players.set(xuid, data_player_territory); //플레이어 정보 업데이트
                    actor.sendMessage(utils_1.chat.mid(`§a새로운 토지를 개척했습니다.`));
                    return;
                case 1:
                    actor.sendMessage(utils_1.chat.mid("§c기록을 취소했습니다."));
                    return;
                default:
                    actor.sendMessage(utils_1.chat.mid("§c명령어가 취소되었습니다."));
            }
        }
        else {
            const area_territory_player_name = `§l${data_area_territory === null || data_area_territory === void 0 ? void 0 : data_area_territory.player.name}님의 토지입니다.`;
            const owner_territory_area = __1.territory_players.get(data_area_territory.player.xuid);
            let content = `${owner_territory_area === null || owner_territory_area === void 0 ? void 0 : owner_territory_area.construct_time}`;
            res = await form_1.Form.sendTo(ni, {
                type: "form",
                title: `§l${area_territory_player_name}`,
                content: `${content}`,
                buttons: [
                    {
                        text: "§l§e토지 정보",
                    },
                    {
                        text: "§l§c취소",
                    },
                ],
            });
            switch (res) {
                case 0:
                    actor.sendMessage(utils_1.chat.mid(`§a${data_area_territory.player.name}님의 토지입니다.`));
                    return;
                default:
                    actor.sendMessage(utils_1.chat.mid("§c명령어가 취소되었습니다."));
            }
        }
    }
}
exports.Poineer = Poineer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUlyQywwQkFBd0Q7QUFDeEQsZ0RBQW1FO0FBRW5FLGdEQUFzRztBQUV0RyxTQUFnQixRQUFRLENBQUksR0FBTTtJQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFxQjtRQUNuQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFckMsTUFBTSxXQUFXLEdBQUcsSUFBSSx3QkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RCxNQUFNLFFBQVEsR0FBRyxhQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLHFCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV6QyxNQUFNLG1CQUFtQixHQUE4QixtQkFBZSxDQUFD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