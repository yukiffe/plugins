"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionBase = void 0;
class RegionBase {
    constructor(ni, territory) {
        const actor = ni.getActor();
        this._create_time = new Date();
        this._owner_actor = actor;
        this._member_actors = [actor];
        this._territory = territory;
        this._spawn_position = actor.getPosition();
    }
    add_chunk() { } //청크추가
    remove_chunk() { } //청크제거
} //나중에 absctract 추가
exports.RegionBase = RegionBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Jhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSxNQUFhLFVBQVU7SUFRbkIsWUFBWSxFQUFxQixFQUFFLFNBQTBDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFTSxTQUFTLEtBQUksQ0FBQyxDQUFDLE1BQU07SUFDckIsWUFBWSxLQUFJLENBQUMsQ0FBQyxNQUFNO0NBQ2xDLENBQUMsa0JBQWtCO0FBcEJwQixnQ0FvQkMifQ==