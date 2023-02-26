import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { CommandPermissionLevel } from "bdsx/bds/command";
import { Chunk, database, PlayerNameXuid, root } from "../../utils/utils";
import { nations_areas, nations_regions, nations_countrys, nations_players, nations_villages, story_tiles as story_tiles } from ".";
import { NationsArea, NationsPlayer, Value } from "./nations_base";
import { bedrockServer } from "bdsx/launcher";
import { Queue } from "queue-typescript";
import { BlockSource } from "bdsx/bds/block";

const deposit_interval = setInterval(() => {
    for (const player of bedrockServer.serverInstance.getPlayers()) {
        const xuid = player.getXuid();
        let data_player = nations_players.get(xuid);
        if (data_player === undefined) continue;
        data_player.assimilate += 1 - data_player.assimilate / 100;
        nations_players.set(xuid, data_player);
    }
    // }, 100);
}, 192000); //3분에 1씩 일단
const item_tile_interval = setInterval(() => {
    story_tiles.forEach((value: any, key: any) => {
        story_tiles.set(key, value + (0.9 - value) / 90);
    });
}, 64000); //1분에 한번 추가꿈

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
        tile_item = 0.9;
    }
    const data_player = nations_players.get(xuid)!;
    tile_item -= tile_item / 100;
    data_player.probability += tile_item + 0.1 < 1 ? tile_item + 0.1 : 1;
    story_tiles.set(tile_item_name, tile_item);

    player.sendActionbar(`개연성: ${Math.floor(data_player.probability * 100) / 100}(+${Math.floor((tile_item + 0.1) * 100) / 100})`);
});

events.blockPlace.on(ev => {
    const player = ev.player;
    const xuid = player.getXuid();

    const tile_item_name = ev.blockSource.getBlock(ev.blockPos).getDescriptionId();
    let tile_item = story_tiles.get(tile_item_name);
    if (tile_item === undefined) {
        tile_item = 0.9;
    }
    const data_player = nations_players.get(xuid)!;
    tile_item -= tile_item / 100;
    data_player.probability += tile_item + 0.1 < 1 ? tile_item + 0.1 : 1;
    story_tiles.set(tile_item_name, tile_item);

    player.sendActionbar(`개연성: ${Math.floor(data_player.probability * 100) / 100}(+${Math.floor((tile_item + 0.1) * 100) / 100})`);
});

events.blockInteractedWith.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});

events.attackBlock.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});
events.blockInteractedWith.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});
events.buttonPress.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});
events.chestOpen.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});

events.blockPlace.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});
events.blockDestroy.on(ev => {
    const player = ev.player;
    if (player === null) return;
    if (player.getCommandPermissionLevel() === CommandPermissionLevel.Operator) return;

    const actor = player.getNetworkIdentifier().getActor();
    const xuid = player.getXuid();
    const dimention_id = player.getDimensionId();
    const block_position = ev.blockPos;
    const chunk = new Chunk(block_position.x, block_position.y, block_position.z, dimention_id);

    const data_player = nations_players.get(xuid)!;
    const data_current_block_area: NationsArea | undefined = nations_areas.get(chunk.get_dxz_chunk_line());

    if (data_current_block_area === undefined) return;
    const data_current_area_player = nations_players.get(data_current_block_area?.region_name!);
    if (data_current_block_area.region_name === xuid) return;
    if (data_current_area_player?.friends.find(player => player.xuid === xuid)) return; //취소조건들

    const data_current_region_name = data_current_block_area.region_name!;
    const data_current_region = nations_regions.get(data_current_region_name)!;
    const data_player_probability = data_player.probability;
    if (data_player_probability === 0) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    const data_probability_log = Math.log(data_player_probability);

    if (data_player?.assimilate! < 30) {
        actor?.sendMessage("§l§c약탈을 위한 동화율이 부족합니다.(30이상)");
        return CANCEL;
    }
    if (data_player_probability <= data_probability_log * 5) {
        actor?.sendMessage("§l§c약탈을 위한 개연성이 부족합니다");
        return CANCEL;
    }
    if (data_current_region.probability < data_probability_log) {
        return; //약탈
    }

    data_current_region.probability -= data_probability_log;
    data_player!.probability -= data_probability_log * 5;

    actor?.sendActionbar(`§l§g플레이어: ${Math.ceil(data_player.probability * 100) / 100}(-${Math.ceil(data_probability_log * 5 * 100) / 100})\n
    §l§g토지: ${Math.ceil(data_current_region.probability * 100) / 100}(-${Math.ceil(data_probability_log * 100) / 100})`);

    nations_regions.set(data_current_region_name, data_current_region);
    nations_players.set(xuid, data_player);

    return CANCEL;
});

//상자는 캔슬안됌 => 따로따로만들기

const attack_info = new Map<string, AttackInfo>(); //dxyz

class AttackInfo extends Value {
    constructor(deposit, assimilate, probability) {
        super(deposit, assimilate, probability);
    }
}

// export const attacking = new Map<string, Attack>();

//죽으면 돈다뺏기고 동화율삭제 개연성 20% 약탈
