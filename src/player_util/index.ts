import { events } from "bdsx/event";

events.playerUseItem.on(ev => {
    if (ev.itemStack.getName() === "나침반") {
        //form
    }
});
