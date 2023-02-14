"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poineer = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
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
        const area_territory = new region_base_1.AreaTerritory(xuid_player, xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
        const region_territory = new region_base_1.RegionTerritory([area_territory], position, dimention);
        const data_area_territory = __1.territory_areas.get(xz_split); //플레이어위치의 territory
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
                    __1.territory_areas.set(xz_split, area_territory); //새로운 땅 생성
                    data_player_territory.region_territory = region_territory; //값 변경
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
            const owner_territory_area = __1.territory_players.get(data_area_territory.player.xuid);
            let content = `${owner_territory_area === null || owner_territory_area === void 0 ? void 0 : owner_territory_area.construct_time}`;
            // let check: boolean = false;
            // for (const member of owner_territory_area?.players!) {
            //     if (xuid === member.xuid) {
            //         check = true;
            //         break;
            //     }
            // }
            // if (check) {
            //     content += `${data_area_territory.player.name}님은 ${name}님에게 토지를 공유합니다.`;
            // } else {
            //     content += `${data_area_territory.player.name}님의 토지에 대한 권한이 없습니다.`;
            // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUlyQywwQkFBd0Q7QUFDeEQsZ0RBQW1FO0FBRW5FLGdEQUFzRztBQUV0RyxNQUFhLE9BQU87SUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBcUI7UUFDbkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWhDLE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxhQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUQsTUFBTSxRQUFRLEdBQUcsYUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxxQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtRQUMvRixNQUFNLGdCQUFnQixHQUFHLElBQUksNkJBQWUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMs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