import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { territory_players, territory_areas, territory_regions } from "..";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "../territory_base";
import { bedrockServer } from "bdsx/launcher";
import { TerritoryArea } from "../territory_base";

export class Poineer {
    static async form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const area_territory = territory_areas.get(chunk.get_dxz_chunk_line());

        if (area_territory !== undefined) {
            actor.sendMessage(`§l§c소유중인 토지입니다.`);
            return;
        }
        //추가예정
        /**1. 아래 외에 마을/국가 범위 확인 */

        const dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        const dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0];
        let check = false;
        for (let i = 0; i < 12; i++) {
            const around_area = territory_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (around_area === undefined) {
                continue;
            }
            if (around_area?.region_name !== xuid) {
                check = true;
            }
        }
        if (check) {
            actor.sendMessage("다른 유저와 너무 가까운곳으로 확장이 불가능합니다.");
            return;
        }

        // const area_territory_player_name = "§l§f";
        const res = await Form.sendTo(ni, {
            type: "form",
            // title: `§l§l${area_territory_player_name}`,
            title: "",
            content: "새로운 기록을 작성합니다.",
            buttons: [
                {
                    text: "§l§a토지 개척",
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        switch (res) {
            case 0:
                const area_territory = new TerritoryArea(chunk, xuid, null, null);
                territory_areas.set(area_territory.chunk.get_dxz_chunk_line(), area_territory);
                const region_territory = new TerritoryRegion(player_name_xuid, chunk, [area_territory.chunk.get_dxz_chunk_line()], `${xuid}`);
                territory_regions.set(region_territory.region_name, region_territory);
                data_player_territory.belong_region = `${name}`;

                actor.sendMessage(`§l§e새로운 토지를 개척했습니다.`);
                return;
            case 1:
                actor.sendMessage("§l§c기록을 취소했습니다.");
                return;
            default:
                actor.sendMessage("§l§c명령어가 취소되었습니다.");
        }
    }
}
