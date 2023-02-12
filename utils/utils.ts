import { Actor, DimensionId } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { Color, magenta, red, white } from "colors";
import * as fs from "fs";
1;

export namespace Utils {
    export class Database {
        private root: Root;
        constructor() {
            this.root = new Root();
            this.create_folder_if_not_exist(this.root.DATABASE);
            this.create_folder_if_not_exist(this.root.DATABASE_AREA);
        }
        create_folder_if_not_exist(path: string): void {
            const database = fs.existsSync(path);
            if (database == false) fs.mkdirSync(path);
        }
        create_file_if_not_exist(path: string): void {
            if (fs.existsSync(path) == false) {
                fs.writeFileSync(path, JSON.stringify({}));
            }
        }
        exist_file = (path: string, file_name: string): boolean => {
            return fs.existsSync(`${path}/${file_name}`);
        };
        unlink = (path: string, file_name: string) => {
            fs.unlink(`${path}/${file_name}`, err => {
                if (err) throw err;
            });
        };
        load(path: string, file_name: string): any {
            this.create_file_if_not_exist(`${path}/${file_name}`);
            return JSON.parse(fs.readFileSync(`${path}/${file_name}`, "utf8"));
        }
        upload(path: string, file_name: string, data: any): void {
            fs.writeFileSync(`${path}/${file_name}`, JSON.stringify(data), "utf8");
        }
    }
    export class Root {
        public DATABASE = "../database";
        public DATABASE_AREA = `${this.DATABASE}/area`;
        public DATABASE_REGION = `${this.DATABASE}/region`;
        public DATABASE_PLAYERS = `${this.DATABASE}/players`;
    }
    export class Words {
        public CUSTOM_COMMAND_OPERATOR: string = "관리자 전용 명령어";
        public CUSTOM_COMMAND_NORMAL: string = "유저 전용 명령어";
    }
    export class Chat {
        private _initials;
        constructor() {
            this._initials = new Initials();
        }
        begin(command: string) {
            return ` §l§f[${command}]`;
        }
        mid(message: string) {
            return `§l§f${message}`;
        }
    }
    export class Initials {
        private _title: string;
        private _mid_spot: string;
        private _bottom_spot: string;
        private _keyword: string;
        private _auther: string;
        constructor() {
            this._title = "[Server]: 서버 종합 플러그인";
            this._mid_spot = "ㆍ";
            this._bottom_spot = "。";
            this._keyword = "㏜";
            this._auther = "yukiffe";
        }
        get keyword() {
            return this._keyword;
        }
        get auther() {
            return this._auther;
        }
        get title() {
            return this._title;
        }
    }
    export class ConsoleMessage {
        private _initials;
        constructor() {
            this._initials = new Initials();
        }
        specific(command: string, tree_depth = 0) {
            switch (command) {
                case "auther":
                    this.dos_info(command, `${this._initials.auther}`, red, tree_depth);
                    break;
                case "title":
                    this.dos_info(command, `${this._initials.title}`, red, tree_depth);
                    break;
                default:
            }
        }
        dos_space() {
            console.log("");
        }
        dos_info(specific: string, message: string, color: Color, tree_depth: number = 0) {
            console.info(`${" ".repeat(tree_depth)}${specific}: ${color(message)}`);
        }

        dos_info_server(message: string, color: Color, tree_depth: number = 0) {
            console.info(`${" ".repeat(tree_depth)}${magenta(this._initials.keyword)}: ${color(message)}`);
        }
        dos_log_server(message: string, color: Color, tree_depth: number = 0) {
            console.info(`${" ".repeat(tree_depth)}${magenta(this._initials.keyword)}: ${color(message)}`);
        }
    }
}

export class AreaTerritory {
    private _x_chunk: number;
    private _z_chunk: number;
    private _dimention: DimensionId;
    private _ni: NetworkIdentifier;
    private _player_name: string;
    constructor(ni: NetworkIdentifier) {
        const actor = ni.getActor()!;
        const position = actor.getPosition();
        const region = actor.getRegion();
        const dimention = region.getDimensionId();
        this._x_chunk = Math.ceil(position.x / 8);
        this._z_chunk = Math.ceil(position.z / 8);
        this._dimention = dimention;
        this._ni = ni;
        this._player_name = actor.getNameTag();
    }
    get x_chunk() {
        return this._x_chunk;
    }
    get z_chunk() {
        return this._z_chunk;
    }
    get dimention() {
        return this._dimention;
    }
    get ni() {
        return this._ni;
    }
    get player_name() {
        return this._player_name;
    }
}

export class RegionTerritory {
    private _area_territory: AreaTerritory[];
    get area_territory() {
        return this._area_territory;
    }
}
