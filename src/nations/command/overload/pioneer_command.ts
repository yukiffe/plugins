import { territory_countrys, territory_players, territory_villages } from "../..";
import { Maker } from "../../../../utils/utils";
import territory from "../register/territory";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "./../../territory_base";
import { territory_regions } from "./../../index";
import { Poineer } from "../../pioneer/pioneer_form";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;
        const actor = ni.getActor()!;
        const xuid = actor.getXuid();
        const name = actor.getNameTag();
        const player_name_xuid = new PlayerNameXuid(name, xuid);
        const position = actor.getPosition();
        const dimention_id = actor.getDimensionId();
        const chunk = new Chunk(position.x, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const belong_region: string | null = data_player_territory.belong_region;

        if (belong_region === null) {
            Poineer.form(ni);
        } else {
            actor.sendMessage("§l§4토지가 이미 존재합니다.");
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
    },
);
