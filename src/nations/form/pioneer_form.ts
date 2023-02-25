import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { nations_players, nations_areas, nations_regions, nations_villages } from "..";
import { bedrockServer } from "bdsx/launcher";
import { NationsArea, NationsPlayer, NationsRegion } from "../nations_base";
import { nations_countrys } from "..";
import { Chunk, PlayerNameXuid } from "../../../utils/utils";

export class Poineer {
    static async create_region(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();

        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line());

        if (data_player.belong_region) {
            actor.sendMessage("§l§c토지가 이미 존재합니다.");
            actor.sendMessage("§l§e/토지");
            return;
        }

        //주위 토지 확인
        let region_dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        let region_dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        // let country_dx = [-1, 0, 1, -2, -1, 0, 1, 2, -3, -2, -1, 0, 1, 2, 3, -3, -2, -1, 1, 2, 3, -3, -2, -1, 0, 1, 2, 3, -2, -1, 0, 1, 2, -1, 0, 1];
        // let country_dz = [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -2, -2, -2, -2, -2, -3, -3, -3];
        for (let i = 0; i < 12; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + region_dx[i]}_${chunk.chunk_z + region_dz[i]}`);
            if (data_around_area === undefined) {
                continue;
            }
            if (data_around_area.region_name) {
                const data_around_region_name = data_around_area.region_name;
                const data_around_region = nations_regions.get(data_around_region_name);
                const data_around_region_player = nations_players.get(data_around_region?.owner.xuid!);
                const data_around_region_player_friends = data_around_region_player?.friends;
                if (data_around_region_player_friends!.some(friend => friend.xuid === xuid)) {
                    actor.sendMessage("§l§f주위 토지에 친구가 아닌 유저의 땅이 포함됩니다.");
                    return;
                }
            }
            // if (data_around_area.village_name) {
            //     const data_around_village_name = data_around_area.village_name;
            //     const data_around_village = nations_villages.get(data_around_village_name);
            //     if (data_around_village?.members.some(member => member.xuid === xuid)) {
            //         actor.sendMessage("§l§f주위 토지에 속하지 않은 마을이 포함됩니다.");
            //         return;
            //     }
            // }
            // if (data_around_area.country_name) {
            //     const data_around_country_name = data_around_area.country_name;
            //     const data_around_country = nations_countrys.get(data_around_country_name);
            //     if (data_around_country?.members.some(member => member.xuid === xuid)) {
            //         actor.sendMessage("§l§f주위 토지에 속하지 않은 국가가 포함됩니다.");
            //         return;
            //     }
            // }
        }
        ///주위토지확인

        // if (data_player.belong_village) {
        //     let is_village = false;
        //     for (let i = 0; i < 12; i++) {
        //         const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + region_dx[i]}_${chunk.chunk_z + region_dz[i]}`);
        //         if (data_around_area === undefined) {
        //             continue;
        //         }
        //         if (data_player.belong_village !== null) {
        //             if (data_around_area.village_name === data_player.belong_village) {
        //                 is_village = true;
        //                 break;
        //             }
        //         }
        //     }
        //     if (!is_village) {
        //         actor.sendMessage("§l§f토지가 마을 주위에 위치하지 않습니다");
        //         return;
        //     }
        // }

        // if (data_player.belong_country) {
        //     let is_country = false;
        //     for (let i = 0; i < 36; i++) {
        //         const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + country_dx[i]}_${chunk.chunk_z + country_dz[i]}`);
        //         if (data_around_area === undefined) {
        //             continue;
        //         }
        //         if (data_player.belong_country !== null) {
        //             if (data_around_area.country_name === data_player.belong_country) {
        //                 is_country = true;
        //                 break;
        //             }
        //         }
        //     }
        //     if (!is_country) {
        //         actor.sendMessage("§l§f토지가 마을 주위에 위치하지 않습니다");
        //         return;
        //     }
        // }
        ///포함토지확인

        /////////////////////////////////////////////////////////////////////////////////체크단계

        data_player.belong_region = xuid;
        const new_region = new NationsRegion(
            player_name_xuid,
            chunk,
            [chunk.get_dxz_chunk_line()],
            data_player.belong_region,
            data_player.belong_village,
            data_player.belong_country,
            1000,
            1000,
            0,
        );
        nations_regions.set(new_region.region_name, new_region);
        if (data_current_area) {
            data_current_area.region_name = xuid;
            // if (data_player.belong_village) {
            //     data_current_area.village_name = data_player.belong_village;
            //     const data_current_village_name = data_player.belong_village;
            //     const data_current_village = nations_villages.get(data_current_village_name)!;
            //     data_current_village.region_nations.push(data_player.belong_region);
            //     nations_villages.set(data_current_village_name, data_current_village);
            // }
            // if (data_player.belong_country) {
            //     data_current_area.country_name = data_player.belong_country;
            // }
            nations_areas.set(chunk.get_dxz_chunk_line(), data_current_area);
        } else {
            const new_area = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
            nations_areas.set(new_area.chunk.get_dxz_chunk_line(), new_area);
        }
        nations_players.set(data_player.owner.xuid, data_player);
        actor.sendMessage("새로운 토지를 개척하였습니다.");
        //토지생성 및 정보 변경

        // if (data_player.belong_village) {
        //     for (let i = 0; i < 12; i++) {
        //         const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + region_dx[i]}_${chunk.chunk_z + region_dz[i]}`);
        //         if (data_around_area) {
        //             data_around_area.village_name = data_player.belong_village;
        //             nations_areas.set(`${dimention_id}_${chunk.chunk_x + region_dx[i]}_${chunk.chunk_z + region_dz[i]}`, data_around_area);
        //         } else {
        //             const new_area = new NationsArea(chunk, null, data_player.belong_village, null);
        //             nations_areas.set(`${dimention_id}_${chunk.chunk_x + region_dx[i]}_${chunk.chunk_z + region_dz[i]}`, new_area);
        //         }
        //     }
        // }
        //마을 확장

        // if (data_player.belong_country) {
        //     for (let i = 0; i < 36; i++) {
        //         const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + country_dx[i]}_${chunk.chunk_z + country_dz[i]}`);
        //         if (data_around_area) {
        //             if (data_around_area.country_name) {
        //             } else {
        //                 if (data_around_area.village_name) {
        //                     const data_player_country_name = data_player.belong_country;
        //                     const data_player_country = nations_countrys.get(data_player_country_name)!;
        //                     if (data_player_country.village_nations.some(village_nation => village_nation === data_around_area.village_name)) {
        //                         data_around_area.country_name = data_player.belong_country;
        //                     }
        //                 } else {
        //                 }
        //             }
        //         } else {
        //         }
        //     }
        // }
        //국가 확장
        //먼가 삐리하지만 그냥 이정도만하자..
    }
}
