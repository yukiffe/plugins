import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { AreaTerritory, PlayerTerritory, XuidPlayer } from "./region_base";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { database, Maker, root } from "../../utils/utils";
import { territory_areas, territory_players } from ".";

territory_areas;
territory_players;

events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    if (database.exist_file(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`)) {
        const data_class: PlayerTerritory = database.load(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`);
        territory_players.set(`${xuid}`, data_class);
    } else {
        territory_players.set(`${xuid}`, new PlayerTerritory(new XuidPlayer(name, xuid), [new XuidPlayer(name, xuid)], null));
    }
});
events.playerLeft.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();
    database.upload(root.DATABASE_TERRITORY_PLAYERS, `${xuid}.json`, territory_players.get(xuid));
    territory_players.delete(xuid);
});
events.serverClose.on(() => {
    territory_areas.forEach((value: any, key: any) => {
        database.upload(root.DATABASE_TERRITORY_AREA, `${key}.json`, value);
    });
    territory_players.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_TERRITORY_PLAYERS, `${key}.json`, value);
    });
});

events.chestOpen.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const block_position = ev.blockPos;
    const [x, z] = Maker.xz_process_chunk(block_position);
    const xz_split = Maker.xz_area_split(x, z);

    const area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);
    if (area_territory === undefined) return; //주인없으면

    if (player.getXuid() === area_territory.player.xuid) {
        return; //주인이면
    }
    const owner_player_territory: PlayerTerritory = territory_players.get(area_territory?.player.xuid)!;
    if (owner_player_territory.players.find(item => item.xuid === player.getXuid())) {
        return; //땅주의 구성원이면
    }

    player.getNetworkIdentifier().getActor()?.sendMessage(`${area_territory}§l§4님의 토지에 대한 권한이 없습니다.`);
    return CANCEL; //남땅이면 CANCEL
});

events.blockDestroy.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const block_position = ev.blockPos;
    const [x, z] = Maker.xz_process_chunk(block_position);
    const xz_split = Maker.xz_area_split(x, z);

    const area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);
    if (area_territory === undefined) return;

    if (player.getXuid() === area_territory.player.xuid) {
        return; //주인이면
    }
    const owner_player_territory: PlayerTerritory = territory_players.get(area_territory?.player.xuid)!;
    if (owner_player_territory.players.find(item => item.xuid === player.getXuid())) {
        return; //땅주의 구성원이면
    }

    player.getNetworkIdentifier().getActor()?.sendMessage(`${area_territory}§l§4님의 토지에 대한 권한이 없습니다.`);
    return CANCEL; //남땅이면 CANCEL
});

events.blockPlace.on(ev => {
    const player = ev.player;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const block_position = ev.blockPos;
    const [x, z] = Maker.xz_process_chunk(block_position);
    const xz_split = Maker.xz_area_split(x, z);

    const area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);
    if (area_territory === undefined) return;

    if (player.getXuid() === area_territory.player.xuid) {
        return; //주인이면
    }
    const owner_player_territory: PlayerTerritory = territory_players.get(area_territory?.player.xuid)!;
    if (owner_player_territory.players.find(item => item.xuid === player.getXuid())) {
        return; //땅주의 구성원이면
    }

    player.getNetworkIdentifier().getActor()?.sendMessage(`${area_territory}§l§4님의 토지에 대한 권한이 없습니다.`);
    return CANCEL; //남땅이면 CANCEL
});
