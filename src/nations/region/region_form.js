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
function interval(callback, time) {
    let count = 0;
    const intervalId = setInterval(() => {
        callback();
        count++;
        if (count === 10) {
            clearInterval(intervalId);
        }
    }, time);
}
// interval(() => {
//     //파티클
// }, 1000);
class Region {
    static async main_menu(ni) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
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
            actor.sendMessage("땅없음");
            return;
        }
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "",
            buttons: [
                {
                    text: "§l§e토지 정보",
                },
                {
                    text: "§l§f토지 이동",
                },
                {
                    text: "§l§f토지 확인",
                },
                {
                    text: "§l§f토지 초대",
                },
                {
                    text: "§l§f토지 확장",
                },
                {
                    text: "§l§3토지 스폰포인트 설정(임시기능)", //스폰포인트변경, 블럭파괴,설치허용/비허용
                },
                {
                    text: "§l§c토지 삭제",
                },
            ],
        });
        switch (res) {
            case 0: //정보
                if (data_area_territory === undefined) {
                    actor.sendMessage(utils_1.chat.mid(`주인이 없는 토지입니다.`));
                }
                else {
                    actor.sendMessage(utils_1.chat.mid(`${data_area_territory === null || data_area_territory === void 0 ? void 0 : data_area_territory.player.name}님의 토지입니다.`));
                }
                return;
            case 1: //이동
                if (await this.check_cancel(ni, "토지 이동", "토지로 이동하시겠습니까?"))
                    return;
                if (data_player_territory.region_territory === null) {
                    actor.sendMessage(utils_1.chat.mid(`소유중인 토지가 존재하지 않습니다.`));
                }
                else {
                    //리스트 form 만들기 나중에
                    actor.sendMessage((_a = data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) === null || _a === void 0 ? void 0 : _a.spawn_position.toString());
                    actor.sendMessage((_b = data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) === null || _b === void 0 ? void 0 : _b.dimention_id.toString());
                    actor.teleport(blockpos_1.Vec3.create((_c = data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) === null || _c === void 0 ? void 0 : _c.spawn_position), (_d = data_player_territory.region_territory) === null || _d === void 0 ? void 0 : _d.dimention_id);
                    actor.sendMessage(utils_1.chat.mid(`${data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.player.name}님의 토지로 이동했습니다.`));
                }
                return;
            case 2: //확인
                if (data_player_territory.region_territory === null) {
                    actor.sendMessage(utils_1.chat.mid(`소유중인 토지가 없습니다.`));
                }
                else {
                    for (const area_territory of (_e = data_player_territory.region_territory) === null || _e === void 0 ? void 0 : _e.area_territorys) {
                        const x = (area_territory.xz_chunk.x - 1) * 8;
                        const z = (area_territory.xz_chunk.z - 1) * 8;
                        for (let i = x; i < x + 8; i++) {
                            for (let j = z; j < z + 8; j++) {
                                if ((i == x && j == z) || (i == x && j == z + 7) || (i == x + 7 && j == z) || (i == x + 7 && j == z + 7)) {
                                    actor.runCommand(`/particle minecraft:portal_reverse_particle ${i - 0.5} ${y - 1} ${j - 0.5}`);
                                }
                            }
                        }
                    } //안맞을수도있음
                }
                return;
            case 3: //초대
                const owner_player = __1.territory_players.get(area_territory.player.xuid);
                const invite_xuid_player = await this.is_xuid_player(ni);
                //자기자신or있던유저는 초대 x
                if (invite_xuid_player === null) {
                    actor.sendMessage("초대실패");
                }
                else {
                    owner_player === null || owner_player === void 0 ? void 0 : owner_player.players.push(invite_xuid_player);
                    actor.sendMessage("초대성공");
                }
                return;
            case 4:
                if (data_player_territory.region_territory === null) {
                    actor.sendMessage(utils_1.chat.mid(`소유중인 토지가 없습니다.`));
                    return;
                }
                if (((_f = data_player_territory.region_territory) === null || _f === void 0 ? void 0 : _f.area_territorys.length) >= 4) {
                    actor.sendMessage("땅의 최대 개수는 4개입니다.(임시)");
                    actor.sendMessage("땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
                    return;
                }
                const x = area_territory.xz_chunk.x;
                const z = area_territory.xz_chunk.z;
                const new_area_territory = new region_base_1.AreaTerritory(new region_base_1.XuidPlayer(name, xuid), new region_base_2.XZChunk(x, z));
                switch (xuid) {
                    case (_g = __1.territory_areas.get(`${x}_${z}`)) === null || _g === void 0 ? void 0 : _g.player.xuid:
                        actor.sendMessage("자신의 땅은 확장할 수 없습니다.");
                        break;
                    case (_h = __1.territory_areas.get(`${x - 1}_${z}`)) === null || _h === void 0 ? void 0 : _h.player.xuid:
                    case (_j = __1.territory_areas.get(`${x + 1}_${z}`)) === null || _j === void 0 ? void 0 : _j.player.xuid:
                    case (_k = __1.territory_areas.get(`${x}_${z - 1}`)) === null || _k === void 0 ? void 0 : _k.player.xuid:
                    case (_l = __1.territory_areas.get(`${x}_${z + 1}`)) === null || _l === void 0 ? void 0 : _l.player.xuid:
                        __1.territory_areas.set(xz_split, area_territory); //새로운 땅 생성
                        (_o = (_m = data_player_territory.region_territory) === null || _m === void 0 ? void 0 : _m.area_territorys) === null || _o === void 0 ? void 0 : _o.push(new_area_territory); //값 변경
                        __1.territory_players.set(xuid, data_player_territory); //플레이어 정보 업데이트
                        actor.sendMessage("땅을 확장했습니다.");
                        break;
                    default:
                        actor.sendMessage("예외 에러 발생(관리자 문의)");
                        break;
                }
                // if (await this.check_cancel(ni, "땅 삭제(주의 복구불가)")) return;
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
            case 5: //스폰포인트 변경
                if (data_area_territory.player.xuid === xuid) {
                    data_player_territory.region_territory.spawn_position = position;
                    actor.sendMessage(utils_1.chat.mid("§f스폰포인트 변경"));
                }
                else {
                    actor.sendMessage("스폰포인트 변경 실패: 자신의 땅 위에서 정해주세요");
                }
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
                actor.sendMessage(utils_1.chat.mid("§c명령어가 취소되었습니다."));
            //     text: "§l§f땅 초대",
            //     text: "§l§f땅 확인",
            //     text: "§l§c땅 삭제",
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
        const input_form = new form_1.CustomForm("초대", [new form_1.FormInput("플레이어의 아이디를 적어주세요", "")]);
        input_form.sendTo(ni, (form, target) => {
            const playerMap = launcher_1.bedrockServer.serverInstance.getPlayers();
            playerMap.forEach(player => {
                if (form.response === player.getNameTag()) {
                    return new region_base_1.XuidPlayer(player.getName(), player.getXuid());
                }
            });
        });
        return null;
    }
}
exports.Region = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFDekMsd0NBQW9GO0FBRXBGLDBCQUF3RDtBQUN4RCxnREFBbUU7QUFDbkUsZ0RBQTZGO0FBQzdGLGtEQUEyQztBQUMzQyw0Q0FBOEM7QUFFOUMsU0FBUyxRQUFRLENBQUMsUUFBb0IsRUFBRSxJQUFZO0lBQ2hELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDaEMsUUFBUSxFQUFFLENBQUM7UUFDWCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNkLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUM7QUFDRCxtQkFBbUI7QUFDbkIsWUFBWTtBQUNaLFlBQVk7QUFDWixNQUFhLE1BQU07SUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFxQjs7UUFDeEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWhDLE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxhQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFD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