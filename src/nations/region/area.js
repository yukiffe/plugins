"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("../../utils/utils");
const region_base_1 = require("../region_base");
const root = new utils_1.Utils.Root();
const database = (0, fs_1.existsSync)(root.DATABASE_AREA);
if (database == false)
    (0, fs_1.mkdirSync)(root.DATABASE_AREA);
class Area extends region_base_1.RegionBase {
    // constructor() {
    //     super();//플레이어, 땅종류
    // } 나중에 추가
    pioneer(ni) { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQkFBMkM7QUFDM0MsNkNBQTBDO0FBQzFDLGdEQUE0QztBQUc1QyxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUU5QixNQUFNLFFBQVEsR0FBRyxJQUFBLGVBQVUsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDaEQsSUFBSSxRQUFRLElBQUksS0FBSztJQUFFLElBQUEsY0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVyRCxNQUFNLElBQUssU0FBUSx3QkFBVTtJQUN6QixrQkFBa0I7SUFDbEIsMEJBQTBCO0lBQzFCLFdBQVc7SUFDWCxPQUFPLENBQUMsRUFBcUIsSUFBRyxDQUFDO0NBQ3BDIn0=