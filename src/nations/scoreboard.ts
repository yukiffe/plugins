import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { ServerPlayer } from "bdsx/bds/player";
import { Scoreboard } from "bdsx/bds/scoreboard";
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

        type ScoreLine = [string, number];
        let newline: ScoreLine = ["§l§7", 0];
        const scoreboard = {
            title: "§l§f정보창",
            lines: [newline],
        };
        scoreboard.lines.push([`§l§7좌표: ${chunk.get_dxyz_round_split(":")}`, 1]);
        if (area_territory === undefined) {
            scoreboard.lines.push(["§l§7미개척지", 2]);
        } else {
            if (area_territory.region_name !== null) {
                scoreboard.lines.push([`§l§8토지: ${area_territory?.region_name}`, 2]);
            }
            if (area_territory.village_name !== null) {
                scoreboard.lines.push([`§l§8마을: ${area_territory?.village_name}`, 2]);
            }
            if (area_territory.country_name !== null) {
                scoreboard.lines.push([`§l§8국가: ${area_territory?.country_name}`, 3]);
            }
        }
        player.setFakeScoreboard(scoreboard.title, scoreboard.lines);
    }
}, 1000);

events.serverClose.on(() => {
    clearInterval(intrval);
});
