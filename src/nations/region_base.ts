import { BlockPos, ChunkPos, Vec3 } from "bdsx/bds/blockpos";
import { Player } from "bdsx/bds/player";
import { bool_t } from "bdsx/nativetype";
import { Actor, DimensionId } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { AreaTerritory, RegionTerritory } from "../../utils/utils";

export class RegionBase {
    private _create_time: Date;
    private _owner_actor: Actor;
    private _member_actors: Actor[];

    private _territory: AreaTerritory | RegionTerritory;
    private _spawn_position: Vec3;

    constructor(ni: NetworkIdentifier, territory: AreaTerritory | RegionTerritory) {
        const actor = ni.getActor()!;
        this._create_time = new Date();
        this._owner_actor = actor;
        this._member_actors = [actor];

        this._territory = territory;
        this._spawn_position = actor.getPosition();
    }

    public add_chunk() {} //청크추가
    public remove_chunk() {} //청크제거
} //나중에 absctract 추가
