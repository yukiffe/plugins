import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { database, root } from "../../utils/utils";
import { territory_areas, territory_regions, territory_countrys, territory_players, territory_villages } from ".";
import { Chunk, PlayerNameXuid, TerritoryArea, TerritoryPlayer, Value } from "./territory_base";
import region_territory from "./command/register/region_territory";

events.playerJoin.on(ev => {
    const player = ev.player;
    const name = player.getNameTag();
    const xuid = player.getXuid();
    const player_name_xuid = new PlayerNameXuid(name, xuid);
    if (database.exist_file(root.DATABASE_PLAYER, `${xuid}.json`)) {
        const data_player_territory: TerritoryPlayer = database.load(root.DATABASE_PLAYER, `${xuid}.json`);
        territory_players.set(`${xuid}`, data_player_territory);
    } else {
        territory_players.set(`${xuid}`, new TerritoryPlayer(false, player_name_xuid));
    }
});
//들어오고 나갈때 동화율 조정
/*
 1. 들어와있을때
 2. 나가있을때
*/
events.playerLeft.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();
    database.upload(root.DATABASE_PLAYER, `${xuid}.json`, territory_players.get(xuid));
    territory_players.delete(xuid);
});

events.serverClose.on(() => {
    territory_areas.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_AREA, `${key}.json`, value);
    });
    territory_regions.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_REGION, `${key}.json`, value);
    });
    territory_villages.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_VILLAGE, `${key}.json`, value);
    });
    territory_countrys.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_NATIONS_COUNTRY, `${key}.json`, value);
    });
    territory_players.forEach((value: any, key: any) => {
        console.log(key);
        console.log(value);
        database.upload(root.DATABASE_PLAYER, `${key}.json`, value);
    });
});

// events.blockDestroy.on(ev => {
//     const itemStack = ev.itemStack;
//     const player = ev.player;
//     const ni = player.getNetworkIdentifier();

//     const data_story = story.get(player.getXuid());

//     const item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
//     let weight = tile_weight.get(item_name)!;
//     if (weight === undefined) {
//         player.sendActionbar("추가되지 않은 아이템, 관리자에게 요청해주세요.(다음업데이트에 반영)");
//         return;
//     }
//     weight -= weight / 100; //0.01이하로는 안떨어지게 나중에 코드 수정
//     data_story!.likelihood += weight;
//     tile_weight.set(item_name, weight);
//     fairy_tale_ratio_func(player, data_story?.likelihood!, weight);
// });

events.blockInteractedWith.on(ev => {
    ev.player!.getNetworkIdentifier().getActor()?.sendMessage("TEST3");
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const area_territory: TerritoryArea | undefined = territory_areas.get(chunk.get_dxz_chunk_line());
    const player_territory: TerritoryPlayer | undefined = territory_players.get(player.getXuid())!;

    if (area_territory === undefined) return; //미선언

    const region_territory = territory_regions.get(area_territory.region_name!)!;
    // if (region_territory === undefined) return; //여기코드바꾸기
    // if (xuid === region_territory?.owner.xuid) {
    //     return; //내가 땅 주인이면
    // }
    //땅주, 마을주, 성주 3가지 다 확인하기
    //땅이 없으면 건너뛰기
    const owner_player_territory = territory_players.get(region_territory?.owner.xuid!)!;
    // if (owner_player_territory?.friends.find(item => item.xuid === region_territory?.owner.xuid)) {
    //     return;
    // }

    if (player_territory?.deposit >= 50) {
        if (player_territory.assimilate >= 3) {
            if (!attacking.has(chunk.get_dxz_chunk_line())) {
                const attack = new Attack(0, 64, 0);
                territory_regions.set(region_territory?.region_name!, region_territory);
                attacking.set(chunk.get_dxz_chunk_line(), attack);
            }
            const attack = attacking.get(chunk.get_dxz_chunk_line())!;
            attack.assimilate -= 1;
            player_territory.assimilate -= 3;
            attacking.set(chunk.get_dxz_chunk_line(), attack);
            territory_players.set(player_territory.owner.xuid, player_territory);
            player.getNetworkIdentifier().getActor()?.sendActionbar(`Block 개연성: ${attack.assimilate}(-1)\nPlayer 개연성: ${player_territory.assimilate}(-3)`);
        }
    }
    // player.getNetworkIdentifier().getActor()?.sendMessage(`${region_territory?.owner.name}§l§4님의 상자에 대한 권한이 없습니다.`);
    //때리기 64
    //개연성 172
    return CANCEL; //남땅이면 CANCEL
});
//상자는 캔슬안됌 => 따로따로만들기

// const attacking = new Map<string, >();

class Attack extends Value {
    constructor(money = 0, assimilate = 0, deposit = 0) {
        super(money, assimilate, deposit);
    }
}

export const attacking = new Map<string, Attack>();
