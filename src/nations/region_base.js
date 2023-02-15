"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstPosition = exports.XZChunk = exports.XuidPlayer = exports.PlayerTerritory = exports.RegionTerritory = exports.AreaTerritory = void 0;
class AreaTerritory {
    constructor(player, xz_chunk, likelihood = 0) {
        this.player = player;
        this.xz_chunk = xz_chunk;
        this.likelihood = likelihood;
    }
}
exports.AreaTerritory = AreaTerritory;
class RegionTerritory {
    constructor(area_territorys, spawn_position, dimention_id) {
        this.area_territorys = area_territorys;
        this.spawn_position = spawn_position;
        this.dimention_id = dimention_id;
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
class ConstPosition {
    constructor(x, y, z) {
        if (typeof x === "number") {
            this.x = Math.ceil(x);
            this.y = Math.ceil(y);
            this.z = Math.ceil(z);
        }
        else {
            this.x = Math.ceil(x.x);
            this.y = Math.ceil(x.y);
            this.z = Math.ceil(x.z);
        }
    }
}
exports.ConstPosition = ConstPosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFhLGFBQWE7SUFJdEIsWUFBWSxNQUFrQixFQUFFLFFBQWlCLEVBQUUsYUFBcUIsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFURCxzQ0FTQztBQUVELE1BQWEsZUFBZTtJQUl4QixZQUFZLGVBQXVDLEVBQUUsY0FBb0IsRUFBRSxZQUF5QjtRQUNoRyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFURCwwQ0FTQztBQUVELE1BQWEsZUFBZTtJQU94QixZQUFZLE1BQWtCLEVBQUUsT0FBcUIsRUFBRSxnQkFBd0MsRUFBRSxpQkFBdUIsSUFBSSxJQUFJLEVBQUU7UUFDOUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7Q0FDSjtBQWRELDBDQWNDO0FBRUQsTUFBYSxVQUFVO0lBR25CLFlBQVksSUFBWSxFQUFFLElBQVk7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBUEQsZ0NBT0M7QUFFRCxNQUFhLE9BQU87SUFHaEIsWUFBWSxDQUFTLEVBQUUsQ0FBUztRQUM1QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBUEQsMEJBT0M7QUFFRCxNQUFhLGFBQWE7SUFJdEIsWUFBWSxDQUFnQixFQUFFLENBQVUsRUFBRSxDQUFVO1FBQ2hELElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDSCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7Q0FDSjtBQWZELHNDQWVDIn0=