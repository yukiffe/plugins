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
                const region_territory = new territory_base_1.TerritoryRegion(player_name_xuid, chunk, [area_territory.chunk.get_dxz_chunk_line()], `${name}_region`);
                __1.territory_regions.set(region_territory.region_name, region_territory);
                data_player_territory.belong_region = `${name}_region`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUlyQywwQkFBMkU7QUFHM0Usc0RBQWdJO0FBQ2hJLDRDQUE4QztBQUM5Qyx3REFBb0Q7QUFFcEQsU0FBZ0IsUUFBUSxDQUFJLEdBQU07SUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRkQsNEJBRUM7QUFFRCxJQUFJLENBQUMsQ0FBQztBQUVOLFNBQWdCLFNBQVMsQ0FBQyxLQUFZO0lBQ2xDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLHdCQUFhLENBQUMsY0FBYyxDQUFDLCtDQUErQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUY7S0FDSjtBQUNMLENBQUM7QUFSRCw4QkFRQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxLQUFZO0lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVB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