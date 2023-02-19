import { territory_countrys, territory_players, territory_villages } from "../..";
import territory from "../register/region_territory";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "./../../territory_base";
import { territory_regions } from "./../../index";
import { Poineer } from "../../form/pioneer_form";
import { Region } from "../../form/region_form";

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

        const data_player_territory: TerritoryPlayer = territory_players.get(xuid)!;
        const belong_region: string | null = data_player_territory.belong_region;

        if (belong_region !== null) {
            Region.form(ni);
        } else {
            actor.sendMessage("§l§c소유중인 토지가 존재하지 않습니다.");
            actor.sendMessage("§l§e/개척");
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
    },
);
