"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionTerritory = exports.AreaTerritory = exports.RegionBase = void 0;
class RegionBase {
    constructor(ni, territory) {
        const actor = ni.getActor();
        this._create_time = new Date();
        this._owner_actor = actor;
        this._member_actors = [actor];
        this._territory = territory;
        this._spawn_position = actor.getPosition();
    }
} //나중에 absctract 추가
exports.RegionBase = RegionBase;
class AreaTerritory {
    constructor(ni) {
        var _a;
        const actor = ni.getActor();
        const position = actor.getPosition();
        const region = actor.getRegion();
        const dimention = region.getDimensionId();
        this._x_chunk = Math.ceil(position.x / 8);
        this._z_chunk = Math.ceil(position.z / 8);
        this._dimention = dimention;
        this._xuid = `${(_a = ni.getActor()) === null || _a === void 0 ? void 0 : _a.getXuid()}`;
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
    get ni() {
        return this._xuid;
    }
    get player_name() {
        return this._player_name;
    }
}
exports.AreaTerritory = AreaTerritory;
class RegionTerritory {
    get area_territory() {
        return this._area_territory;
    }
}
exports.RegionTerritory = RegionTerritory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFNQSxNQUFhLFVBQVU7SUFRbkIsWUFBWSxFQUFxQixFQUFFLFNBQTBDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7Q0FJSixDQUFDLGtCQUFrQjtBQXBCcEIsZ0NBb0JDO0FBRUQsTUFBYSxhQUFhO0lBTXRCLFlBQVksRUFBcUI7O1FBQzdCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsTUFBQSxFQUFFLENBQUMsUUFBUSxFQUFFLDBDQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUNELElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQWhDRCxzQ0FnQ0M7QUFFRCxNQUFhLGVBQWU7SUFFeEIsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7Q0FDSjtBQUxELDBDQUtDIn0=