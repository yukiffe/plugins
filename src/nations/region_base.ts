import { Vec3 } from "bdsx/bds/blockpos";
import { DimensionId } from "bdsx/bds/actor";
import { events } from "bdsx/event";

export class TerritoryArea {
    public player: PlayerTerritory;

    public chunk_x: number;
    public chunk_z: number;
    public dimention_id: DimensionId;

    constructor(player: PlayerTerritory) {
        this.player = player;
    }
}

/**개인 클래스  */
export class TerritoryRegion {
    public owner_name: string;
    public owner_xuid: string;

    public area_territorys: TerritoryArea[];
    public region_name: string;
    public deposit: number;

    public spawn_position: Vec3;
    public dimention_id: DimensionId;
}

/**마을 클래스  */
export class TerritoryVillage {
    public owner_name: string;
    public owner_xuid: string;
    public members_name: string[];
    public members_xuid: string[];

    public region_territorys: TerritoryRegion[];
    public village_name: string;
    public deposit: number;

    public spawn_position: Vec3;
    public dimention_id: DimensionId;
}

/**국가 클래스  */
export class TerritoryCountry {
    public owner_name: string;
    public owner_xuid: string;
    public members_xuid: string[];

    public village_territorys: TerritoryVillage[];
    public country_name: string;
    public deposit: number;

    public spawn_position: Vec3;
    public dimention_id: DimensionId;
}

export class PlayerTerritory {
    public owner_name: string;
    public owner_xuid: string;

    public belong: string | null;
}

export class Chunk {
    public x: number;
    public z: number;
    public chunk_x: number;
    public chunk_z: number;
    constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
        this.chunk_x = Math.ceil(x / 8);
        this.chunk_z = Math.ceil(z / 8);
    }
    public get_xz(): number[] {
        return [this.chunk_x, this.chunk_z];
    }
    public get_xz_chunk(): number[] {
        return [this.chunk_x, this.chunk_z];
    }
    public get_xz_chunk_line(): string {
        return `${this.chunk_x}_${this.chunk_z}`;
    }
}
// constructor(owner_name: string, owner_xuid: string, chunk_x: number, chunk_z: number, dimention_id: DimensionId) {
//     this.owner_name = owner_name;
//     this.owner_xuid = owner_xuid;
//     this.chunk_x = chunk_x;
//     this.chunk_z = chunk_z;
//     this.dimention_id = dimention_id;
// }
// constructor(owner_name: string, owner_xuid: string, area_territorys: TerritoryArea[], spawn_position: Vec3, dimention_id: DimensionId) {
//     this.owner_name = owner_name;
//     this.owner_xuid = owner_xuid;
//     this.area_territorys = area_territorys;
//     this.spawn_position = spawn_position;
//     this.dimention_id = dimention_id;
// }
// constructor(owner_name: string, owner_xuid: string, region_territorys: TerritoryRegion[], spawn_position: Vec3, dimention_id: DimensionId) {
//     this.owner_name = owner_name;
//     this.owner_xuid = owner_xuid;
//     this.region_territorys = region_territorys;
//     this.spawn_position = spawn_position;
//     this.dimention_id = dimention_id;
// }
