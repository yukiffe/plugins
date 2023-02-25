import { nations_countrys, nations_players, nations_villages } from "../..";
import territory from "../register/friend_register";
import { nations_regions } from "../../index";
import { command } from "bdsx/command";
import { PlayerCommandSelector } from "bdsx/bds/command";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { PlayerNameXuid } from "../../../../utils/utils";

const friend = new Map<string, PlayerNameXuid>();

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        for (const targets of params.player.newResults(origin)) {
            const target = targets.getNetworkIdentifier().getActor();
            if (actor.getXuid() === target!.getXuid()) {
                actor.sendMessage("§l§c자기자신에게는 친구추가가 불가능합니다.");
                return;
            }
            actor.sendMessage("§l§a친구 추가요청을 보냈습니다");
            friend.set(target?.getXuid()!, new PlayerNameXuid(target?.getNameTag()!, xuid));
            target?.sendMessage("§l§g친구 추가 요청을 받았습니다. /수락 <닉네임>");
        }
    },
    {
        enum1: command.enum("EnumType", "신청"),
        player: PlayerCommandSelector,
    },
);

territory.overload(
    async (params, origin, output) => {
        const ni = origin.getEntity()?.getNetworkIdentifier();
        if (ni === undefined) return;

        const actor = ni.getActor()!;
        const xuid = actor.getXuid();

        if (friend.has(xuid)) {
            const data_player = nations_players.get(xuid);
            const data_target = nations_players.get(friend.get(xuid)!.xuid);
            data_player?.friends.push(friend.get(xuid)!);
            data_target?.friends.push(new PlayerNameXuid(actor.getNameTag(), xuid));
            friend.delete(xuid);
            //나랑 상대 추가
        }
    },
    {
        enum1: command.enum("EnumType", "수락"),
    },
);
