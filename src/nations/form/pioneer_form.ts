import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { nations_players, nations_areas, nations_regions, nations_villages } from "..";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "../territory_base";
import { bedrockServer } from "bdsx/launcher";
import { TerritoryArea } from "../territory_base";
import { nations_countrys } from "..";

export class Poineer {
    static async form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player: TerritoryPlayer = nations_players.get(xuid)!;
        const data_current_area = nations_areas.get(chunk.get_dxz_chunk_line());

        if (data_current_area !== undefined) {
            actor.sendMessage(`§l§c소유중인 토지입니다.`);
            return;
        }
        let valid_area = true;
        const dx = [0, 1, 2, 1, 0, -1, -2, -1, 0, 1, 0, -1];
        const dz = [2, 1, 0, -1, -2, -1, 0, 1, 1, 0, -1, 0]; //이 사이에만 조건에 만족하는게 없으면됌
        for (let i = 0; i < 12; i++) {
            const data_around_area = nations_areas.get(`${dimention_id}_${chunk.chunk_x + dx[i]}_${chunk.chunk_z + dz[i]}`);
            if (data_around_area === undefined) {
                continue;
            }
            if (data_around_area.region_name !== null) {
                /**
                 * 1. 친구가 아니면 valid_area false
                 */
                const data_around_region_name = data_around_area.region_name;
                const data_around_region = nations_regions.get(data_around_region_name);
                const data_around_region_player = nations_players.get(data_around_region?.owner.xuid!);
                const data_around_region_player_friends = data_around_region_player?.friends;
                valid_area = !data_around_region_player_friends!.some(friend => friend.xuid === xuid); //친구 목록에 없으면 생성조건 취소
                actor.sendMessage("§l§f주위 토지에 친구가 아닌 유저의 땅이 포함됩니다.");
                continue;
            }
            if (data_around_area.village_name !== null) {
                //마을원이 아니면 생성조건 취소
                const data_around_village_name = data_around_area.village_name;
                const data_around_village = nations_villages.get(data_around_village_name);
                valid_area = !data_around_village?.members.some(member => member.xuid === xuid); // 마을원 목록에 없으면 생성조건 취소
                actor.sendMessage("§l§f주위 토지에 속하지 않은 마을이 포함됩니다.");
                continue;
            }
            if (data_around_area.country_name !== null) {
                const data_around_country_name = data_around_area.country_name;
                const data_around_country = nations_countrys.get(data_around_country_name);
                valid_area = !data_around_country?.members.some(member => member.xuid === xuid); //국가원에 속하지 않으면 생성조건 취소
                actor.sendMessage("§l§f주위 토지에 속하지 않은 국가가 포함됩니다.");
                continue;
            }
        }
        //마을이 있으면 마을과 거리가 멀지 않게
        //국가가 있으면 국가와 거리가 멀지 않게 생성
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
                nations_areas.set(area_territory.chunk.get_dxz_chunk_line(), area_territory);
                const region_territory = new TerritoryRegion(player_name_xuid, chunk, [area_territory.chunk.get_dxz_chunk_line()], `${xuid}`, 64, 64, 64);
                nations_regions.set(region_territory.region_name, region_territory);
                data_player.belong_region = `${name}`;
                nations_players.set(data_player.owner.xuid, data_player);

                //마을 국가확장

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
