import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { territory_areas, territory_players } from "..";
import { database, Maker, root } from "../../../utils/utils";
import { Region } from "../region/region_form";
import { AreaTerritory, PlayerTerritory, RegionTerritory, XuidPlayer, XZChunk } from "../region_base";

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export class Poineer {
    static async form(ni: NetworkIdentifier) {
        
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const xuid_player = new XuidPlayer(name, xuid);
        const [chunk_x, chunk_z] = Maker.xz_process_chunk(position.x, position.z);
        const xz_split = Maker.xz_area_split(chunk_x, chunk_z);
        const current_xz_chunk = new XZChunk(chunk_x, chunk_z);
        const dimention = actor.getDimensionId();
        const data_player_territory: PlayerTerritory = territory_players.get(xuid)!;

        const data_current_area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);

        if (data_current_area_territory !== undefined) {
            const data_area_territory_player_name = `§l§f${data_current_area_territory?.player.name}님의 토지입니다.`;
            const data_owner_territory_area = territory_players.get(data_current_area_territory.player.xuid);
            let content: string = `${data_owner_territory_area?.construct_time}`;
            const res = await Form.sendTo(ni, {
                type: "form",
                title: `§l§f${data_area_territory_player_name}`,
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
                    actor.sendMessage(`§l§g  ${data_current_area_territory.player.name}님의 토지입니다.`);
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
            return;
        }
        let valid_create: bool_t = false;
        let owner_player: string;
        for (let i = chunk_x - 1; i <= chunk_x + 1; i++) {
            for (let j = chunk_z - 1; j <= chunk_z + 1; j++) {
                const data_around_area_territory = territory_areas.get(`${i}_${j}`);
                if (data_around_area_territory !== undefined) {
                    if (territory_players.has(data_around_area_territory.player.xuid)) {
                        const data_area_owner_territory = territory_players.get(data_around_area_territory.player.xuid);
                        if (data_area_owner_territory?.players.find(item => item.xuid === xuid)) {
                            owner_player = data_area_owner_territory.player.name;
                            valid_create = true;
                        }
                    }
                    if (database.exist_file(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
                        const data_area_owner_territory = database.load(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`);
                        if (data_area_owner_territory?.players.find(item => item.xuid === xuid)) {
                            owner_player = data_area_owner_territory.player.name;
                            valid_create = true;
                        }
                    }
                }
            }
        }
        if (valid_create === false) {
            const area_territory_player_name = "§l§f기록되지 않은 영역입니다.";
            const res = await Form.sendTo(ni, {
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
                    const area_territory = new AreaTerritory(xuid_player, current_xz_chunk); //새로운 AreaTerritory클래스, 생성시 사용
                    const region_territory = new RegionTerritory([area_territory], deepCopy(position), dimention);

                    territory_areas.set(xz_split, area_territory!); //새로운 땅 생성
                    data_player_territory.region_territory = region_territory; //값 변경
                    actor.sendMessage(`§l§e새로운 토지를 개척했습니다.`);
                    return;
                case 1:
                    actor.sendMessage("§l§c기록을 취소했습니다.");
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
        } else {
            const data_area_territory_player_name = `§l§f${owner_player!}님의 토지와 너무 가깝습니다.`;
            const res = await Form.sendTo(ni, {
                type: "form",
                title: `§l§l${data_area_territory_player_name}`,
                content: "개척이 불가합니다.",
                buttons: [
                    {
                        text: "§l§g주위 토지 확인",
                    },
                    {
                        text: "§l§c취소",
                    },
                ],
            }); //여기코드 수정
            switch (res) {
                case 0:
                    const y = actor.getPosition().y;
                    for (let i = chunk_x - 1; i <= chunk_x + 1; i++) {
                        for (let j = chunk_z - 1; j <= chunk_z + 1; j++) {
                            const data_around_area_territory = territory_areas.get(`${i}_${j}`);
                            if (data_around_area_territory !== undefined) {
                                const x = (data_around_area_territory.xz_chunk.x - 1) * 8;
                                const z = (data_around_area_territory.xz_chunk.z - 1) * 8;
                                for (let i = x; i < x + 8; i++) {
                                    for (let j = z; j < z + 8; j++) {
                                        actor.runCommand(`/particle minecraft:portal_reverse_particle ${i - 0.5} ${y - 1} ${j - 0.5}`);
                                    }
                                }
                            }
                        }
                    }
                    actor.sendMessage(`§l§e주위의 토지를 확인합니다.`);
                    return;
                case 1:
                    actor.sendMessage("§l§c기록을 취소했습니다.");
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
        }
    }
}
