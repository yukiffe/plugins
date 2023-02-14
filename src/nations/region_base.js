"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XZChunk = exports.XuidPlayer = exports.PlayerTerritory = exports.RegionTerritory = exports.AreaTerritory = void 0;
class AreaTerritory {
    constructor(player, xz_chunk) {
        this.player = player;
        this.xz_chunk = xz_chunk;
    }
}
exports.AreaTerritory = AreaTerritory;
class RegionTerritory {
    constructor(area_territorys, spawn_position, dimention) {
        this.area_territorys = area_territorys;
        this.spawn_position = spawn_position;
        this.dimention = dimention;
    }
}
exports.RegionTerritory = RegionTerritory;
class PlayerTerritory {
    constructor(player, players, region_territory, construct_time = new Date()) {
        this.player = player;
        this.players = players;
        this.region_territory = region_territory;
        this.construct_time = construct_time;
    }
}
exports.PlayerTerritory = PlayerTerritory;
class XuidPlayer {
    constructor(name, xuid) {
        this.name = name;
        this.xuid = xuid;
    }
}
exports.XuidPlayer = XuidPlayer;
class XZChunk {
    constructor(x, z) {
        this.x = x;
        this.z = z;
    }
}
exports.XZChunk = XZChunk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLGFBQWE7SUFHdEIsWUFBWSxNQUFrQixFQUFFLFFBQWlCO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7Q0FDSjtBQVBELHNDQU9DO0FBRUQsTUFBYSxlQUFlO0lBSXhCLFlBQVksZUFBdUMsRUFBRSxjQUFvQixFQUFFLFNBQXNCO1FBQzdGLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Q0FDSjtBQVRELDBDQVNDO0FBRUQsTUFBYSxlQUFlO0lBT3hCLFlBQVksTUFBa0IsRUFBRSxPQUFxQixFQUFFLGdCQUF3QyxFQUFFLGlCQUF1QixJQUFJLElBQUksRUFBRTtRQUM5SCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztDQUNKO0FBZEQsMENBY0M7QUFFRCxNQUFhLFVBQVU7SUFHbkIsWUFBWSxJQUFZLEVBQUUsSUFBWTtRQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUFQRCxnQ0FPQztBQUVELE1BQWEsT0FBTztJQUdoQixZQUFZLENBQVMsRUFBRSxDQUFTO1FBQzVCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFQRCwwQkFPQyJ9