import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { ServerPlayer } from "bdsx/bds/player";
import { Scoreboard } from "bdsx/bds/scoreboard";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import * as fs from "fs";
import { nations_areas, nations_players } from ".";
import { bedrockServer } from "bdsx/launcher";
import { Chunk } from "../../utils/utils";

const players = new Map<NetworkIdentifier, ServerPlayer>();

events.playerJoin.on(ev => {
    players.set(ev.player.getNetworkIdentifier(), ev.player);
});

events.playerLeft.on(ev => {
    players.delete(ev.player.getNetworkIdentifier());
});

const intrval = setInterval(() => {
    for (const player of bedrockServer.serverInstance.getPlayers()) {
        const position = player.getPosition();
        const dimention_id = player.getDimensionId();
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);
        const area_territory = nations_areas.get(chunk.get_dxz_chunk_line());

        const xuid = player.getXuid();
        const data_player = nations_players.get(xuid);

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
                scoreboard.lines.push([`§l§8토지: ${nations_players.get(area_territory.region_name!)?.owner.name}`, 1]);
            } else {
                scoreboard.lines.push([`§l§8토지: 미소유`, 1]);
            }
            if (area_territory.village_name !== null) {
                scoreboard.lines.push([`§l§8마을: ${area_territory?.village_name}`, 2]);
            } else {
                scoreboard.lines.push([`§l§8마을: 미등록`, 2]);
            }
            if (area_territory.country_name !== null) {
                scoreboard.lines.push([`§l§8국가: ${area_territory?.country_name}`, 3]);
            } else {
                scoreboard.lines.push([`§l§8국가: 미등록`, 3]);
            }
        }
        scoreboard.lines.push([`§l§f소지금: ${data_player?.deposit}`, 4]);
        scoreboard.lines.push([`§l§f개연성: ${Math.round(data_player?.probability! * 100) / 100}`, 5]);
        scoreboard.lines.push([`§l§f동화율: ${Math.round(data_player?.assimilate! * 100) / 100}`, 6]);
        player.setFakeScoreboard(scoreboard.title, scoreboard.lines);
    }
}, 1000);

events.serverClose.on(() => {
    clearInterval(intrval);
});
