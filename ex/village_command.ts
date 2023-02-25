import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { nations_players } from "../src/nations";
import { Village } from "../src/nations/form/village_form";
import { NationsPlayer } from "../src/nations/nations_base";
import territory from "../src/nations/command/register/village_register";

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        const data_player_territory: NationsPlayer = nations_players.get(xuid)!;

        if (data_player_territory.belong_village === null) {//마을 유무 확인
            Village.not_exist_form(ni);
            // Region.form(ni);//토지있는플레이어
        } else {
            Village.exist_form(ni);
            //토지없는플레이어폼
        }
        if(params.enum1==="생성"){

        }else if(params.enum1==="이동"){
            Village.move(ni);
        }else if(params.enum1==="수락"){//이건 관리자한테만 뜨도록
            Village.
        }
    },
    {
        enum1: [command.enum("EnumType", "생성","이동",), true] // string enum
        //나중에 커맨드 추가
    },
);
