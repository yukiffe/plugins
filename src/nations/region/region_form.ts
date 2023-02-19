import { Vec3 } from "bdsx/bds/blockpos";
import { CustomForm, Form, FormButton, FormInput, SimpleForm } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { territory_areas, territory_players, territory_regions } from "..";
import { database, Maker, root } from "../../../utils/utils";
import { bedrockServer } from "bdsx/launcher";
import { Chunk, PlayerNameXuid, TerritoryArea, TerritoryPlayer } from "../territory_base";
import { command } from "bdsx/command";
import { PlayerCommandSelector } from "bdsx/bds/command";
import { input } from "blessed";

export class Region {
    static async form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l§f토지",
            content: "",
            buttons: [
                {
                    text: "§l§1토지 이동",
                },
                {
                    text: "§l§2토지 위치 확인",
                },
                {
                    text: "§l§5토지 확장",
                }, //여기서 설명
                // {
                //     text: "§l§3토지 공유",
                // }, //공유 or 해제 여기다 넣기
                {
                    text: "§l§4토지 삭제",
                }, // 경고사항 - 국가/마을 탈퇴, 예치금, 개연성 싹 다 사라짐
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
            // case 3: //공유
            //     await this.share(ni);
            //     return;
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

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const region_territory = territory_regions.get(region_territory_name)!;

        if (await this.check_cancel(ni, "§l§f토지 이동", "§l§7토지로 이동하시겠습니까?")) {
            actor.sendMessage("이동이 취소되었습니다.");
            return;
        }

        const [region_territory_dimention, region_territory_x, region_territory_y, region_territory_z] = region_territory.spawn_position.get_dxyz();
        actor.teleport(Vec3.create(region_territory_x, region_territory_y, region_territory_z), region_territory_dimention);
        actor.sendMessage(`§l§f${name}님의 토지로 이동했습니다.`);
    }

    static async view_area(chunk: Chunk) {
        const x = chunk.chunk_x * 8;
        const z = chunk.chunk_z * 8;
        for (let i = x; i < x + 8; i++) {
            for (let j = z; j < z + 8; j++) {
                if (i == x || i == x + 7 || j == z || j == z + 7) {
                    bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${chunk.y} ${j}`);
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

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const region_territory = territory_regions.get(region_territory_name)!;

        for (const area_territory_name of region_territory.area_territorys) {
            const area_territory = territory_areas.get(area_territory_name);
            this.view_area(area_territory?.chunk!);
        }
    }

    static async expand_and_collapse(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const data_region_territory = territory_regions.get(region_territory_name)!;

        // FORM
        //-1: 확장인지 축소인지 확인

        /**0. 땅 개수 확인
         * 1. 땅이 비어있는지 있는지 확인
         * 2. 땅 주위 내땅인지 확인
         * 3. 주위 플레이어 있는지 확인
         */
        if (data_region_territory.area_territorys.length >= 4) {
            actor.sendMessage("§l§fc땅의 최대 개수는 4개입니다.(임시)");
            actor.sendMessage("§l§f땅의 위치를 바꾸려면 땅 제거 후 다시 생성");
            return;
        }

        const current_area = territory_areas.get(chunk.get_dxz_chunk_line());
        if (current_area !== undefined) {
            actor.sendMessage("확장이 불가능한 땅입니다.");
            return;
        }

        let dx = [0, 0, 1, -1];
        let dz = [1, -1, 0, 0];
        let check: Boolean = false;
        for (let i = 0; i < 4; i++) {
            const around_area = territory_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (around_area === undefined) {
                continue;
            }
            if (around_area?.owner.xuid === xuid) {
                check = true;
            }
        }
        if (!check) {
            actor.sendMessage("주위에 자신의 땅과 맞닿아있어야합니다.");
            return;
        }

        dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        check = false;
        for (let i = 0; i < 12; i++) {
            const around_area = territory_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (around_area === undefined) {
                continue;
            }
            if (around_area?.owner.xuid !== xuid) {
                check = true;
            }
        }
        if (check) {
            actor.sendMessage("다른 유저와 너무 가까운곳으로 확장이 불가능합니다.");
            return;
        }

        const new_area_territory = new TerritoryArea(new PlayerNameXuid(name, xuid), chunk);

        territory_areas.set(chunk.get_dxz_chunk_line(), new_area_territory);
        data_region_territory.area_territorys.push(chunk.get_dxz_chunk_line());
        territory_regions.set(data_region_territory.region_name, data_region_territory);
        actor.sendMessage("땅을 확장했습니다.");
        return;
    }

    static async delete(ni: NetworkIdentifier): Promise<void> {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const region_territory_name = data_player_territory.belong_region!;
        const data_region_territory = territory_regions.get(region_territory_name)!;

        if (await this.check_cancel(ni, "토지 삭제", "주의: 복구불가")) return;
        for (const area_territory_name of data_region_territory.area_territorys) {
            territory_areas.delete(area_territory_name);
            database.unlink(root.DATABASE_TERRITORY_AREA, `${area_territory_name}.json`);
        }
        territory_regions.delete(region_territory_name);
        database.unlink(root.DATABASE_TERRITORY_REGION, `${region_territory_name}.json`);
        data_player_territory.belong_region = null;
        territory_players.set(data_player_territory.owner.xuid, data_player_territory);
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
