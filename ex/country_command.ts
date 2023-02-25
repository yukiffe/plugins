import { nations_countrys, nations_players, nations_villages } from "../src/nations";
import territory from "../src/nations/command/register/country_register";
import { Chunk, PlayerNameXuid, NationsCountry, NationsPlayer, NationsRegion, NationsVillage } from "../src/nations/nations_base";
import { nations_regions } from "../src/nations/index";
import { Poineer } from "../src/nations/form/pioneer_form";
import { Country } from "../src/nations/form/country_form";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;

        if (data_player_territory.belong_country === null) {
            Country.not_exist_form(ni);
        } else {
            Country.exist_form(ni);
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
        //town
    },
);
