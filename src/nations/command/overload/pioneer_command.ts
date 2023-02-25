import { events } from "bdsx/event";
import { nations_players } from "../..";
import { Poineer } from "../../form/pioneer_form";
import { NationsPlayer } from "../../nations_base";
import territory from "../register/pioneer_register";

territory.overload(async (params, origin, output) => {
    const ni = origin.getEntity()?.getNetworkIdentifier()!;
    Poineer.create_region(ni);
}, {});
