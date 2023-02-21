import { nations_countrys, nations_players, nations_villages } from "../..";
import territory from "../register/region_register";
import { Chunk, PlayerNameXuid, NationsCountry, NationsPlayer, NationsRegion, NationsVillage } from "../../nations_base";
import { nations_regions } from "./../../index";
import { Poineer } from "../../form/pioneer_form";
import { Region } from "../../form/region_form";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;

        if (data_player_territory.belong_region !== null) {
            Region.not_exist_form(ni);
        } else {
            //추가) 코드추가
            Region.exist_form(ni);
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
    },
);
