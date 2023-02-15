import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { XuidPlayer } from "./nations/region_base";
import { database } from "../utils/utils";

export class StoryBase {
    public player: XuidPlayer;
    public fairy_tale_ratio: number;
    public likelihood: number;

    public construct_time: Date;

    constructor(player: XuidPlayer, fairy_tale_ratio: number = 0, likelihood: number = 0, construct_time: Date = new Date()) {
        this.player = player;
        this.fairy_tale_ratio = fairy_tale_ratio;
        this.likelihood = likelihood;

        this.construct_time = construct_time;
    }
}
