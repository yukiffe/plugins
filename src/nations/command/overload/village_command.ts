import { nations_players } from "../..";
import { NationsPlayer } from "../../nations_base";
import territory from "../register/village_register";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;

        if (data_player_territory.belong_village === null) {
            Village.not_exist_form(ni);
            // Region.form(ni);//토지있는플레이어
        } else {
            Village.exist_form(ni);
            //토지없는플레이어폼
        }
    },
    {
        // enum1: [command.enum("EnumType", "생성"), true] // string enum
        //나중에 커맨드 추가
    },
);
