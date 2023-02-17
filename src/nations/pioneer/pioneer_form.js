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
let y;
function view_area(chunk) {
    const x = chunk.chunk_x * 8;
    const z = chunk.chunk_z * 8;
    for (let i = x; i < x + 8; i++) {
        for (let j = z; j < z + 8; j++) {
            launcher_1.bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${y} ${j}`);
        }
    }
}
exports.view_area = view_area;
function view_around(chunk) {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (__1.territory_areas.has(chunk.get_dxz_chunk_line())) {
                view_area(new territory_base_1.Chunk(i, j, chunk.dimention_id));
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
        const chunk = new territory_base_1.Chunk(position.x, position.z, dimention_id);
        const data_player_territory = __1.territory_players.get(xuid);
        if (data_player_territory === undefined)
            return;
        const data_belong = data_player_territory.belong;
        let data_territory;
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
        if (is_around_area(chunk)) {
            actor.sendMessage("§l§c타인의 토지와 너무 가까워 개척할 수 없습니다.");
            return;
        }
        const area_territory_player_name = "§l§fㄴ";
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
        });
        switch (res) {
            case 0:
                const area_territory = new territory_base_2.TerritoryArea(player_name_xuid, chunk); //새로운 AreaTerritory클래스, 생성시 사용
                const region_territory = new territory_base_1.TerritoryRegion(player_name_xuid, chunk, [area_territory], player_name_xuid.name, 0, 0, 0);
                __1.territory_areas.set(chunk.get_dxz_chunk_line(), area_territory); //새로운 땅 생성
                data_player_territory.belong = `@region@${name}`; //값 변경
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUlyQywwQkFBd0Q7QUFHeEQsc0RBQWdJO0FBQ2hJLDRDQUE4QztBQUM5Qyx3REFBb0Q7QUFFcEQsU0FBZ0IsUUFBUSxDQUFJLEdBQU07SUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRkQsNEJBRUM7QUFFRCxJQUFJLENBQUMsQ0FBQztBQUVOLFNBQWdCLFNBQVMsQ0FBQyxLQUFZO0lBQ2xDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLHdCQUFhLENBQUMsY0FBYyxDQUFDLCtDQUErQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUY7S0FDSjtBQUNMLENBQUM7QUFSRCw4QkFRQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxLQUFZO0lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVB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