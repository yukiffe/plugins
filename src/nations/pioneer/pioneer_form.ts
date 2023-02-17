import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { bool_t } from "bdsx/nativetype";
import * as fs from "fs";
import { territory_players, territory_areas, territory_regions } from "..";
import { database, Maker, root } from "../../../utils/utils";
import { Region } from "../region/region_form";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "../territory_base";
import { bedrockServer } from "bdsx/launcher";
import { TerritoryArea } from "./../territory_base";

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

let y;

export function view_area(chunk: Chunk) {
    const x = chunk.chunk_x * 8;
    const z = chunk.chunk_z * 8;
    for (let i = x; i < x + 8; i++) {
        for (let j = z; j < z + 8; j++) {
            bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${y} ${j}`);
        }
    }
}

export function view_around(chunk: Chunk) {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (territory_areas.has(chunk.get_dxz_chunk_line())) {
                view_area(new Chunk(i, j, chunk.dimention_id));
            }
        }
    }
}

export function is_current_area(chunk: Chunk): boolean {
    if (territory_areas.has(chunk.get_dxz_chunk_line())) {
        return true;
    }
    return false;
}
export function is_around_area(chunk: Chunk): boolean {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (territory_areas.has(chunk.get_dxz_chunk_line())) {
                //내 그룹이면 flase
                return true;
            }
        }
    }
    return false;
}

export class Poineer {
    static async form(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;

        if (is_current_area(chunk)) {
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
                    actor.sendMessage(`§l§g${territory_areas.get(chunk.get_dxz_chunk_line())!.owner.name}님의 토지입니다.`);
                    return;
                default:
                    actor.sendMessage("§l§c명령어가 취소되었습니다.");
            }
            return;
        }

        if (is_around_area(chunk)) {
            actor.sendMessage("§l§c타인의 토지와 너무 가까워 개척할 수 없습니다.");
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
                const area_territory = new TerritoryArea(player_name_xuid, chunk);
                territory_areas.set(area_territory.chunk.get_dxz_chunk_line(), area_territory);
                const region_territory = new TerritoryRegion(player_name_xuid, chunk, [area_territory.chunk.get_dxz_chunk_line()], `${name}_region`);
                territory_regions.set(region_territory.region_name, region_territory);
                data_player_territory.belong_region = `${name}_region`;

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
