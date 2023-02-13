import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { database } from "./../../utils/utils";

export class StoryBase {
    public _xuid: string;
    public _name: string;
    public _fairy_tale_ratio: number;
    public _likelihood: number;

    public _construct_time: Date;

    constructor(xuid: string, name: string, fairy_tale_ratio: number = 0, likelihood: number = 0, construct_time: Date = new Date()) {
        this._xuid = xuid;
        this._name = name;
        this._fairy_tale_ratio = fairy_tale_ratio;
        this._likelihood = likelihood;

        this._construct_time = construct_time;
    }
    get xuid() {
        return this._xuid;
    }
    get name() {
        return this._name;
    }
    get fairy_tale_ratio() {
        return this._fairy_tale_ratio;
    }
    get likelihood() {
        return this._likelihood;
    }
    get construct_time() {
        return this._construct_time;
    }
}
