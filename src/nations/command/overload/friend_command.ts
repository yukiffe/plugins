import { nations_countrys, nations_players, nations_villages } from "../..";
import territory from "../register/friend_register";
import { Chunk, PlayerNameXuid, TerritoryCountry, TerritoryPlayer, TerritoryRegion, TerritoryVillage } from "./../../territory_base";
import { nations_regions } from "./../../index";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player_territory: TerritoryPlayer = nations_players.get(xuid)!;
        const belong_region: string | null = data_player_territory.belong_region;

        if (belong_region === null) {
            //친구신청
            //프로필에서 친구 신청 만들기
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
        //town
    },
);
