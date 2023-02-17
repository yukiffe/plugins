import { Vec3 } from "bdsx/bds/blockpos";
import { CustomForm, Form, FormButton, FormInput, SimpleForm } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { territory_areas, territory_players } from "..";
import { database, Maker, root } from "../../../utils/utils";
import { bedrockServer } from "bdsx/launcher";
import { Chunk, PlayerNameXuid, TerritoryPlayer } from "../territory_base";

export class Region {
    static async form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;

        const res = await Form.sendTo(ni, {
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
                } else {
                    actor.sendMessage(`§l§e${data_area_territory?.player.name}님의 토지입니다.`);
                    actor.sendMessage("§l§f추가정보 제공 예정");
                }
                return;
            case 1: //이동
                if (await this.check_cancel(ni, "§l§f토지 이동", "§l§7토지로 이동하시겠습니까?")) return;
                //리스트 form 만들기 나중에
                actor.teleport(Vec3.create(data_player_territory?.region_territory?.spawn_position!), data_player_territory.region_territory?.dimention_id);
                actor.sendMessage(`§l§f${data_player_territory?.player.name}님의 토지로 이동했습니다.`);
                return;
            case 2: //확인
                for (const area_territory of data_player_territory.region_territory?.area_territorys!) {
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
                const owner_player = territory_players.get(xuid)!;
                const input_form = new CustomForm("§l§f공유", [new FormInput("§l§7플레이어의 아이디를 적어주세요", "")]);
                input_form.sendTo(ni, (form, target) => {
                    const playerMap = bedrockServer.serverInstance.getPlayers();
                    playerMap.forEach(player => {
                        if ("" + form.response === player.getNameTag()) {
                            const invite_xuid_player = new XuidPlayer(player.getNameTag(), player.getXuid());
                            if (owner_player!.players.find(item => item.xuid === player.getXuid())) {
                                actor.sendMessage("§l§f이미 토지를 공유중인 플레이어입니다.");
                                return;
                            }
                            owner_player?.players.push(invite_xuid_player);
                            territory_players.set(xuid, owner_player);
                            actor.sendMessage("§l§f토지 공유 성공");
                            return;
                        }
                    });
                    actor.sendMessage("§l§f토지 공유 실패");
                });
                return;
            case 4: //확장
                if (data_player_territory.region_territory?.area_territorys!.length >= 4) {
                    actor.sendMessage("§l§fc땅의 최대 개수는 4개입니다.(임시)");
                    actor.sendMessage("§l§f땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
                    return;
                }
                const x = area_territory.xz_chunk.x;
                const z = area_territory.xz_chunk.z;
                const new_area_territory = new AreaTerritory(new XuidPlayer(name, xuid), new XZChunk(x, z));

                //생성조건 함수로 변경
                if (territory_areas.get(`${x}_${z}`)?.player.xuid !== xuid) {
                    actor.sendMessage("§l§c타인의 점거중인 토지는 확장할 수 없습니다.");
                }
                const chunk_x = x;
                const chunk_z = z;
                for (let i = chunk_x - 1; i <= chunk_x + 1; i++) {
                    for (let j = chunk_z - 1; j <= chunk_z + 1; j++) {
                        const data_around_area_territory = territory_areas.get(`${i}_${j}`);
                        if (data_around_area_territory !== undefined) {
                            if (territory_players.has(data_around_area_territory.player.xuid)) {
                                const data_area_owner_territory = territory_players.get(data_around_area_territory.player.xuid);
                                if (data_area_owner_territory?.players.find(item => item.xuid === xuid)) {
                                    actor.sendMessage("§l§c타인과 너무 가까워 토지를 확장할 수 없습니다.");
                                    return;
                                }
                            }
                            if (database.exist_file(root.DATABASE_TERRITORY_PLAYER, `${xuid}.json`)) {
                                const data_area_owner_territory = database.load(root.DATABASE_TERRITORY_PLAYER, `${xuid}.json`);
                                if (data_area_owner_territory?.players.find(item => item.xuid === xuid)) {
                                    actor.sendMessage("§l§c타인과 너무 가까워 토지를 확장할 수 없습니다.");
                                    return;
                                }
                            }
                        }
                    }
                }

                switch (xuid) {
                    case territory_areas.get(`${x}_${z}`)?.player.xuid:
                        actor.sendMessage("§l§c이미 소유중인 토지는 확장할 수 없습니다.");
                        break;
                    case territory_areas.get(`${x - 1}_${z}`)?.player.xuid:
                    case territory_areas.get(`${x + 1}_${z}`)?.player.xuid:
                    case territory_areas.get(`${x}_${z - 1}`)?.player.xuid:
                    case territory_areas.get(`${x}_${z + 1}`)?.player.xuid:
                        territory_areas.set(xz_split, area_territory!); //새로운 땅 생성
                        data_player_territory.region_territory?.area_territorys?.push(new_area_territory); //값 변경
                        territory_players.set(xuid, data_player_territory); //플레이어 정보 업데이트
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
                if (await this.check_cancel(ni, "토지 삭제", "주의: 복구불가")) return;
                for (const area_territory of data_player_territory.region_territory.area_territorys!) {
                    territory_areas.delete(`${area_territory.xz_chunk.x}_${area_territory.xz_chunk.z}`);
                }
                data_player_territory.region_territory = null;
                return;
            default:
                actor.sendMessage("§c명령어가 취소되었습니다.");
        }
    }
    static async check_cancel(ni: NetworkIdentifier, command: string, content: string): Promise<boolean> {
        const res = await Form.sendTo(ni, {
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
        if (res === 0 || res === null) return false;
        else return true;
    }
    static async is_xuid_player(ni: NetworkIdentifier): Promise<XuidPlayer | null> {
        //
        return null;
    }
}
