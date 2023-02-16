"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chunk = exports.PlayerTerritory = exports.TerritoryCountry = exports.TerritoryVillage = exports.TerritoryRegion = exports.TerritoryArea = void 0;
class TerritoryArea {
    constructor(player) {
        this.player = player;
    }
}
exports.TerritoryArea = TerritoryArea;
/**개인 클래스  */
class TerritoryRegion {
}
exports.TerritoryRegion = TerritoryRegion;
/**마을 클래스  */
class TerritoryVillage {
}
exports.TerritoryVillage = TerritoryVillage;
/**국가 클래스  */
class TerritoryCountry {
}
exports.TerritoryCountry = TerritoryCountry;
class PlayerTerritory {
}
exports.PlayerTerritory = PlayerTerritory;
class Chunk {
    constructor(x, z) {
        this.x = x;
        this.z = z;
        this.chunk_x = Math.ceil(x / 8);
        this.chunk_z = Math.ceil(z / 8);
    }
    get_xz() {
        return [this.chunk_x, this.chunk_z];
    }
    get_xz_chunk() {
        return [this.chunk_x, this.chunk_z];
    }
    get_xz_chunk_line() {
        return `${this.chunk_x}_${this.chunk_z}`;
    }
}
exports.Chunk = Chunk;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxNQUFhLGFBQWE7SUFPdEIsWUFBWSxNQUF1QjtRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFWRCxzQ0FVQztBQUVELGFBQWE7QUFDYixNQUFhLGVBQWU7Q0FVM0I7QUFWRCwwQ0FVQztBQUVELGFBQWE7QUFDYixNQUFhLGdCQUFnQjtDQVk1QjtBQVpELDRDQVlDO0FBRUQsYUFBYTtBQUNiLE1BQWEsZ0JBQWdCO0NBVzVCO0FBWEQsNENBV0M7QUFFRCxNQUFhLGVBQWU7Q0FLM0I7QUFMRCwwQ0FLQztBQUVELE1BQWEsS0FBSztJQUtkLFlBQVksQ0FBUyxFQUFFLENBQVM7UUFDNUIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ00sTUFBTTtRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ00sWUFBWTtRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ00saUJBQWlCO1FBQ3BCLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0NBQ0o7QUFwQkQsc0JBb0JDO0FBQ0QscUhBQXFIO0FBQ3JILG9DQUFvQztBQUNwQyxvQ0FBb0M7QUFDcEMsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5Qix3Q0FBd0M7QUFDeEMsSUFBSTtBQUNKLDJJQUEySTtBQUMzSSxvQ0FBb0M7QUFDcEMsb0NBQW9DO0FBQ3BDLDhDQUE4QztBQUM5Qyw0Q0FBNEM7QUFDNUMsd0NBQXdDO0FBQ3hDLElBQUk7QUFDSiwrSUFBK0k7QUFDL0ksb0NBQW9DO0FBQ3BDLG9DQUFvQztBQUNwQyxrREFBa0Q7QUFDbEQsNENBQTRDO0FBQzVDLHdDQUF3QztBQUN4QyxJQUFJIn0=