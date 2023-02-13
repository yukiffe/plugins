import { Vec3 } from "bdsx/bds/blockpos";
import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { territory_areas, territory_players } from "..";
import { chat, database, Maker, root } from "../../../utils/utils";
import { AreaTerritory, XuidPlayer } from "../region_base";
import { XZChunk } from "./../region_base";

export const map = new Map<string, boolean>(); //임시용
export class Region {
    static async main_menu(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const position = actor.getPosition();
        const xuid = actor.getXuid();
        const name = actor.getNameTag();

        const xuid_player = new XuidPlayer(name, xuid);
        const [x, z] = Maker.xz_process_chunk(position.x, position.z);
        const xz_split = Maker.xz_area_split(x, z);
        const xz_chunk = new XZChunk(x, z);
        const dimention = actor.getDimensionId();
        const area_territory = new AreaTerritory(xuid_player, xz_chunk, dimention);

        const data_area_territory = territory_areas.get(xz_split);
        // const data_region_territory = territory_regions.get(xz_chunk.xz_area_split());
        const data_player_territory = territory_players.get(xuid);

        const area = Maker.xz_area_split(x, z);

        const res = await Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "명령어 제작중, 땅건축은 내 땅 내에서만 건축가능하게\n(외부로부터 보호되는 영역만 건축할수있도록 도와줌\n한번더누르면해제 ",
            buttons: [
                {
                    text: "§l§e땅 정보",
                },
                {
                    text: "§l§f땅 이동",
                },
                {
                    text: "§l§f땅 초대",
                },
                {
                    text: "§l§f땅 확인",
                },
                {
                    text: "§l§c땅 삭제",
                },
                {
                    text: "§l§f땅 확장(추가예정기능)",
                },
            ],
        });
        switch (res) {
            case 0:
                if (data_area_territory === null || data_area_territory === undefined) {
                    actor.sendMessage(chat.mid(`주인이 없는 토지입니다.`));
                } else {
                    actor.sendMessage(chat.mid(`${data_area_territory?.player.name}님의 토지입니다.`));
                }
                return;
            case 1:
                if (await this.check_cancel(ni, "땅 이동")) return;
                if (data_area_territory === null || data_area_territory === undefined) {
                    actor.sendMessage(chat.mid(`가진 땅이 존재하지 않습니다.`));
                } else {
                    actor.teleport(data_player_territory?.region_territory?.spawn_position!); //Vec3으로 안만들어줘서 오류날수도있음
                    actor.sendMessage(chat.mid(`${data_player_territory?.player.name}님의 땅으로 이동했습니다.`));
                }
                return;
            case 3:
                /*
                0. 땅이 있는지 확인
                1. 지금위치에 주인 플레이어 받아오기
                2. 주인의 region 가져오기
                3. 내따잉 아니면 주인의 공유함 확인
                4. 공유함에 포함되어있으면 땅ok
                */
                if (data_player_territory === null || data_player_territory === undefined) {
                    actor.sendMessage(chat.mid(`가진 땅이 존재하지 않습니다.`));
                }
                return;
            case 4:
                if (await this.check_cancel(ni, "땅 삭제(주의 복구불가)")) return;
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
            case 5:
                actor.sendMessage(chat.mid("추가중인 기능입니다."));
                return;
            default:
                actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
        }
    }
    static async check_cancel(ni: NetworkIdentifier, command: string): Promise<boolean> {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: command,
            content: "명령어를 사용하시겠습니까?",
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
}
