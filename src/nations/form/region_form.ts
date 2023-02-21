import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { CustomForm, Form, FormButton, FormInput, SimpleForm } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { nations_areas, nations_countrys, nations_players, nations_regions, nations_villages } from "..";
import { database, root } from "../../../utils/utils";
import { bedrockServer } from "bdsx/launcher";
import { Chunk, PlayerNameXuid, NationsArea, NationsPlayer } from "../nations_base";
import { command } from "bdsx/command";
import { PlayerCommandSelector } from "bdsx/bds/command";
import { input } from "blessed";
import { Poineer } from "./pioneer_form";
import { BlockSource } from "bdsx/bds/block";

export class Region {
    static async exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l§f토지",
            content: "",
            buttons: [
                // {
                //     text: "정보",
                // },
                {
                    text: "§l§1토지 이동",
                },
                {
                    text: "§l§2토지 위치 확인",
                },
                {
                    text: "§l§5토지 확장", //축소 추가
                }, //여기서 설명
                {
                    text: "§l§f토지 예치금 납부",
                },
                {
                    text: "§l§4토지 삭제",
                }, // 경고사항 - 국가/마을 탈퇴, 예치금, 개연성 싹 다 사라`짐
                {
                    text: "§l§6토지 설정", //스폰포인트변경, 블럭파괴,설치허용/비허용
                },
            ],
        });
        switch (res) {
            case 0: //이동
                await this.move(ni);
                return;
            case 1: //내 토지 확인
                await this.view(ni);
                return;
            case 2: //확장, 축소
                await this.expand_and_collapse(ni);
                return;
            case 3:
                await this.payment(ni);
                return;
            case 3: //삭제
                await this.delete(ni);
                return;
            case 4:
                actor.sendMessage("추가중인 기능입니다.");
                return;
            default:
                actor.sendMessage("§c명령어가 취소되었습니다.");
                return;
        }
    }
    static async not_exist_form(ni: NetworkIdentifier) {
        throw new Error("Method not implemented.");
    }
    static async form(ni: NetworkIdentifier) {}
    static async payment(ni: NetworkIdentifier) {
        throw new Error("Method not implemented.");
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

    static async move(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const region_territory = nations_regions.get(region_territory_name)!;

        if (await this.check_cancel(ni, "§l§f토지 이동", "§l§7토지로 이동하시겠습니까?")) {
            actor.sendMessage("이동이 취소되었습니다.");
            return;
        }

        const [region_territory_dimention, region_territory_x, region_territory_y, region_territory_z] = region_territory.spawn_position.get_dxyz();
        actor.teleport(Vec3.create(region_territory_x, region_territory_y, region_territory_z), region_territory_dimention);
        actor.sendMessage(`§l§f${name}님의 토지로 이동했습니다.`);
    }

    static async view_area(chunk: Chunk, block_source: BlockSource, y: number) {
        const x = chunk.chunk_x * 8;
        const z = chunk.chunk_z * 8;
        for (let i = x; i < x + 8; i++) {
            for (let j = z; j < z + 8; j++) {
                if (i == x || i == x + 7 || j == z || j == z + 7) {
                    let _y = y;
                    for (; y + 3 > _y; _y++) {
                        const block_pos = BlockPos.create(i, _y, j);
                        const item_name = block_source.getBlock(block_pos).getDescriptionId();
                        if (item_name === "tile:air") break;
                    }
                    bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${_y} ${j}`);
                }
            }
        }
    }

    static async view(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);
        const block_source = actor.getDimensionBlockSource();

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const region_territory = nations_regions.get(region_territory_name)!;

        for (const area_territory_name of region_territory.area_territorys) {
            const area_territory = nations_areas.get(area_territory_name);
            this.view_area(area_territory?.chunk!, block_source, position.y);
        }
    }

    static async expand_and_collapse(ni: NetworkIdentifier): Promise<void> {
        Poineer.create_region(ni, "확장");
    }

    static async delete(ni: NetworkIdentifier): Promise<void> {
        // const actor = ni.getActor()!;
        // const xuid = actor.getXuid();
        // const name = actor.getNameTag();
        // const player_name_xuid = new PlayerNameXuid(name, xuid);
        // const position = actor.getPosition();
        // const dimention_id = actor.getDimensionId();
        // const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        // const data_player: NationsPlayer = nations_players.get(xuid)!;
        // const data_player_region_name = data_player.belong_region!;
        // const data_player_region = nations_regions.get(data_player_region_name)!;

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
        ni.getActor()!.sendMessage("일시적 제거 기능");

        return;
    }
}

// PlayerCommandSelector;
// static async share(ni: NetworkIdentifier): Promise<void> {
//     const actor = ni.getActor()!;
//     const xuid = actor.getXuid();
//     const name = actor.getNameTag();
//     const player_name_xuid = new PlayerNameXuid(name, xuid);
//     const position = actor.getPosition();
//     const dimention_id = actor.getDimensionId();
//     const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

//     const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
//     const region_territory_name = data_player_territory.belong_region!;
//     const data_region_territory = territory_regions.get(region_territory_name)!;

//     const owner_player = territory_players.get(xuid)!;
//     const input_form = new CustomForm("§l§f공유", [new FormInput("§l§7플레이어의 아이디를 적어주세요", "")]);
//     input_form.sendTo(ni, (form, target) => {
//         const playerMap = bedrockServer.serverInstance.getPlayers();
//         playerMap.forEach(player => {
//             if ("" + form.response === player.getNameTag()) {
//                 const invite_xuid_player = new PlayerNameXuid(player.getNameTag(), player.getXuid());
//                 if (owner_player!.players.find(item => item.xuid === player.getXuid())) {
//                     actor.sendMessage("§l§f이미 토지를 공유중인 플레이어입니다.");
//                     return;
//                 }
//                 owner_player?.players.push(invite_xuid_player);
//                 territory_players.set(xuid, owner_player);
//                 actor.sendMessage("§l§f토지 공유 성공");
//                 return;
//             }
//         });
//         actor.sendMessage("§l§f토지 공유 실패");
//     });
//     actor.sendMessage("스폰포인트 변경 실패: 자신의 땅 위에서 정해주세요");
//     return;
// }
