import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { nations_players, nations_areas, nations_regions, nations_villages } from "..";
import { Chunk, PlayerNameXuid, NationsCountry, NationsPlayer, NationsRegion, NationsVillage } from "../nations_base";
import { bedrockServer } from "bdsx/launcher";
import { NationsArea } from "../nations_base";
import { nations_countrys } from "..";

export class Poineer {
    static async create_region(ni: NetworkIdentifier, purpose: string) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line());

        //주위 토지 확인
        let valid_area = true;
        let dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        let dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        for (let i = 0; i < 12; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (data_around_area === undefined) {
                continue;
            }
            if (data_around_area.region_name !== null) {
                const data_around_region_name = data_around_area.region_name;
                const data_around_region = nations_regions.get(data_around_region_name);
                const data_around_region_player = nations_players.get(data_around_region?.owner.xuid!);
                const data_around_region_player_friends = data_around_region_player?.friends;
                valid_area = !data_around_region_player_friends!.some(friend => friend.xuid === xuid); //친구 목록에 없으면 생성조건 취소
                if (!valid_area) {
                    actor.sendMessage("§l§f주위 토지에 친구가 아닌 유저의 땅이 포함됩니다.");
                    break;
                }
            }
            if (data_around_area.village_name !== null) {
                const data_around_village_name = data_around_area.village_name;
                const data_around_village = nations_villages.get(data_around_village_name);
                valid_area = !data_around_village?.members.some(member => member.xuid === xuid); // 마을원 목록에 없으면 생성조건 취소
                if (!valid_area) {
                    actor.sendMessage("§l§f주위 토지에 속하지 않은 마을이 포함됩니다.");
                    break;
                }
            }
            if (data_around_area.country_name !== null) {
                const data_around_country_name = data_around_area.country_name;
                const data_around_country = nations_countrys.get(data_around_country_name);
                valid_area = !data_around_country?.members.some(member => member.xuid === xuid); //국가원에 속하지 않으면 생성조건 취소
                if (!valid_area) {
                    actor.sendMessage("§l§f주위 토지에 속하지 않은 국가가 포함됩니다.");
                    break;
                }
            }
        }

        //조건변경: 국가는 신경 x -> 국가는 마을 기준에서 가입
        let valid_village = false;
        for (let i = 0; i < 12; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (data_around_area === undefined) {
                continue;
            }
            if (data_player.belong_village !== null) {
                if (data_around_area.village_name === data_player.belong_village) {
                    valid_village = true;
                    break;
                }
            }
        }
        if (data_player.belong_village !== null) {
            if (valid_village === false) {
                valid_area = false;
                actor.sendMessage("§l§f토지가 속한 마을 내에 위치하지 않습니다");
            }
        }
        let valid_country = false;
        for (let i = 0; i < 12; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (data_around_area === undefined) {
                continue;
            }
            if (data_player.belong_country !== null) {
                if (data_around_area.country_name === data_player.belong_country) {
                    valid_country = true;
                    break;
                }
            }
        }
        if (data_player.belong_country !== null) {
            if (valid_country === false) {
                valid_area = false;
                actor.sendMessage("§l§f토지가 속한 국가 내에 위치하지 않습니다");
            }
        } //국가와 마을에 겹치게 지으면

        if (!valid_area) {
            actor.sendMessage("§l§c토지 기록에 실패하였습니다.");
            return;
        }

        const res = await Form.sendTo(ni, {
            type: "form",
            title: "",
            content: "새로운 기록을 작성합니다.",
            buttons: [
                {
                    text: `§l§a토지 ${purpose}`,
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                if (data_current_area === undefined) {
                    data_player.belong_region = `${name}`;
                    nations_players.set(data_player.owner.xuid, data_player);
                    const new_area_territory = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
                    nations_areas.set(new_area_territory.chunk.get_dxz_chunk_line(), new_area_territory);
                    const region_territory = new NationsRegion(player_name_xuid, chunk, [new_area_territory.chunk.get_dxz_chunk_line()], `${xuid}`, 64, 64, 64);
                    nations_regions.set(region_territory.region_name, region_territory);
                    actor.sendMessage(`§l§e새로운 토지를 개척했습니다.`);
                    return;
                }
                if (data_current_area?.village_name) {
                    for (let i = 0; i < 12; i++) {
                        const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
                        if (data_around_area === undefined) {
                            const new_area_territory = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
                            nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, new_area_territory);
                        } else {
                            if (data_around_area.village_name === null) {
                                data_around_area.village_name = data_player.belong_village;
                                nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, data_around_area);
                            }
                        }
                    }
                } //마을 확장
                if (data_current_area?.country_name) {
                    for (let i = -2; i <= 2; i++) {
                        for (let j = -2; j <= 2; j++) {
                            if (i == 0 && j == 0) continue;
                            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + i}_${chunk.chunk_z + j}`);
                            if (data_around_area === undefined) {
                                const new_area_territory = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
                                nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, new_area_territory);
                            } else {
                                if (data_around_area.country_name === null) {
                                    data_around_area.country_name = data_player.belong_country;
                                    nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, data_around_area);
                                }
                            }
                        }
                    }
                    dx = [-1, 0, 1, 3, 3, 3, 1, 0, -1, -3, -3, -3];
                    dz = [3, 3, 3, 1, 0, -1, -3, -3, -3, -1, 0, 1]; //추가적으로 확인할껏들
                    for (let i = 0; i < 12; i++) {
                        const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
                        if (data_around_area === undefined) {
                            const new_area_territory = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
                            nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, new_area_territory);
                        } else {
                            if (data_around_area.country_name === null) {
                                data_around_area.country_name = data_player.belong_country;
                                nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, data_around_area);
                            }
                        }
                    }
                } //국가 확장

                actor.sendMessage(`§l§e새로운 토지를 개척했습니다.`);
                return;
            case 1:
                actor.sendMessage("§l§c기록을 취소했습니다.");
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
    }
    static async exist_form(ni: NetworkIdentifier) {
        this.create_region(ni, "개척");
    }
}
