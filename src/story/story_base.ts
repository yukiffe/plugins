import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export class StoryBase {
    public _player_name: string;
    public _create_time: Date;
    public _fairy_tale_ratio: number;
    public _likelihood: number;

    constructor(ni: NetworkIdentifier) {
        this._create_time = new Date();
        this._fairy_tale_ratio = 0;
        this._likelihood = 0;
        this._player_name = ni.getActor()?.getNameTag()!;
    }
}
