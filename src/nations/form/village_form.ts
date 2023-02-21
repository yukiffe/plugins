import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { nations_areas, nations_players, nations_regions } from "..";
import { Chunk, NationsPlayer, NationsVillage, PlayerNameXuid } from "../territory_base";
../nations_base
export class Village {
    static async not_exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: `§l§f$title`,
            content: ``,
            buttons: [
                // {
                //     text: "§l§e마을 정보",
                // }, //정본느 전부 sidebar로 집어넣기
                {
                    text: "§l§e마을 선언",
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                await this.create_village(ni);
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
        return;
    }
    static async exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: `§l§f$title`,
            content: ``,
            buttons: [
                // {
                //     text: "§l§e마을 정보",
                // },
                // {
                //     text: "마을 삭제",
                // },
                // {
                //     text: "마을 범위 확인",
                // },
                // {
                //     text: "마을 초대",
                // },
                // {
                //     text: "마을 추방",
                // },
                // {
                //     text: "마을 설정", //마을 이름 변경 등
                // },
                {
                    text: "§l§c취소",
                },
            ],
        });
        // switch (res) {
        //     case 0:
        //         return;
        //     default:
        //         actor.sendMessage("§l§c명령어가 취소되었습니다.");
        // }
        return;
    }
    static async create_village(ni: NetworkIdentifier) {
        //마을 없고 
        //내 땅이 없으면 return
        //1. 권한 확인
        //2. 마을 생성->village추가+내땅업뎃+땅범위변경
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: NationsPlayer = nations_players.get(xuid)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line());
        const data_player_region_name = data_player.belong_region;
        if(data_player_region_name===null){
            actor.sendMessage("땅이 있는 유저만 선언이 가능합니다");
            return;
        }
        const data_player_region = nations_regions.get(data_player_region_name);
        

        //내땅이고, 마을없고, 국가없으면
        const data_village = new NationsVillage(player_name_xuid, [player_name_xuid], chunk, [data_player_region], xuid, 0, 0, 0);
        nations_villages.set(data_village.village_name, data_village);

    }
}
