import { ItemStack } from "bdsx/bds/inventory";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { database, root } from "../../utils/utils";

events.playerJoin.on(ev => {
    const player = ev.player;
    const itemStack = database.load(root.DATABASE_BASICITEM, "basic_item.json");
    //추후 코드 추가 예정
});
