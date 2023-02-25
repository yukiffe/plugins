import { DimensionId } from "bdsx/bds/actor";
import { Chunk, PlayerNameXuid } from "../../utils/utils";

export class Value {
    public deposit: number; //100D = 100S = 100G fog mist haze
    public assimilate: number; //동화율
    public probability: number; //개연성

    constructor(deposit: number, assimilate: number, probability: number) {
        this.deposit = deposit;
        this.assimilate = assimilate;
        this.probability = probability;
    }
}

export class NationsArea {
    public chunk: Chunk;

    public region_name: string | null; //name_region
    public village_name: string | null; //name_village
    public country_name: string | null; //name_country

    constructor(chunk: Chunk, region_name: string | null, village_name: string | null, country_name: string | null) {
        this.chunk = chunk;
        this.region_name = region_name;
        this.village_name = village_name;
        this.country_name = country_name;
    }
}

/**토지 클래스  */
export class NationsRegion extends Value {
    public owner: PlayerNameXuid;
    public chunk: Chunk;

    public region_name: string;
    public area_nations: string[];
    public belong_village: string | null;
    public belong_country: string | null;

    constructor(
        owner: PlayerNameXuid,
        chunk: Chunk,
        area_nations: string[],
        region_name: string,
        belong_village: string | null,
        belong_country: string | null,
        money,
        assimilate,
        probability,
    ) {
        super(money, assimilate, probability);
        this.owner = owner;
        this.chunk = chunk;
        this.area_nations = area_nations;
        this.region_name = region_name;
        this.belong_village = belong_village;
        this.belong_country = belong_country;
    }
}

/**마을 클래스  */
export class NationsVillage extends Value {
    public owner: PlayerNameXuid;
    public members: PlayerNameXuid[];
    public chunk: Chunk;

    public village_name: string;
    public region_nations: string[];
    public belong_country: string | null;

    constructor(
        owner: PlayerNameXuid,
        members: PlayerNameXuid[],
        chunk: Chunk,
        region_nations: string[],
        village_name: string,
        belong_country: string | null,
        money,
        assimilate,
        deposit,
    ) {
        super(money, assimilate, deposit);
        this.owner = owner;
        this.members = members;
        this.chunk = chunk;
        this.region_nations = region_nations;
        this.village_name = village_name;
        this.belong_country = belong_country;
    }
}

/**국가 클래스  */
export class NationsCountry extends Value {
    public owner: PlayerNameXuid;
    public members: PlayerNameXuid[];
    public chunk: Chunk;

    public village_nations: string[];
    public country_name: string;

    constructor(owner: PlayerNameXuid, members: PlayerNameXuid[], chunk: Chunk, village_nations: string[], country_name: string, money, assimilate, deposit) {
        super(money, assimilate, deposit);
        this.owner = owner;
        this.members = members;
        this.chunk = chunk;
        this.village_nations = village_nations;
        this.country_name = country_name;
    }
}

//개인 디비
export class NationsPlayer extends Value {
    public ban: Boolean;
    public owner: PlayerNameXuid;
    public friends: PlayerNameXuid[];

    public belong_region: string | null; //player name_region
    public belong_village: string | null; //player name_village
    public belong_country: string | null; //player_name_country

    constructor(
        ban: Boolean,
        player_name_xuid: PlayerNameXuid,
        friends_name_xuid: PlayerNameXuid[],
        belong_region: string | null,
        belong_village: string | null,
        belong_country: string | null,
        money,
        assimilate,
        deposit,
    ) {
        super(money, assimilate, deposit);
        this.ban = ban;
        this.owner = player_name_xuid;
        this.friends = friends_name_xuid;
        this.belong_region = belong_region;
        this.belong_village = belong_village;
        this.belong_country = belong_country;
    }
}
