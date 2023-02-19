import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { territory_areas, territory_players } from "..";
import { Chunk, PlayerNameXuid, TerritoryPlayer } from "../territory_base";

export class Poineer {
    static async exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;

        const data_area_territory_player_name = `§l§f주인이 있는 토지입니다.`;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: `§l§f${data_area_territory_player_name}`,
            content: ``,
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
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
        return;
    }
    static async not_exist_form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;

        const data_area_territory_player_name = `§l§f주인이 있는 토지입니다.`;
        const res = await Form.sendTo(ni, {
            type: "form",
            title: `§l§f${data_area_territory_player_name}`,
            content: ``,
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
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
        return;
    }
}
