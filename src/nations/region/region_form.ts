import { Vec3 } from "bdsx/bds/blockpos";
import { CustomForm, Form, FormButton, FormInput, SimpleForm } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { territory_areas, territory_players } from "..";
import { chat, database, Maker, root } from "../../../utils/utils";
import { AreaTerritory, PlayerTerritory, RegionTerritory, XuidPlayer } from "../region_base";
import { XZChunk } from "./../region_base";
import { BlockSource } from "bdsx/bds/block";
import { bedrockServer } from "bdsx/launcher";

function interval(callback: () => void, time: number) {
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
export class Region {
    static async main_menu(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const position = actor.getPosition();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();

        const xuid_player = new XuidPlayer(name, xuid);
        const [x, z] = Maker.xz_process_chunk(position.x, position.z);
        const y = position.y;
        const xz_split = Maker.xz_area_split(x, z);
        const xz_chunk = new XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const area_territory = new AreaTerritory(xuid_player, xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
        const region_territory = new RegionTerritory([area_territory], position, dimention);

        const data_area_territory: AreaTerritory | undefined = territory_areas.get(xz_split); //플레이어위치의 territory
        const data_player_territory: PlayerTerritory = territory_players.get(xuid)!; //플레이어 정보

        const res = await Form.sendTo(ni, {
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
                    actor.sendMessage(chat.mid(`주인이 없는 토지입니다.`));
                } else {
                    actor.sendMessage(chat.mid(`${data_area_territory?.player.name}님의 토지입니다.`));
                }
                return;
            case 1: //이동
                if (await this.check_cancel(ni, "토지 이동", "토지로 이동하시겠습니까?")) return;
                if (data_player_territory.region_territory?.area_territorys === null) {
                    actor.sendMessage(chat.mid(`소유중인 토지가 존재하지 않습니다.`));
                } else {
                    //리스트 form 만들기 나중에
                    actor.teleport(Vec3.create(data_player_territory?.region_territory?.spawn_position!), data_player_territory.region_territory?.dimention_id);
                    actor.sendMessage(chat.mid(`${data_player_territory?.player.name}님의 토지로 이동했습니다.`));
                }
                return;
            case 2: //확인
                if (data_player_territory.region_territory === null) {
                    actor.sendMessage(chat.mid(`소유중인 토지가 없습니다.`));
                } else {
                    for (const area_territory of data_player_territory.region_territory?.area_territorys!) {
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
                const owner_player = territory_players.get(area_territory.player.xuid);
                const invite_xuid_player: XuidPlayer | null = await this.is_xuid_player(ni);
                //자기자신or있던유저는 초대 x
                if (invite_xuid_player === null) {
                    actor.sendMessage("초대실패");
                } else {
                    owner_player?.players.push(invite_xuid_player);
                    actor.sendMessage("초대성공");
                }
                return;
            case 4:
                if (data_player_territory.region_territory === null) {
                    actor.sendMessage(chat.mid(`소유중인 토지가 없습니다.`));
                    return;
                }
                if (data_player_territory.region_territory?.area_territorys!.length > 4) {
                    actor.sendMessage("땅의 최대 개수는 4개입니다.(임시)");
                    actor.sendMessage("땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
                    return;
                }

                const x = area_territory.xz_chunk.x;
                const z = area_territory.xz_chunk.z;
                const new_area_territory = new AreaTerritory(new XuidPlayer(name, xuid), new XZChunk(x, z));

                switch (xuid) {
                    case territory_areas.get(`${x}_${z}`)?.player.xuid:
                        actor.sendMessage("자신의 땅은 확장할 수 없습니다.");
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
                actor.sendMessage(chat.mid("추가중인 기능입니다."));
                return;
            case 6: //삭제
                return;
            default:
                actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));

            //     text: "§l§f땅 초대",
            //     text: "§l§f땅 확인",
            //     text: "§l§c땅 삭제",
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
        const input_form = new CustomForm("초대", [new FormInput("플레이어의 아이디를 적어주세요", "")]);
        input_form.sendTo(ni, (form, target) => {
            const playerMap = bedrockServer.serverInstance.getPlayers();
            playerMap.forEach(player => {
                if (form.response === player.getNameTag()) {
                    return new XuidPlayer(player.getNameTag(), player.getXuid());
                }
            });
        });
        return null;
    }
}
