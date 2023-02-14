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
                    text: "§l§f토지 확장(추가예정기능)",
                },
                {
                    text: "§l§3토지 설정", //스폰포인트변경, 블럭파괴,설치허용/비허용
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
                if (((_a = data_player_territory.region_territory) === null || _a === void 0 ? void 0 : _a.area_territorys) === null) {
                    actor.sendMessage(utils_1.chat.mid(`소유중인 토지가 존재하지 않습니다.`));
                }
                else {
                    //리스트 form 만들기 나중에
                    actor.teleport(blockpos_1.Vec3.create((_b = data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.region_territory) === null || _b === void 0 ? void 0 : _b.spawn_position), (_c = data_player_territory.region_territory) === null || _c === void 0 ? void 0 : _c.dimention_id);
                    actor.sendMessage(utils_1.chat.mid(`${data_player_territory === null || data_player_territory === void 0 ? void 0 : data_player_territory.player.name}님의 토지로 이동했습니다.`));
                }
                return;
            case 2: //확인
                if (data_player_territory.region_territory === null) {
                    actor.sendMessage(utils_1.chat.mid(`소유중인 토지가 없습니다.`));
                }
                else {
                    for (const area_territory of (_d = data_player_territory.region_territory) === null || _d === void 0 ? void 0 : _d.area_territorys) {
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
                if (((_e = data_player_territory.region_territory) === null || _e === void 0 ? void 0 : _e.area_territorys.length) > 4) {
                    actor.sendMessage("땅의 최대 개수는 4개입니다.(임시)");
                    actor.sendMessage("땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
                }
                const x = area_territory.xz_chunk.x;
                const z = area_territory.xz_chunk.z;
                const new_area_territory = new region_base_1.AreaTerritory(new region_base_1.XuidPlayer(name, xuid), new region_base_2.XZChunk(x, z));
                switch (xuid) {
                    case (_f = __1.territory_areas.get(`${x}_${z}`)) === null || _f === void 0 ? void 0 : _f.player.xuid:
                        actor.sendMessage("자신의 땅은 확장할 수 없습니다.");
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
            case 5: //설정
                actor.sendMessage(utils_1.chat.mid("추가중인 기능입니다."));
                return;
            case 6: //삭제
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
                    return new region_base_1.XuidPlayer(player.getNameTag(), player.getXuid());
                }
            });
        });
        return null;
    }
}
exports.Region = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFDekMsd0NBQW9GO0FBRXBGLDBCQUF3RDtBQUN4RCxnREFBbUU7QUFDbkUsZ0RBQTZGO0FBQzdGLGtEQUEyQztBQUUzQyw0Q0FBOEM7QUFFOUMsU0FBUyxRQUFRLENBQUMsUUFBb0IsRUFBRSxJQUFZO0lBQ2hELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDaEMsUUFBUSxFQUFFLENBQUM7UUFDWCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNkLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUM7QUFDRCxtQkFBbUI7QUFDbkIsWUFBWTtBQUNaLFlBQVk7QUFDWixNQUFhLE1BQU07SUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFxQjs7UUFDeEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO1FBQzdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWhDLE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxhQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFD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