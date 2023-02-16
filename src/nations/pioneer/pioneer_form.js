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
        const [chunk_x, chunk_z] = utils_1.Maker.xz_process_chunk(position.x, position.z);
        const xz_split = utils_1.Maker.xz_area_split(chunk_x, chunk_z);
        const current_xz_chunk = new region_base_1.XZChunk(chunk_x, chunk_z);
        const dimention = actor.getDimensionId();
        const data_player_territory = __1.territory_players.get(xuid);
        const data_current_area_territory = __1.territory_areas.get(xz_split);
        if (data_current_area_territory !== undefined) {
            const data_area_territory_player_name = `§l§f${data_current_area_territory === null || data_current_area_territory === void 0 ? void 0 : data_current_area_territory.player.name}님의 토지입니다.`;
            const data_owner_territory_area = __1.territory_players.get(data_current_area_territory.player.xuid);
            let content = `${data_owner_territory_area === null || data_owner_territory_area === void 0 ? void 0 : data_owner_territory_area.construct_time}`;
            const res = await form_1.Form.sendTo(ni, {
                type: "form",
                title: `§l§f${data_area_territory_player_name}`,
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
                    actor.sendMessage(`§l§g  ${data_current_area_territory.player.name}님의 토지입니다.`);
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
            return;
        }
        let valid_create = false;
        let owner_player;
        for (let i = chunk_x - 1; i <= chunk_x + 1; i++) {
            for (let j = chunk_z - 1; j <= chunk_z + 1; j++) {
                const data_around_area_territory = __1.territory_areas.get(`${i}_${j}`);
                if (data_around_area_territory !== undefined) {
                    if (__1.territory_players.has(data_around_area_territory.player.xuid)) {
                        const data_area_owner_territory = __1.territory_players.get(data_around_area_territory.player.xuid);
                        if (data_area_owner_territory === null || data_area_owner_territory === void 0 ? void 0 : data_area_owner_territory.players.find(item => item.xuid === xuid)) {
                            owner_player = data_area_owner_territory.player.name;
                            valid_create = true;
                        }
                    }
                    if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
                        const data_area_owner_territory = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`);
                        if (data_area_owner_territory === null || data_area_owner_territory === void 0 ? void 0 : data_area_owner_territory.players.find(item => item.xuid === xuid)) {
                            owner_player = data_area_owner_territory.player.name;
                            valid_create = true;
                        }
                    }
                }
            }
        }
        if (valid_create === false) {
            const area_territory_player_name = "§l§f기록되지 않은 영역입니다.";
            const res = await form_1.Form.sendTo(ni, {
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
                    const area_territory = new region_base_1.AreaTerritory(xuid_player, current_xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
                    const region_territory = new region_base_1.RegionTerritory([area_territory], deepCopy(position), dimention);
                    __1.territory_areas.set(xz_split, area_territory); //새로운 땅 생성
                    data_player_territory.region_territory = region_territory; //값 변경
                    actor.sendMessage(`§l§e새로운 토지를 개척했습니다.`);
                    return;
                case 1:
                    actor.sendMessage("§l§c기록을 취소했습니다.");
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
        }
        else {
            const data_area_territory_player_name = `§l§f${owner_player}님의 토지와 너무 가깝습니다.`;
            const res = await form_1.Form.sendTo(ni, {
                type: "form",
                title: `§l§l${data_area_territory_player_name}`,
                content: "개척이 불가합니다.",
                buttons: [
                    {
                        text: "§l§g주위 토지 확인",
                    },
                    {
                        text: "§l§c취소",
                    },
                ],
            }); //여기코드 수정
            switch (res) {
                case 0:
                    const y = actor.getPosition().y;
                    for (let i = chunk_x - 1; i <= chunk_x + 1; i++) {
                        for (let j = chunk_z - 1; j <= chunk_z + 1; j++) {
                            const data_around_area_territory = __1.territory_areas.get(`${i}_${j}`);
                            if (data_around_area_territory !== undefined) {
                                const x = (data_around_area_territory.xz_chunk.x - 1) * 8;
                                const z = (data_around_area_territory.xz_chunk.z - 1) * 8;
                                for (let i = x; i < x + 8; i++) {
                                    for (let j = z; j < z + 8; j++) {
                                        actor.runCommand(`/particle minecraft:portal_reverse_particle ${i - 0.5} ${y - 1} ${j - 0.5}`);
                                    }
                                }
                            }
                        }
                    }
                    actor.sendMessage(`§l§e주위의 토지를 확인합니다.`);
                    return;
                case 1:
                    actor.sendMessage("§l§c기록을 취소했습니다.");
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
        }
    }
}
exports.Poineer = Poineer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUlyQywwQkFBd0Q7QUFDeEQsZ0RBQTZEO0FBRTdELGdEQUFzRztBQUV0RyxTQUFnQixRQUFRLENBQUksR0FBTTtJQUM5QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQWEsT0FBTztJQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFxQjtRQUVuQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxXQUFXLEdBQUcsSUFBSSx3QkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLGFBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRSxNQUFNLFFBQVEsR0FBRyxhQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxNQUFNLGdCQUFnQixHQUFHLElBQUkscUJBQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLE1BQU0scUJBQXFCLEdBQW9CLHFCQUFpQixD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