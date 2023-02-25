import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { CustomForm, Form, FormButton, FormInput, SimpleForm } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { nations_areas, nations_countrys, nations_players, nations_regions, nations_villages } from "..";
import { Chunk, database, PlayerNameXuid, root } from "../../../utils/utils";
import { bedrockServer } from "bdsx/launcher";
import { command } from "bdsx/command";
import { PlayerCommandSelector } from "bdsx/bds/command";
import { input } from "blessed";
import { Poineer } from "./pioneer_form";
import { BlockSource } from "bdsx/bds/block";
import { FormUtils } from "./utils_form";
import { NationsArea, NationsPlayer, NationsRegion } from "../nations_base";
import { int32_t } from "bdsx/nativetype";

export class Region {
    static async info(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line());
        actor.sendMessage(`§l§e토지 정보`);
        actor.sendMessage(`§l§g위치: [${data_current_area?.chunk.get_dxyz_round_split(", ")}]`);
        actor.sendMessage(`§l§g청크: [${data_current_area?.chunk.get_dxyz_chunk_split(", ")}]`);
        actor.sendMessage(`§l§g토지: [${data_current_area?.region_name}]`);
        actor.sendMessage(`§l§g마을: [${data_current_area?.village_name}]`);
        actor.sendMessage(`§l§g국가: [${data_current_area?.country_name}]`);
    }

    static async move(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_player_region_name = data_player.belong_region!;
        const data_player_region = nations_regions.get(data_player_region_name)!;

        if (await FormUtils.form_cancel(ni, "§l§a토지 이동", "§l§g사용자의 토지로 이동합니다.")) {
            actor.sendMessage("§l§c이동이 취소되었습니다.");
            return;
        } //나중에 모든 친구들에 대해 토지 이동 변경

        const [dimention, x, y, z] = data_player_region.chunk.get_dxyz();
        actor.teleport(Vec3.create(x, y, z), dimention);
        actor.sendMessage(`§l§b${name}님의 토지로 이동했습니다.`);
    }

    static async view_area(chunk: Chunk, y: number, block_source: BlockSource) {
        const x = chunk.chunk_x * 8;
        const z = chunk.chunk_z * 8;
        for (let i = x; i < x + 8; i++) {
            for (let j = z; j < z + 8; j++) {
                if (i == x || i == x + 7 || j == z || j == z + 7) {
                    let _y = y;
                    for (; y + 3 > _y; _y++) {
                        const block_pos = BlockPos.create(i, _y, j);
                        const item_name = block_source.getBlock(block_pos).getDescriptionId();
                        if (item_name === "tile.air") break;
                    }
                    bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${_y} ${j}`);
                }
            }
        }
    }

    static async view(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const position = actor.getPosition();
        const block_source = actor.getDimensionBlockSource();

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const region_territory = nations_regions.get(region_territory_name)!;

        for (const area_territory_name of region_territory.area_nations) {
            const area_territory = nations_areas.get(area_territory_name);
            this.view_area(area_territory?.chunk!, position.y - 1, block_source);
        }
    }

    static async expand(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();

        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line());

        if (await FormUtils.form_cancel(ni, "§l§e토지 확장", "§l§g현재 위치로 토지를 확장합니다.")) {
            actor.sendMessage("§l§c확장이 취소되었습니다.");
            return;
        } //나중에 모든 친구들에 대해 토지 이동 변경

        //가격은 토지개수*동화율
        const data_region = nations_regions.get(data_player.belong_region!)!;
        const price = data_region?.area_nations.length! * 10;
        if (data_player.assimilate < price) {
            actor.sendMessage("§l§c동화율이 부족합니다.(토지개수*10)");
            return;
        }

        //현재 토지 확인
        if (data_current_area) {
            if (data_current_area.region_name) {
                actor.sendMessage("§l§c확장이 불가능한 토지입니다");
                return;
            }
        }

        //연결 토지 확인
        const attach_dx = [1, 0, -1, 0];
        const attach_dz = [0, 1, 0, -1];
        let valid_extend = false;
        for (let i = 0; i < 4; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + attach_dx[i]}_${chunk.chunk_z + attach_dz[i]}`)!;
            if (data_around_area) {
                if (data_around_area.region_name === data_player.belong_region) {
                    valid_extend = true;
                }
            }
        }
        if (!valid_extend) {
            actor.sendMessage("§l§c토지가 연결되어있지 않습니다");
            return;
        }

        //주위 토지 확인

        const region_dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        const region_dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        for (let i = 0; i < 12; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + region_dx[i]}_${chunk.chunk_z + region_dz[i]}`);
            if (data_around_area === undefined) {
                continue;
            }
            if (data_around_area.region_name === data_player.belong_region) {
                continue;
            } else if (data_around_area.region_name) {
                const data_around_region_name = data_around_area.region_name;
                const data_around_region = nations_regions.get(data_around_region_name);
                const data_around_region_player = nations_players.get(data_around_region?.owner.xuid!);
                const data_around_region_player_friends = data_around_region_player?.friends;
                if (data_around_region_player_friends!.some(friend => friend.xuid === xuid)) {
                    actor.sendMessage("§l§c주위 토지에 친구가 아닌 유저의 땅이 포함됩니다.");
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
        // const country_dx = [-1, 0, 1, -2, -1, 0, 1, 2, -3, -2, -1, 0, 1, 2, 3, -3, -2, -1, 1, 2, 3, -3, -2, -1, 0, 1, 2, 3, -2, -1, 0, 1, 2, -1, 0, 1];
        // const country_dz = [3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -2, -2, -2, -2, -2, -3, -3, -3];
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

        if (data_current_area) {
            data_current_area.region_name = data_player.belong_region;
            // if (data_player.belong_village) {
            //     data_current_area.village_name = data_player.belong_village;
            //     const data_current_village_name = data_player.belong_village;
            //     const data_current_village = nations_villages.get(data_current_village_name)!;
            //     data_current_village.region_nations.push(data_player.belong_region!);
            //     nations_villages.set(data_current_village_name, data_current_village);
            // }
            // if (data_player.belong_country) {
            //     data_current_area.country_name = data_player.belong_country;
            // }
            data_region?.area_nations.push(data_current_area.chunk.get_dxz_chunk_line());
            nations_areas.set(chunk.get_dxz_chunk_line(), data_current_area);
        } else {
            const new_area = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
            data_region?.area_nations.push(new_area.chunk.get_dxz_chunk_line());
            nations_areas.set(new_area.chunk.get_dxz_chunk_line(), new_area);
        }
        data_player.assimilate -= price;
        nations_regions.set(data_region.region_name, data_region);
        nations_players.set(data_player.owner.xuid, data_player);
        actor.sendMessage("§l§e새로운 토지를 개척하였습니다.");
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
        // //마을 확장

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

    static async reduction(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();

        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;

        if (await FormUtils.form_cancel(ni, "§l§e토지 축소", "§l§g마지막으로 확장한 순서로 축소됩니다.\n주의: 사용한 동화율을 돌려받을 수 없습니다.")) {
            actor.sendMessage("§l§c토지 축소를 취소하였습니다.");
            return;
        } //나중에 모든 친구들에 대해 토지 이동 변경

        const data_region_name = data_player.belong_region!;
        const data_region = nations_regions.get(data_region_name);
        if (data_region?.area_nations.length! > 1) {
            const data_pop_area = data_region?.area_nations.pop();
        } else {
            actor.sendMessage("§l§c땅의 최소 개수는 1개입니다");
        }
        //일단 땅만 삭제해두고 나중에 마을/국가 축소 구현
    }

    static probability_pay(ni: NetworkIdentifier, money: int32_t) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();

        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_region_name = data_player.belong_region!;
        const data_region = nations_regions.get(data_region_name)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line())!;

        if (data_player.probability < money) {
            actor.sendMessage("§l§c보유한 개연성이 부족합니다");
            return;
        }

        data_region.probability += money;
        data_player.probability -= money;
        nations_regions.set(data_region_name, data_region);
        nations_players.set(data_player.owner.xuid, data_player);
        actor.sendMessage("§l§b개연성을 납부하였습니다.");
        return;
    }
    static async set_move(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();

        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        if (await FormUtils.form_cancel(ni, "§l§e스폰포인트 변경", "§l§g현재 위치로 스폰포인트를 지정합니다.")) {
            actor.sendMessage("§l§c스폰포인트 변경을 취소하였습니다.");
            return;
        } //나중에 모든 친구들에 대해 토지 이동 변경

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_region_name = data_player.belong_region!;
        const data_region = nations_regions.get(data_region_name)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line())!;

        if (data_current_area.region_name === data_region?.region_name) {
            data_region.chunk = chunk;
            nations_regions.set(data_region.region_name, data_region);
            actor.sendMessage("§l§b스폰포인트가 변경되었습니다.");
            return;
        } else {
            actor.sendMessage("§l§c자신의 토지 위에서만 스폰포인트 설정이 가능합니다");
            return;
        }
    }
    static async delete(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_player_region_name = data_player.belong_region!;
        const data_player_region = nations_regions.get(data_player_region_name)!;
        //area제거 region제거 player-region제거

        if (await FormUtils.form_cancel(ni, "§l§c토지 삭제", "§l§4주의) 복구불가")) {
            actor.sendMessage("§l§a토지 삭제를 취소하였습니다.");
            return;
        } //나중에 모든 친구들에 대해 토지 이동 변경

        data_player.belong_region = null;
        for (const delete_area of data_player_region.area_nations) {
            nations_areas.delete(delete_area);
        }
        nations_regions.delete(data_player_region_name);
        nations_players.set(data_player.owner.xuid, data_player);
        actor.sendMessage("§l§c토지를 삭제하였습니다");
        return;

        // //3번 제거(국가 마을 토지 순서)
        // if (await this.check_cancel(ni, "토지 삭제", "주의: 복구불가")) return;

        // if (data_player.belong_country!==null) {//국가가 있을때 주위 토지 삭제
        //     //토지 기준 주위에 이사람 말고 딴사람 있는지도 확인
        //     //->토지 생성 함수로 또 나눠야함
        //     for (let i = -2; i <= 2; i++) {
        //         for (let j = -2; j <= 2; j++) {
        //             if (i == 0 && j == 0) continue;
        //             const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + i}_${chunk.chunk_z + j}`);
        //             if (data_around_area === undefined) {
        //                 const new_area_territory = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
        //                 nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, new_area_territory);
        //             } else {
        //                 if (data_around_area.country_name === null) {
        //                     data_around_area.country_name = data_player.belong_country;
        //                     nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, data_around_area);
        //                 }
        //             }
        //         }
        //     }
        //     const dx = [-1, 0, 1, 3, 3, 3, 1, 0, -1, -3, -3, -3];
        //     const dz = [3, 3, 3, 1, 0, -1, -3, -3, -3, -1, 0, 1]; //추가적으로 확인할껏들
        //     for (let i = 0; i < 12; i++) {
        //         const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
        //         if (data_around_area === undefined) {
        //             const new_area_territory = new NationsArea(chunk, data_player.belong_region, data_player.belong_village, data_player.belong_country);
        //             nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, new_area_territory);
        //         } else {
        //             if (data_around_area.country_name === null) {
        //                 data_around_area.country_name = data_player.belong_country;
        //                 nations_areas.set(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`, data_around_area);
        //             }
        //         }
        //     }
        // } //국가 확장

        // for (const area_territory_name of data_region_territory.area_territorys) {
        //     nations_areas.delete(area_territory_name); //이거안됌, 좀 더 유연하게
        //     database.unlink(root.DATABASE_NATIONS_AREA, `${area_territory_name}.json`);
        // } //모든 토지 제거

        // nations_regions.delete(region_territory_name);
        // database.unlink(root.DATABASE_NATIONS_REGION, `${region_territory_name}.json`);
        // data_player_territory.belong_region = null;
        // nations_players.set(data_player_territory.owner.xuid, data_player_territory);
        // //토지그룹,
    }
}
