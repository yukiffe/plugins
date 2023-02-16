"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const form_1 = require("bdsx/bds/form");
const __1 = require("..");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
const region_base_2 = require("./../region_base");
const launcher_1 = require("bdsx/launcher");
class Region {
    static async main_menu(ni) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const actor = ni.getActor();
        const position = actor.getPosition();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const xuid_player = new region_base_1.XuidPlayer(name, xuid);
        const [x, z] = utils_1.Maker.xz_process_chunk(position.x, position.z);
        const y = position.y;
        const xz_split = utils_1.Maker.xz_area_split(x, z);
        const xz_chunk = new region_base_2.XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const area_territory = new region_base_1.AreaTerritory(xuid_player, xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
        const region_territory = new region_base_1.RegionTerritory([area_territory], position, dimention);
        const data_area_territory = __1.territory_areas.get(xz_split); //플레이어위치의 territory
        const data_player_territory = __1.territory_players.get(xuid); //플레이어 정보
        if (data_player_territory.region_territory === null) {
            actor.sendMessage("§l§c토지가 존재하지 않습니다.");
            return;
        }
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l§f토지",
            content: "",
            buttons: [
                {
                    text: "§l§e토지 정보(현재 위치)",
                },
                {
                    text: "§l§1토지 이동",
                },
                {
                    text: "§l§2내 토지 확인",
                },
                {
                    text: "§l§3토지 공유",
                },
                {
                    text: "§l§5토지 확장",
                },
                {
                    text: "§l§6토지 스폰포인트 설정(임시기능)", //스폰포인트변경, 블럭파괴,설치허용/비허용
                },
                {
                    text: "§l§4토지 삭제",
                },
            ],
        });
        switch (res) {
            case 0: //정보
                if (data_area_territory === undefined) {
                    actor.sendMessage(`§l§f주인이 없는 토지입니다.`);
                }
                else {
                    actor.sendMessage(`§l§e${data_area_territory === null || data_area_territory === void 0 ? void 0 : data_area_territory.player.name}님의 토지입니다.`);
                    actor.sendMessage("§l§f추가정보 제공 예정");
                }
                return;
            case 1: //이동
                if (await this.check_cancel(ni, "§l§f토지 이동", "§l§7토지로 이동하시겠습니까?"))
                    return;
                //리스트 form 만들기 나중에
                actor.teleport(blockpos_1.Vec3.create((_a = data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) === null || _a === void 0 ? void 0 : _a.spawn_position), (_b = data_player_territory.region_territory) === null || _b === void 0 ? void 0 : _b.dimention_id);
                actor.sendMessage(`§l§f${data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.player.name}님의 토지로 이동했습니다.`);
                return;
            case 2: //확인
                for (const area_territory of (_c = data_player_territory.region_territory) === null || _c === void 0 ? void 0 : _c.area_territorys) {
                    const x = (area_territory.xz_chunk.x - 1) * 8;
                    const z = (area_territory.xz_chunk.z - 1) * 8;
                    for (let i = x; i < x + 8; i++) {
                        for (let j = z; j < z + 8; j++) {
                            actor.runCommand(`/particle minecraft:portal_reverse_particle ${i - 0.5} ${y - 1} ${j - 0.5}`);
                        }
                    }
                }
                return;
            case 3: //공유
                const owner_player = __1.territory_players.get(xuid);
                const input_form = new form_1.CustomForm("§l§f공유", [new form_1.FormInput("§l§7플레이어의 아이디를 적어주세요", "")]);
                input_form.sendTo(ni, (form, target) => {
                    const playerMap = launcher_1.bedrockServer.serverInstance.getPlayers();
                    playerMap.forEach(player => {
                        if ("" + form.response === player.getNameTag()) {
                            const invite_xuid_player = new region_base_1.XuidPlayer(player.getNameTag(), player.getXuid());
                            if (owner_player.players.find(item => item.xuid === player.getXuid())) {
                                actor.sendMessage("§l§f이미 토지를 공유중인 플레이어입니다.");
                                return;
                            }
                            owner_player === null || owner_player === void 0 ? void 0 : owner_player.players.push(invite_xuid_player);
                            __1.territory_players.set(xuid, owner_player);
                            actor.sendMessage("§l§f토지 공유 성공");
                            return;
                        }
                    });
                    actor.sendMessage("§l§f토지 공유 실패");
                });
                return;
            case 4: //확장
                if (((_d = data_player_territory.region_territory) === null || _d === void 0 ? void 0 : _d.area_territorys.length) >= 4) {
                    actor.sendMessage("§l§fc땅의 최대 개수는 4개입니다.(임시)");
                    actor.sendMessage("§l§f땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
                    return;
                }
                const x = area_territory.xz_chunk.x;
                const z = area_territory.xz_chunk.z;
                const new_area_territory = new region_base_1.AreaTerritory(new region_base_1.XuidPlayer(name, xuid), new region_base_2.XZChunk(x, z));
                //생성조건 함수로 변경
                if (((_e = __1.territory_areas.get(`${x}_${z}`)) === null || _e === void 0 ? void 0 : _e.player.xuid) !== xuid) {
                    actor.sendMessage("§l§c타인의 점거중인 토지는 확장할 수 없습니다.");
                }
                const chunk_x = x;
                const chunk_z = z;
                for (let i = chunk_x - 1; i <= chunk_x + 1; i++) {
                    for (let j = chunk_z - 1; j <= chunk_z + 1; j++) {
                        const data_around_area_territory = __1.territory_areas.get(`${i}_${j}`);
                        if (data_around_area_territory !== undefined) {
                            if (__1.territory_players.has(data_around_area_territory.player.xuid)) {
                                const data_area_owner_territory = __1.territory_players.get(data_around_area_territory.player.xuid);
                                if (data_area_owner_territory === null || data_area_owner_territory === void 0 ? void 0 : data_area_owner_territory.players.find(item => item.xuid === xuid)) {
                                    actor.sendMessage("§l§c타인과 너무 가까워 토지를 확장할 수 없습니다.");
                                    return;
                                }
                            }
                            if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
                                const data_area_owner_territory = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`);
                                if (data_area_owner_territory === null || data_area_owner_territory === void 0 ? void 0 : data_area_owner_territory.players.find(item => item.xuid === xuid)) {
                                    actor.sendMessage("§l§c타인과 너무 가까워 토지를 확장할 수 없습니다.");
                                    return;
                                }
                            }
                        }
                    }
                }
                switch (xuid) {
                    case (_f = __1.territory_areas.get(`${x}_${z}`)) === null || _f === void 0 ? void 0 : _f.player.xuid:
                        actor.sendMessage("§l§c이미 소유중인 토지는 확장할 수 없습니다.");
                        break;
                    case (_g = __1.territory_areas.get(`${x - 1}_${z}`)) === null || _g === void 0 ? void 0 : _g.player.xuid:
                    case (_h = __1.territory_areas.get(`${x + 1}_${z}`)) === null || _h === void 0 ? void 0 : _h.player.xuid:
                    case (_j = __1.territory_areas.get(`${x}_${z - 1}`)) === null || _j === void 0 ? void 0 : _j.player.xuid:
                    case (_k = __1.territory_areas.get(`${x}_${z + 1}`)) === null || _k === void 0 ? void 0 : _k.player.xuid:
                        __1.territory_areas.set(xz_split, area_territory); //새로운 땅 생성
                        (_m = (_l = data_player_territory.region_territory) === null || _l === void 0 ? void 0 : _l.area_territorys) === null || _m === void 0 ? void 0 : _m.push(new_area_territory); //값 변경
                        __1.territory_players.set(xuid, data_player_territory); //플레이어 정보 업데이트
                        actor.sendMessage("땅을 확장했습니다.");
                        break;
                    default:
                        actor.sendMessage("예외 에러 발생(관리자 문의)");
                        break;
                }
                return;
            case 5: //스폰포인트 변경
                if (data_area_territory !== undefined) {
                    if (data_area_territory.player.xuid === xuid) {
                        data_player_territory.region_territory.spawn_position = position;
                        actor.sendMessage("§f스폰포인트 변경");
                        return;
                    }
                }
                actor.sendMessage("스폰포인트 변경 실패: 자신의 땅 위에서 정해주세요");
                return;
            case 6: //삭제
                if (await this.check_cancel(ni, "토지 삭제", "주의: 복구불가"))
                    return;
                for (const area_territory of data_player_territory.region_territory.area_territorys) {
                    __1.territory_areas.delete(`${area_territory.xz_chunk.x}_${area_territory.xz_chunk.z}`);
                }
                data_player_territory.region_territory = null;
                return;
            default:
                actor.sendMessage("§c명령어가 취소되었습니다.");
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
    static async is_xuid_player(ni) {
        //
        return null;
    }
}
exports.Region = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFDekMsd0NBQW9GO0FBRXBGLDBCQUF3RDtBQUN4RCxnREFBNkQ7QUFDN0QsZ0RBQTZGO0FBQzdGLGtEQUEyQztBQUMzQyw0Q0FBOEM7QUFFOUMsTUFBYSxNQUFNO0lBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBcUI7O1FBQ3hDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLHdCQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsYUFBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxRQUFRLEdBQUcsYUFBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxxQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBYSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLDhCQUE4QjtR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