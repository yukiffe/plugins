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

        const data_player_territory: TerritoryPlayer | undefined = territory_players.get(xuid);
        if (data_player_territory === undefined) return;

        const data_belong = data_player_territory.belong;
        let data_territory: undefined | TerritoryRegion | TerritoryVillage | TerritoryCountry;

        if (data_belong === null) {
            data_territory = undefined;
        } else {
            if (data_belong?.includes("@region@")) {
                data_territory = territory_regions.get(data_belong.replace("@region@", ""));
            } else if (data_belong?.includes("@village@")) {
                data_territory = territory_villages.get(data_belong.replace("@village@", ""));
            } else if (data_belong?.includes("@country@")) {
                data_territory = territory_countrys.get(data_belong.replace("@country@", ""));
            }
        } //국가가 사라질수도있으니까 체크
        if (data_territory === undefined) {
            Poineer.form(ni);
        } else {
            actor.sendMessage("§l§4토지가 이미 존재합니다.");
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
    },
);
