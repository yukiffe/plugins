import { nations_countrys, nations_players, nations_villages } from "../..";
import territory from "../register/village_register";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "./../../territory_base";
import { nations_regions } from "./../../index";
import { Village } from "../../form/village_form";
import { Country } from "../../form/country_form";

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
        const chunk = new Chunk(position.x, position.y, position.z, dimention_id);

        const data_player_territory: TerritoryPlayer = nations_players.get(xuid)!;

        if (data_player_territory.belong_country === null) {
            Country.not_exist_form(ni);
            // Region.form(ni);//토지있는플레이어
        } else {
            Country.exist_form(ni);
            //토지없는플레이어폼
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
    },
);
