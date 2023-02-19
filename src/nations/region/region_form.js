"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const launcher_1 = require("bdsx/launcher");
const territory_base_1 = require("../territory_base");
class Region {
    static async form(ni) {
        const actor = ni.getActor();
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l§f토지",
            content: "",
            buttons: [
                {
                    text: "§l§1토지 이동",
                },
                {
                    text: "§l§2토지 위치 확인",
                },
                {
                    text: "§l§5토지 확장",
                },
                // {
                //     text: "§l§3토지 공유",
                // }, //공유 or 해제 여기다 넣기
                {
                    text: "§l§4토지 삭제",
                },
                {
                    text: "§l§6토지 설정", //스폰포인트변경, 블럭파괴,설치허용/비허용
                },
            ],
        });
        switch (res) {
            case 0: //이동
                await this.move(ni);
                return;
            case 1: //내 토지 확인
                await this.view(ni);
                return;
            case 2: //확장, 축소
                await this.expand_and_collapse(ni);
                return;
            // case 3: //공유
            //     await this.share(ni);
            //     return;
            case 3: //삭제
                await this.delete(ni);
                return;
            case 4:
                actor.sendMessage("추가중인 기능입니다.");
                return;
            default:
                actor.sendMessage("§c명령어가 취소되었습니다.");
                return;
        }
    }
    static async check_cancel(ni, command, content) {
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: command,
            content: content,
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
    static async move(ni) {
        const actor = ni.getActor();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new territory_base_1.PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new territory_base_1.Chunk(position.x, position.y, position.z, dimention_id);
        const data_player_territory = __1.territory_players.get(xuid);
        const region_territory_name = data_player_territory.belong_region;
        const region_territory = __1.territory_regions.get(region_territory_name);
        if (await this.check_cancel(ni, "§l§f토지 이동", "§l§7토지로 이동하시겠습니까?")) {
            actor.sendMessage("이동이 취소되었습니다.");
            return;
        }
        const [region_territory_dimention, region_territory_x, region_territory_y, region_territory_z] = region_territory.spawn_position.get_dxyz();
        actor.teleport(blockpos_1.Vec3.create(region_territory_x, region_territory_y, region_territory_z), region_territory_dimention);
        actor.sendMessage(`§l§f${name}님의 토지로 이동했습니다.`);
    }
    static async view_area(chunk) {
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
    static async view(ni) {
        const actor = ni.getActor();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new territory_base_1.PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new territory_base_1.Chunk(position.x, position.y, position.z, dimention_id);
        const data_player_territory = __1.territory_players.get(xuid);
        const region_territory_name = data_player_territory.belong_region;
        const region_territory = __1.territory_regions.get(region_territory_name);
        for (const area_territory_name of region_territory.area_territorys) {
            const area_territory = __1.territory_areas.get(area_territory_name);
            this.view_area(area_territory === null || area_territory === void 0 ? void 0 : area_territory.chunk);
        }
    }
    static async expand_and_collapse(ni) {
        const actor = ni.getActor();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new territory_base_1.PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new territory_base_1.Chunk(position.x, position.y, position.z, dimention_id);
        const data_player_territory = __1.territory_players.get(xuid);
        const region_territory_name = data_player_territory.belong_region;
        const data_region_territory = __1.territory_regions.get(region_territory_name);
        // FORM
        //-1: 확장인지 축소인지 확인
        /**0. 땅 개수 확인
         * 1. 땅이 비어있는지 있는지 확인
         * 2. 땅 주위 내땅인지 확인
         * 3. 주위 플레이어 있는지 확인
         */
        if (data_region_territory.area_territorys.length >= 4) {
            actor.sendMessage("§l§fc땅의 최대 개수는 4개입니다.(임시)");
            actor.sendMessage("§l§f땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
            return;
        }
        const current_area = __1.territory_areas.get(chunk.get_dxz_chunk_line());
        if (current_area !== undefined) {
            actor.sendMessage("확장이 불가능한 땅입니다.");
            return;
        }
        let dx = [0, 0, 1, -1];
        let dz = [1, -1, 0, 0];
        let check = false;
        for (let i = 0; i < 4; i++) {
            const around_area = __1.territory_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (around_area === undefined) {
                continue;
            }
            if ((around_area === null || around_area === void 0 ? void 0 : around_area.owner.xuid) === xuid) {
                check = true;
            }
        }
        if (!check) {
            actor.sendMessage("주위에 자신의 땅과 맞닿아있어야합니다.");
            return;
        }
        dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        check = false;
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
        const new_area_territory = new territory_base_1.TerritoryArea(new territory_base_1.PlayerNameXuid(name, xuid), chunk);
        __1.territory_areas.set(chunk.get_dxz_chunk_line(), new_area_territory);
        data_region_territory.area_territorys.push(chunk.get_dxz_chunk_line());
        __1.territory_regions.set(data_region_territory.region_name, data_region_territory);
        actor.sendMessage("땅을 확장했습니다.");
        return;
    }
    static async delete(ni) {
        const actor = ni.getActor();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new territory_base_1.PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new territory_base_1.Chunk(position.x, position.y, position.z, dimention_id);
        const data_player_territory = __1.territory_players.get(xuid);
        const region_territory_name = data_player_territory.belong_region;
        const data_region_territory = __1.territory_regions.get(region_territory_name);
        if (await this.check_cancel(ni, "토지 삭제", "주의: 복구불가"))
            return;
        for (const area_territory_name of data_region_territory.area_territorys) {
            __1.territory_areas.delete(area_territory_name);
            utils_1.database.unlink(utils_1.root.DATABASE_TERRITORY_AREA, `${area_territory_name}.json`);
        }
        __1.territory_regions.delete(region_territory_name);
        utils_1.database.unlink(utils_1.root.DATABASE_TERRITORY_REGION, `${region_territory_name}.json`);
        data_player_territory.belong_region = null;
        __1.territory_players.set(data_player_territory.owner.xuid, data_player_territory);
        return;
    }
}
exports.Region = Region;
// PlayerCommandSelector;
// static async share(ni: NetworkIdentifier): Promise<void> {
//     const actor = ni.getActor()!;
//     const xuid = actor.getXuid();
//     const name = actor.getNameTag();
//     const player_name_xuid = new PlayerNameXuid(name, xuid);
//     const position = actor.getPosition();
//     const dimention_id = actor.getDimensionId();
//     const chunk = new Chunk(position.x, position.y, position.z, dimention_id);
//     const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
//     const region_territory_name = data_player_territory.belong_region!;
//     const data_region_territory = territory_regions.get(region_territory_name)!;
//     const owner_player = territory_players.get(xuid)!;
//     const input_form = new CustomForm("§l§f공유", [new FormInput("§l§7플레이어의 아이디를 적어주세요", "")]);
//     input_form.sendTo(ni, (form, target) => {
//         const playerMap = bedrockServer.serverInstance.getPlayers();
//         playerMap.forEach(player => {
//             if ("" + form.response === player.getNameTag()) {
//                 const invite_xuid_player = new PlayerNameXuid(player.getNameTag(), player.getXuid());
//                 if (owner_player!.players.find(item => item.xuid === player.getXuid())) {
//                     actor.sendMessage("§l§f이미 토지를 공유중인 플레이어입니다.");
//                     return;
//                 }
//                 owner_player?.players.push(invite_xuid_player);
//                 territory_players.set(xuid, owner_player);
//                 actor.sendMessage("§l§f토지 공유 성공");
//                 return;
//             }
//         });
//         actor.sendMessage("§l§f토지 공유 실패");
//     });
//     actor.sendMessage("스폰포인트 변경 실패: 자신의 땅 위에서 정해주세요");
//     return;
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFDekMsd0NBQW9GO0FBRXBGLDBCQUEyRTtBQUMzRSxnREFBNkQ7QUFDN0QsNENBQThDO0FBQzlDLHNEQUEwRjtBQUsxRixNQUFhLE1BQU07SUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFxQjtRQUNuQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7UUFDN0IsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxRQUFRO1lBQ2YsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLFdBQVc7aUJBQ3BCO2dCQUNEO29CQUNJLElBQUksRUFBRSxjQUFjO2lCQUN2QjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsV0FBVztpQkFDcEI7Z0JBQ0QsSUFBSTtnQkFDSix5QkFBeUI7Z0JBQ3pCLHVCQUF1QjtnQkFDdkI7b0JBQ0ksSUFBSSxFQUFFLFdBQVc7aUJBQ3BCO2dCQUNEO29CQUNJLElBQUksRUFBRSxXQUFXLEVBQUUsd0JBQXdCO2lCQUM5QzthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsUUFBUSxHQUFHLEVBQUU7WUFDVCxLQUFLLENBQUMsRUFBRSxJQUFJO2dCQUNSLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEIsT0FBTztZQUNYLEtBQUssQ0FBQyxFQUFFLFNBQVM7Z0JBQ2IsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQixPQUFPO1lBQ1gsS0FBSyxDQUFDLEVBQUUsUUFBUTtnQkFDWixNQUFNLElBQUksQ0FBQyxtQkFBbUIs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