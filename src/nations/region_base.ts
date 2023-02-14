import { Vec3 } from "bdsx/bds/blockpos";
import { DimensionId } from "bdsx/bds/actor";

export class AreaTerritory {
    public player: XuidPlayer;
    public xz_chunk: XZChunk;
    constructor(player: XuidPlayer, xz_chunk: XZChunk) {
        this.player = player;
        this.xz_chunk = xz_chunk;
    }
}

export class RegionTerritory {
    public area_territorys: AreaTerritory[] | null;
    public spawn_position: Vec3; //추가예정, spawn_position은  area_territorys 내에서만 가능하도록
    public dimention_id: DimensionId;
    constructor(area_territorys: AreaTerritory[] | null, spawn_position: Vec3, dimention_id: DimensionId) {
        this.area_territorys = area_territorys;
        this.spawn_position = spawn_position;
        this.dimention_id = dimention_id;
    }
}

export class PlayerTerritory {
    public player: XuidPlayer;
    public players: XuidPlayer[];

    public region_territory: RegionTerritory | null;
    public construct_time: Date;

    constructor(player: XuidPlayer, players: XuidPlayer[], region_territory: RegionTerritory | null, construct_time: Date = new Date()) {
        this.player = player;
        this.players = players;

        this.region_territory = region_territory;
        this.construct_time = construct_time;
    }
}

export class XuidPlayer {
    public name: string;
    public xuid: string;
    constructor(name: string, xuid: string) {
        this.name = name;
        this.xuid = xuid;
    }
}

export class XZChunk {
    public x: number;
    public z: number;
    constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
    }
}
