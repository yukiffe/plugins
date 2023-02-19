import { DimensionId } from "bdsx/bds/actor";

export class PlayerNameXuid {
    public name: string;
    public xuid: string;

    constructor(name: string, xuid: string) {
        this.name = name;
        this.xuid = xuid;
    }
}

export class Chunk {
    public x: number;
    public y: number;
    public z: number;
    public chunk_x: number;
    public chunk_z: number;
    public dimention_id: DimensionId;

    constructor(x: number, y: number, z: number, dimention_id: DimensionId) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.chunk_x = Math.floor(x / 8);
        this.chunk_z = Math.floor(z / 8);
        this.dimention_id = dimention_id;
    }

    public get_dxz(): number[] {
        return [this.dimention_id, this.x, this.z];
    }
    public get_dxz_chunk(): number[] {
        return [this.dimention_id, this.chunk_x, this.chunk_z];
    }
    public get_dxyz(): number[] {
        return [this.dimention_id, this.x, this.y, this.z];
    }
    public get_dxz_chunk_line(): string {
        return `${this.dimention_id}_${this.chunk_x}_${this.chunk_z}`;
    }
}

export class Value {
    public money: number;
    public assimilate: number;
    public deposit: number;

    constructor(money: number, assimilate: number, deposit: number) {
        this.money = money;
        this.assimilate = assimilate;
        this.deposit = deposit;
    }
}

export class TerritoryArea {
    public owner: PlayerNameXuid;
    public chunk: Chunk;

    constructor(owner: PlayerNameXuid, chunk: Chunk) {
        this.owner = owner;
        this.chunk = chunk;
    }
}

/**토지 클래스  */
export class TerritoryRegion extends Value {
    public owner: PlayerNameXuid;
    public spawn_position: Chunk;

    public area_territorys: string[];
    public region_name: string;

    constructor(owner: PlayerNameXuid, spawn_position: Chunk, area_territorys: string[], region_name: string, money = 0, assimilate = 0, deposit = 0) {
        super(money, assimilate, deposit);
        this.owner = owner;
        this.spawn_position = spawn_position;
        this.area_territorys = area_territorys;
        this.region_name = region_name;
    }
}

/**마을 클래스  */
export class TerritoryVillage extends Value {
    public owner: PlayerNameXuid;
    public members: PlayerNameXuid[];
    public spawn_position: Chunk;

    public region_territorys: string[];
    public village_name: string;

    constructor(
        owner: PlayerNameXuid,
        members: PlayerNameXuid[],
        spawn_position: Chunk,
        region_territorys: string[],
        village_name: string,
        money = 0,
        assimilate = 0,
        deposit = 0,
    ) {
        super(money, assimilate, deposit);
        this.owner = owner;
        this.members = members;
        this.spawn_position = spawn_position;
        this.region_territorys = region_territorys;
        this.village_name = village_name;
    }
}

/**국가 클래스  */
export class TerritoryCountry extends Value {
    public owner: PlayerNameXuid;
    public members: PlayerNameXuid[];
    public spawn_position: Chunk;

    public village_territorys: string[];
    public country_name: string;

    constructor(
        owner: PlayerNameXuid,
        members: PlayerNameXuid[],
        spawn_position: Chunk,
        village_territorys: string[],
        country_name: string,
        money = 0,
        assimilate = 0,
        deposit = 0,
    ) {
        super(money, assimilate, deposit);
        this.owner = owner;
        this.members = members;
        this.spawn_position = spawn_position;
        this.village_territorys = village_territorys;
        this.country_name = country_name;
    }
}

//개인 디비
export class TerritoryPlayer extends Value {
    public owner: PlayerNameXuid;
    public friends: PlayerNameXuid[];

    public belong_region: string | null; //player name_region
    public belong_village: string | null; //player name_village
    public belong_country: string | null; //player_name_country

    constructor(
        player_name_xuid: PlayerNameXuid,
        friends_name_xuid: PlayerNameXuid[] = [],
        money = 0,
        assimilate = 0,
        deposit = 0,
        belong_region: string | null = null,
        belong_village: string | null = null,
        belong_country: string | null = null,
    ) {
        super(money, assimilate, deposit);
        this.owner = player_name_xuid;
        this.friends = friends_name_xuid;
        this.belong_region = belong_region;
        this.belong_village = belong_village;
        this.belong_country = belong_country;
    }
}
