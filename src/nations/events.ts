import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { Chunk, database, PlayerNameXuid, root } from "../../utils/utils";
import { nations_areas, nations_regions, nations_countrys, nations_players, nations_villages, story_tiles as story_tiles } from ".";
import { NationsArea, NationsPlayer, Value } from "./nations_base";
import { bedrockServer } from "bdsx/launcher";

const deposit_interval = setInterval(() => {
    for (const player of bedrockServer.serverInstance.getPlayers()) {
        const xuid = player.getXuid();
        let data_player = nations_players.get(xuid);
        if (data_player === undefined) continue;
        data_player.deposit += 1 - data_player.deposit / 100;
        nations_players.set(xuid, data_player);
    }
}, 1000);
const item_tile_interval = setInterval(() => {
    story_tiles.forEach((value: any, key: any) => {
        story_tiles.set(key, value + (1 - value) / 90);
    });
}, 1000);

events.serverStop.on(() => {
    clearInterval(deposit_interval);
    clearInterval(item_tile_interval);
});

events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    const player_name_xuid = new PlayerNameXuid(name, xuid);
    if (database.exist_file(root.DATABASE_PLAYER, `${xuid}.json`)) {
        const data_player_territory: NationsPlayer = database.load(root.DATABASE_PLAYER, `${xuid}.json`);
        nations_players.set(`${xuid}`, data_player_territory);
    } else {
        nations_players.set(`${xuid}`, new NationsPlayer(false, player_name_xuid, [], null, null, null, 1000, 0, 0));
    }
});

events.playerLeft.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();
    database.upload(root.DATABASE_PLAYER, `${xuid}.json`, nations_players.get(xuid));
    nations_players.delete(xuid);
});

events.serverClose.on(() => {
    nations_areas.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_AREA, `${key}.json`, value);
    });
    nations_regions.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_REGION, `${key}.json`, value);
    });
    nations_villages.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_VILLAGE, `${key}.json`, value);
    });
    nations_countrys.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_COUNTRY, `${key}.json`, value);
    });
    nations_players.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_PLAYER, `${key}.json`, value);
    });
    story_tiles.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_STORY, `${key}.json`, value);
    });
    // story_place_tiles.forEach((value: any, key: any) => {
    //     console.log(key);
    //     console.log(value);
    //     database.upload(root.DATABASE_STORY_PLACE, `${key}.json`, value);
    // });
});

events.blockDestroy.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();

    const tile_item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
    let tile_item = story_tiles.get(tile_item_name);
    if (tile_item === undefined) {
        tile_item = 1;
    }
    const data_player = nations_players.get(xuid)!;
    tile_item -= tile_item / 90;
    data_player.assimilate += tile_item + 0.1 < 1 ? tile_item + 0.1 : 1;
    story_tiles.set(tile_item_name, tile_item);

    player.sendActionbar(`개연성: ${Math.floor(data_player.assimilate * 100) / 100}(+${Math.floor((tile_item + 0.1) * 100) / 100})`);
});

// events.blockPlace.on(ev => {
//     const player = ev.player;
//     const xuid = player.getXuid();

//     const tile_item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
//     let tile_item = story_place_tiles.get(tile_item_name);
//     if (tile_item === undefined) {
//         tile_item = 1;
//     }
//     const data_player = nations_players.get(xuid)!;
//     tile_item -= tile_item / 100;
//     data_player.assimilate += tile_item + 0.1 < 1 ? tile_item + 0.1 : 1;
//     story_place_tiles.set(tile_item_name, tile_item);

//     player.sendActionbar(`개연성: ${Math.floor(data_player.assimilate * 100) / 100}(+${Math.floor((tile_item + 0.1) * 100) / 100})`);
// });

// events.blockInteractedWith.on(ev => {
//     ev.player!.getNetworkIdentifier().getActor()?.sendMessage("TEST3");
//     const player = ev.player;
//     if (player === null) return;
//     if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

//     const xuid = player.getXuid();
//     const dimention_id = player.getDimensionId();
//     const block_position = ev.blockPos;
//     const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

//     const area_territory: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());
//     const player_territory: NationsPlayer | undefined = nations_players.get(player.getXuid())!;

//     if (area_territory === undefined) return; //미선언

//     const region_territory = nations_regions.get(area_territory.region_name!)!;
//     // if (region_territory === undefined) return; //여기코드바꾸기
//     // if (xuid === region_territory?.owner.xuid) {
//     //     return; //내가 땅 주인이면
//     // }
//     //땅주, 마을주, 성주 3가지 다 확인하기
//     //땅이 없으면 건너뛰기
//     const owner_player_territory = nations_players.get(region_territory?.owner.xuid!)!;
//     // if (owner_player_territory?.friends.find(item => item.xuid === region_territory?.owner.xuid)) {
//     //     return;
//     // }

//     if (player_territory?.deposit >= 50) {
//         if (player_territory.assimilate >= 3) {
//             if (!attacking.has(chunk.get_dxz_chunk_line())) {
//                 const attack = new Attack(0, 64, 0);
//                 nations_regions.set(region_territory?.region_name!, region_territory);
//                 attacking.set(chunk.get_dxz_chunk_line(), attack);
//             }
//             const attack = attacking.get(chunk.get_dxz_chunk_line())!;
//             attack.assimilate -= 1;
//             player_territory.assimilate -= 3;
//             attacking.set(chunk.get_dxz_chunk_line(), attack);
//             nations_players.set(player_territory.owner.xuid, player_territory);
//             player.getNetworkIdentifier().getActor()?.sendActionbar(`Block 개연성: ${attack.assimilate}(-1)\nPlayer 개연성: ${player_territory.assimilate}(-3)`);
//         }
//     }
//     // player.getNetworkIdentifier().getActor()?.sendMessage(`${region_territory?.owner.name}§l§4님의 상자에 대한 권한이 없습니다.`);
//     //때리기 64
//     //개연성 172
//     return CANCEL; //남땅이면 CANCEL
// });
//상자는 캔슬안됌 => 따로따로만들기

// const attacking = new Map<string, >();

class Attack extends Value {
    constructor(money = 0, assimilate = 0, deposit = 0) {
        super(money, assimilate, deposit);
    }
}

export const attacking = new Map<string, Attack>();
