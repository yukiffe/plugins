import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { territory_areas, territory_players } from "..";
import { chat, database, Maker, root } from "../../../utils/utils";
import { Region } from "../region/region_form";
import { AreaTerritory, PlayerTerritory, RegionTerritory, XuidPlayer, XZChunk } from "../region_base";

export class Poineer {
    static async form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const position = actor.getPosition();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();

        const xuid_player = new XuidPlayer(name, xuid);
        const [x, z] = Maker.xz_process_chunk(position.x, position.z);
        const xz_split = Maker.xz_area_split(x, z);
        const xz_chunk = new XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const area_territory = new AreaTerritory(xuid_player, xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
        const region_territory = new RegionTerritory([area_territory], position, dimention);

        const data_area_territory: AreaTerritory | undefined = territory_areas.get(xz_split); //플레이어위치의 territory
        const data_player_territory: PlayerTerritory = territory_players.get(xuid)!; //플레이어 정보

        if (data_player_territory?.region_territory !== null) {
            actor.sendMessage(chat.mid("이미 토지를 소유하고있습니다."));
            return;
        }

        let res;
        if (data_area_territory === undefined) {
            const area_territory_player_name = "§l기록되지 않은 영역입니다.";
            res = await Form.sendTo(ni, {
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
                    territory_areas.set(xz_split, area_territory!); //새로운 땅 생성
                    data_player_territory.region_territory = region_territory; //값 변경
                    territory_players.set(xuid, data_player_territory); //플레이어 정보 업데이트

                    actor.sendMessage(chat.mid(`§a새로운 토지를 개척했습니다.`));
                    return;
                case 1:
                    actor.sendMessage(chat.mid("§c기록을 취소했습니다."));
                    return;
                default:
                    actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
            }
        } else {
            const area_territory_player_name = `§l${data_area_territory?.player.name}님의 토지입니다.`;
            const owner_territory_area = territory_players.get(data_area_territory.player.xuid);
            let content: string = `${owner_territory_area?.construct_time}`;
            // let check: boolean = false;
            // for (const member of owner_territory_area?.players!) {
            //     if (xuid === member.xuid) {
            //         check = true;
            //         break;
            //     }
            // }
            // if (check) {
            //     content += `${data_area_territory.player.name}님은 ${name}님에게 토지를 공유합니다.`;
            // } else {
            //     content += `${data_area_territory.player.name}님의 토지에 대한 권한이 없습니다.`;
            // }
            res = await Form.sendTo(ni, {
                type: "form",
                title: `§l${area_territory_player_name}`,
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
                    actor.sendMessage(chat.mid(`§a${data_area_territory.player.name}님의 토지입니다.`));
                    return;
                default:
                    actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
            }
        }
    }
}
