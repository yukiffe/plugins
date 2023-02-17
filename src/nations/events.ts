import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { database, Maker, root } from "../../utils/utils";
import { territory_areas, territory_regions, territory_countrys, territory_players, territory_villages } from ".";
import { PlayerNameXuid, TerritoryPlayer } from "./territory_base";

//interval로 sidebar에 현재 위치 국가 or 장소 주인 띄울 수 잇도록 만들기

events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    const player_name_xuid = new PlayerNameXuid(name, xuid);
    if (database.exist_file(root.DATABASE_TERRITORY_PLAYER, `${xuid}.json`)) {
        const data_player_territory: TerritoryPlayer = database.load(root.DATABASE_TERRITORY_PLAYER, `${xuid}.json`);
        territory_players.set(`${xuid}`, data_player_territory);
    } else {
        territory_players.set(`${xuid}`, new TerritoryPlayer(player_name_xuid));
    }
});

events.playerLeft.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();
    database.upload(root.DATABASE_TERRITORY_PLAYER, `${xuid}.json`, territory_players.get(xuid));
    territory_players.delete(xuid);
});

events.serverClose.on(() => {
    territory_areas.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_TERRITORY_AREA, `${key}.json`, value);
    });
    territory_regions.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_TERRITORY_REGION, `${key}.json`, value);
    });
    territory_villages.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_TERRITORY_VILLAGE, `${key}.json`, value);
    });
    territory_countrys.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_TERRITORY_COUNTRY, `${key}.json`, value);
    });
    territory_players.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_TERRITORY_PLAYER, `${key}.json`, value);
    });
});

// events.chestOpen.on(ev => {
//     const player = ev.player;
//     if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

//     const block_position = ev.blockPos;
//     const [x, z] = Maker.xz_process_chunk(block_position);
//     const xz_split = Maker.xz_area_split(x, z);

//     const area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);
//     if (area_territory === undefined) return; //주인없으면

//     if (player.getXuid() === area_territory.player.xuid) {
//         return; //주인이면
//     }
//     const owner_player_territory: TerritoryPlayer = territory_players.get(area_territory?.player.xuid)!;
//     if (owner_player_territory.players.find(item => item.xuid === player.getXuid())) {
//         return; //땅주의 구성원이면
//     }

//     player.getNetworkIdentifier().getActor()?.sendMessage(`${area_territory.player.name}§l§4님의 토지에 대한 권한이 없습니다.`);
//     return CANCEL; //남땅이면 CANCEL
// });

// events.blockDestroy.on(ev => {
//     const player = ev.player;
//     if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

//     const block_position = ev.blockPos;
//     const [x, z] = Maker.xz_process_chunk(block_position);
//     const xz_split = Maker.xz_area_split(x, z);

//     console.log(x + "" + z);
//     console.log(xz_split);

//     const area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);
//     if (area_territory === undefined) return;

//     if (player.getXuid() === area_territory.player.xuid) {
//         return; //주인이면
//     }
//     const owner_player_territory: TerritoryPlayer = territory_players.get(area_territory?.player.xuid)!;
//     if (owner_player_territory.players.find(item => item.xuid === player.getXuid())) {
//         return; //땅주의 구성원이면
//     }

//     player.getNetworkIdentifier().getActor()?.sendMessage(`${area_territory.player.name}§l§4님의 토지에 대한 권한이 없습니다.`);
//     return CANCEL; //남땅이면 CANCEL
// });

// events.blockPlace.on(ev => {
//     const player = ev.player;
//     if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

//     const block_position = ev.blockPos;
//     const [x, z] = Maker.xz_process_chunk(block_position);
//     const xz_split = Maker.xz_area_split(x, z);

//     const area_territory: AreaTerritory | undefined = territory_areas.get(xz_split);
//     if (area_territory === undefined) return;

//     if (player.getXuid() === area_territory.player.xuid) {
//         return; //주인이면
//     }
//     const owner_player_territory: TerritoryPlayer = territory_players.get(area_territory?.player.xuid)!;
//     if (owner_player_territory.players.find(item => item.xuid === player.getXuid())) {
//         return; //땅주의 구성원이면
//     }

//     player.getNetworkIdentifier().getActor()?.sendMessage(`${area_territory.player.name}§l§4님의 토지에 대한 권한이 없습니다.`);
//     return CANCEL; //남땅이면 CANCEL
// });
