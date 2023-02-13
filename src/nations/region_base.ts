import { BlockPos, ChunkPos, Vec3 } from "bdsx/bds/blockpos";
import { Player } from "bdsx/bds/player";
import { bool_t } from "bdsx/nativetype";
import { Actor, DimensionId } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export class AreaTerritory {
    private _x_chunk: number;
    private _z_chunk: number;
    private _dimention: DimensionId;
    private _xuid: string;
    private _player_name: string;
    constructor(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const position = actor.getPosition();
        const region = actor.getRegion();
        const dimention = region.getDimensionId();
        this._x_chunk = Math.ceil(position.x / 8);
        this._z_chunk = Math.ceil(position.z / 8);
        this._dimention = dimention;
        this._xuid = `${ni.getActor()?.getXuid()}`;
        this._player_name = actor.getNameTag();
    }
    get x_chunk() {
        return this._x_chunk;
    }
    get z_chunk() {
        return this._z_chunk;
    }
    get dimention() {
        return this._dimention;
    }
    get xuid() {
        return this._xuid;
    }
    get player_name() {
        return this._player_name;
    }
}

export class RegionTerritory {
    private _area_territory: AreaTerritory[];
    get area_territory() {
        return this._area_territory;
    }
}

export class RegionBase {
    public _create_time: Date;
    public _owner_xuid: string;
    public _member_xuids: string[];

    public _territory: AreaTerritory | RegionTerritory;
    public _spawn_position: Vec3;

    constructor(ni: NetworkIdentifier, territory: AreaTerritory | RegionTerritory) {
        const actor = ni.getActor()!;
        this._create_time = new Date();
        this._owner_xuid = actor.getXuid();
        this._member_xuids = [actor.getXuid()];

        this._territory = territory;
        this._spawn_position = actor.getPosition();
    }

    // public add_chunk() {} //청크추가
    // public remove_chunk() {} //청크제거
} //나중에 absctract 추가
