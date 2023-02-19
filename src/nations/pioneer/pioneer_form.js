"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poineer = exports.is_around_area = exports.is_current_area = exports.view_around = exports.view_area = exports.deepCopy = void 0;
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const territory_base_1 = require("../territory_base");
const launcher_1 = require("bdsx/launcher");
const territory_base_2 = require("./../territory_base");
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepCopy = deepCopy;
function view_area(chunk) {
    const x = chunk.chunk_x * 8;
    const z = chunk.chunk_z * 8;
    for (let i = x; i < x + 8; i++) {
        for (let j = z; j < z + 8; j++) {
            if (i == x || i == x + 7 || j == z || j == z + 7) {
                launcher_1.bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${chunk.y} ${j}`);
            }
        }
    }
}
exports.view_area = view_area;
function view_around(chunk) {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (__1.territory_areas.has(chunk.get_dxz_chunk_line())) {
                view_area(new territory_base_1.Chunk(i, chunk.y, j, chunk.dimention_id));
            }
        }
    }
}
exports.view_around = view_around;
function is_current_area(chunk) {
    if (__1.territory_areas.has(chunk.get_dxz_chunk_line())) {
        return true;
    }
    return false;
}
exports.is_current_area = is_current_area;
function is_around_area(chunk) {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (__1.territory_areas.has(chunk.get_dxz_chunk_line())) {
                //내 그룹이면 flase
                return true;
            }
        }
    }
    return false;
}
exports.is_around_area = is_around_area;
class Poineer {
    static async form(ni) {
        const actor = ni.getActor();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new territory_base_1.PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new territory_base_1.Chunk(position.x, position.y, position.z, dimention_id);
        const data_player_territory = __1.territory_players.get(xuid);
        if (is_current_area(chunk)) {
            const data_area_territory_player_name = `§l§f주인이 있는 토지입니다.`;
            const res = await form_1.Form.sendTo(ni, {
                type: "form",
                title: `§l§f${data_area_territory_player_name}`,
                content: ``,
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
                    actor.sendMessage(`§l§g${__1.territory_areas.get(chunk.get_dxz_chunk_line()).owner.name}님의 토지입니다.`);
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
            return;
        }
        const dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        const dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        let check = false;
        for (let i = 0; i < 12; i++) {
            const around_area = __1.territory_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (around_area === undefined) {
                continue;
            }
            if ((around_area === null || around_area === void 0 ? void 0 : around_area.owner.xuid) !== xuid) {
                check = true;
            }
        }
        if (check) {
            actor.sendMessage("다른 유저와 너무 가까운곳으로 확장이 불가능합니다.");
            return;
        }
        // const area_territory_player_name = "§l§f";
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            // title: `§l§l${area_territory_player_name}`,
            title: "",
            content: "새로운 기록을 작성합니다.",
            buttons: [
                {
                    text: "§l§a토지 개척",
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                const area_territory = new territory_base_2.TerritoryArea(player_name_xuid, chunk);
                __1.territory_areas.set(area_territory.chunk.get_dxz_chunk_line(), area_territory);
                const region_territory = new territory_base_1.TerritoryRegion(player_name_xuid, chunk, [area_territory.chunk.get_dxz_chunk_line()], `${name}`);
                __1.territory_regions.set(region_territory.region_name, region_territory);
                data_player_territory.belong_region = `${name}`;
                actor.sendMessage(`§l§e새로운 토지를 개척했습니다.`);
                return;
            case 1:
                actor.sendMessage("§l§c기록을 취소했습니다.");
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
    }
}
exports.Poineer = Poineer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUlyQywwQkFBMkU7QUFHM0Usc0RBQWdJO0FBQ2hJLDRDQUE4QztBQUM5Qyx3REFBb0Q7QUFFcEQsU0FBZ0IsUUFBUSxDQUFJLEdBQU07SUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRkQsNEJBRUM7QUFFRCxTQUFnQixTQUFTLENBQUMsS0FBWTtJQUNsQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUMsd0JBQWEsQ0FBQyxjQUFjLENBQUMsK0NBQStDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDcEc7U0FDSjtLQUNKO0FBQ0wsQ0FBQztBQVZELDhCQVVDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEtBQVk7SUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxD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