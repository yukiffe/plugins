import { database, root } from "./utils";

export const tile_weight = new Map<string, number>();
const json = database.load("../plugins/main/utils", "tiles.json");

for (const key in json) {
    if (json.hasOwnProperty(key)) {
        tile_weight.set(key, json[key]);
    }
}
