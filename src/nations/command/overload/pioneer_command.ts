import { nations_countrys, nations_players, nations_villages } from "../..";
import territory from "../register/pioneer_register";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "./../../territory_base";
import { nations_regions } from "./../../index";
import { Poineer } from "../../form/pioneer_form";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player_territory: TerritoryPlayer = nations_players.get(xuid)!;
        const belong_region: string | null = data_player_territory.belong_region;

        if (belong_region === null) {
            Poineer.form(ni);
        } else {
            actor.sendMessage("§l§c토지가 이미 존재합니다.");
            actor.sendMessage("§l§e/토지");
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
        //town
    },
);
