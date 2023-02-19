import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import * as fs from "fs";
import { territory_areas } from ".";
import { Chunk } from "./territory_base";

const players = new Map<NetworkIdentifier, ServerPlayer>();

events.playerJoin.on(ev => {
    players.set(ev.player.getNetworkIdentifier(), ev.player);
});

events.playerLeft.on(ev => {
    players.delete(ev.player.getNetworkIdentifier());
});

const intrval = setInterval(() => {
    for (const [netId, player] of players.entries()) {
        const position = player.getPosition();
        const dimention_id = player.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);
        const area_territory = territory_areas.get(chunk.get_dxz_chunk_line());
        player.setFakeScoreboard("status", [
            ` `,
            `좌표: ${chunk.get_dxyz_round()}`,
            ` `,
            `토지: ${area_territory?.region_name}`,
            `마을: ${area_territory?.village_name}`,
            `국가: ${area_territory?.country_name}`,
            ` `,
        ]);
    }
}, 1000);

events.serverClose.on(() => {
    clearInterval(intrval);
});
