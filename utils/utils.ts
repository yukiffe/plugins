import { Actor, DimensionId } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { Color, magenta, red, white } from "colors";
import * as fs from "fs";
import { Position } from "source-map";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { NationsArea } from "../src/nations/nations_base";

namespace Utils {
    export class Database {
        create_folder_if_not_exist(path: string): void {
            const database = fs.existsSync(path);
            if (database == false) fs.mkdirSync(path);
        }
        create_file_if_not_exist(path: string, file_name: string): void {
            if (fs.existsSync(path) == false) {
                fs.writeFileSync(`${path}/${file_name}`, JSON.stringify({}));
            }
        }
        get_folders(path: string): string[] {
            return fs.readdirSync(path);
        }
        exist_file = (path: string, file_name: string): boolean => {
            return fs.existsSync(`${path}/${file_name}`);
        };
        unlink = (path: string, file_name: string) => {
            if (this.exist_file(path, file_name))
                fs.unlink(`${path}/${file_name}`, err => {
                    if (err) throw err;
                });
        };
        load(path: string, file_name: string): any {
            return JSON.parse(fs.readFileSync(`${path}/${file_name}`, "utf8"));
        }
        upload(path: string, file_name: string, data: any): void {
            fs.writeFileSync(`${path}/${file_name}`, JSON.stringify(data), "utf8");
        }
    }
    export class Root {
        public DATABASE = "../database";
        public DATABASE_NATIONS = `${this.DATABASE}/nations`;
        public DATABASE_NATIONS_AREA = `${this.DATABASE_NATIONS}/area`;
        public DATABASE_NATIONS_REGION = `${this.DATABASE_NATIONS}/region`;
        public DATABASE_NATIONS_VILLAGE = `${this.DATABASE_NATIONS}/village`;
        public DATABASE_NATIONS_COUNTRY = `${this.DATABASE_NATIONS}/country`;
        public DATABASE_PLAYER = `${this.DATABASE}/players`;
        public DATABASE_STORY = `${this.DATABASE}/story`;
        // public DATABASE_STORY_DESTROY = `${this.DATABASE_STORY}/break`;
        // public DATABASE_STORY_PLACE = `${this.DATABASE_STORY}/place`;
    }
    export class Words {
        public CUSTOM_COMMAND_OPERATOR: string = "관리자 전용 명령어";
        public CUSTOM_COMMAND_NORMAL: string = "유저 전용 명령어";
    }
    export class Initials {
        private _title: string;
        private _keyword: string;
        private _auther: string;
        constructor() {
            this._title = "[Server]: 서버 종합 플러그인";
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

export const database = new Utils.Database();
export const root = new Utils.Root();
export const word = new Utils.Words();
export const console_message = new Utils.ConsoleMessage();

export class PlayerNameXuid {
    public name: string;
    public xuid: string;

    constructor(name: string, xuid: string) {
        this.name = name;
        this.xuid = xuid;
    }
}

export class Chunk {
    public x: number;
    public y: number;
    public z: number;
    public chunk_x: number;
    public chunk_z: number;
    public dimention_id: DimensionId;

    constructor(x: number, y: number, z: number, dimention_id: DimensionId) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.chunk_x = Math.floor(x / 8);
        this.chunk_z = Math.floor(z / 8);
        this.dimention_id = dimention_id;
    }

    public get_dxz(): number[] {
        return [this.dimention_id, this.x, this.z];
    }
    public get_dxz_chunk(): number[] {
        return [this.dimention_id, this.chunk_x, this.chunk_z];
    }
    public get_dxyz(): number[] {
        return [this.dimention_id, this.x, this.y, this.z];
    }
    public get_dxyz_round(): number[] {
        return [this.dimention_id, Math.round(this.x * 10) / 10, Math.round(this.y * 10) / 10, Math.round(this.z * 10) / 10];
    }
    public get_dxyz_round_split(char: string): string {
        return this.get_dxyz_round().join(char);
    }
    public get_dxyz_chunk_split(char: string): string {
        return this.get_dxz_chunk().join(char);
    }
    public get_dxz_chunk_line(): string {
        return `${this.dimention_id}_${this.chunk_x}_${this.chunk_z}`;
    }
}
