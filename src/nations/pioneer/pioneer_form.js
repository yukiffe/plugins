"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poineer = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
__1.territory_areas; //땅정보
__1.territory_players; //플레이어들 정보
class Poineer {
    static async form(ni) {
        const actor = ni.getActor();
        const position = actor.getPosition();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const xuid_player = new region_base_1.XuidPlayer(name, xuid);
        const [x, z] = utils_1.Maker.xz_process_chunk(position.x, position.z);
        const xz_split = utils_1.Maker.xz_area_split(x, z);
        const xz_chunk = new region_base_1.XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const area_territory = new region_base_1.AreaTerritory(xuid_player, xz_chunk, dimention); //새로운 AreaTerritory클래스, 생성시 사용
        const region_territory = new region_base_1.RegionTerritory([area_territory], position);
        const data_area_territory = __1.territory_areas.get(xz_split); //플레이어위치의 territory
        // const data_region_territory = territory_regions.get();//플레이어 소유의 땅
        const data_player_territory = __1.territory_players.get(xuid); //플레이어 정보
        if ((data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) !== null) {
            actor.sendMessage(utils_1.chat.mid("이미 토지를 소유하고있습니다."));
            return;
        }
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
                    console.log(__1.territory_areas);
                    __1.territory_areas.set(xz_split, area_territory); //새로운 땅 생성
                    data_player_territory.region_territory = region_territory; //값 변경
                    console.log(data_player_territory);
                    __1.territory_players.set(xuid, data_player_territory); //플레이어 정보 업데이트
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
            res = await form_1.Form.sendTo(ni, {
                type: "form",
                title: `§l${area_territory_player_name}`,
                content: "새로운 기록을 작성합니다.",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUdyQywwQkFBd0Q7QUFDeEQsZ0RBQW1FO0FBRW5FLGdEQUFzRztBQUV0RyxtQkFBZSxDQUFDLENBQUMsS0FBSztBQUN0QixxQkFBaUIsQ0FBQyxDQUFDLFVBQVU7QUFFN0IsTUFBYSxPQUFPO0lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQXFCO1FBQ25DLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sUUFBUSxHQUFHLGFBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sUUFBUSxHQUFHLElBQUkscUJBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksMkJBQWEsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBQzFHLE1BQU0sZ0JB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