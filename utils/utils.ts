import { Actor, DimensionId } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { Color, magenta, red, white } from "colors";
import * as fs from "fs";
import { Position } from "source-map";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { int32_t } from "bdsx/nativetype";
import { AreaTerritory } from "../src/nations/region_base";

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
        exist_file = (path: string, file_name: string): boolean => {
            return fs.existsSync(`${path}/${file_name}`);
        };
        unlink = (path: string, file_name: string) => {
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
        DATABASE_AREA(DATABASE_AREA: any, area_json: string) {
            throw new Error("Method not implemented.");
        }
        public DATABASE = "../database";
        public DATABASE_TERRITORY = `${this.DATABASE}/territory`;
        public DATABASE_TERRITORY_AREA = `${this.DATABASE_TERRITORY}/area`;
        public DATABASE_TERRITORY_REGION = `${this.DATABASE_TERRITORY}/region`;
        public DATABASE_TERRITORY_PLAYERS = `${this.DATABASE_TERRITORY}/players`;
        public DATABASE_BASICITEM = `${this.DATABASE}/basic_item`;
        public DATABASE_MULTISERVER = `${this.DATABASE}/multi_server`;
        public DATABASE_STORY = `${this.DATABASE}/story`;
    }
    export class Words {
        public CUSTOM_COMMAND_OPERATOR: string = "관리자 전용 명령어";
        public CUSTOM_COMMAND_NORMAL: string = "유저 전용 명령어";
    }
    export class Chat {
        begin(command: string) {
            return ` §l§f[${command}]`;
        }
        mid(message: string) {
            return `§l§f${message}`;
        }
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
export const chat = new Utils.Chat();
export const console_message = new Utils.ConsoleMessage();

export namespace Territory {
    export function make_xz_chunk(position: BlockPos | Vec3): number[] {
        return [Math.ceil(position.x / 8), Math.ceil(position.z / 8)];
    }
    export function xz_chunk(areaTerritory: AreaTerritory): number[] {
        return [areaTerritory.x_chunk, areaTerritory.z_chunk];
    }
    export function area_json(x: number, z: number): string {
        return `${x}_${z}.json`;
    }
    export function player_json(ni: NetworkIdentifier): string {
        return `${ni.getActor()?.getXuid()}.json`;
    }
}
