"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maker = exports.console_message = exports.word = exports.root = exports.database = void 0;
const colors_1 = require("colors");
const fs = require("fs");
var Utils;
(function (Utils) {
    class Database {
        constructor() {
            this.exist_file = (path, file_name) => {
                return fs.existsSync(`${path}/${file_name}`);
            };
            this.unlink = (path, file_name) => {
                if (this.exist_file(path, file_name))
                    fs.unlink(`${path}/${file_name}`, err => {
                        if (err)
                            throw err;
                    });
            };
        }
        create_folder_if_not_exist(path) {
            const database = fs.existsSync(path);
            if (database == false)
                fs.mkdirSync(path);
        }
        create_file_if_not_exist(path, file_name) {
            if (fs.existsSync(path) == false) {
                fs.writeFileSync(`${path}/${file_name}`, JSON.stringify({}));
            }
        }
        get_folders(path) {
            return fs.readdirSync(path);
        }
        load(path, file_name) {
            return JSON.parse(fs.readFileSync(`${path}/${file_name}`, "utf8"));
        }
        upload(path, file_name, data) {
            fs.writeFileSync(`${path}/${file_name}`, JSON.stringify(data), "utf8");
        }
    }
    Utils.Database = Database;
    class Root {
        constructor() {
            this.DATABASE = "../database";
            this.DATABASE_TERRITORY = `${this.DATABASE}/territory`;
            this.DATABASE_TERRITORY_AREA = `${this.DATABASE_TERRITORY}/area`;
            this.DATABASE_TERRITORY_REGION = `${this.DATABASE_TERRITORY}/region`;
            this.DATABASE_TERRITORY_VILLAGE = `${this.DATABASE_TERRITORY}/village`;
            this.DATABASE_TERRITORY_COUNTRY = `${this.DATABASE_TERRITORY}/country`;
            this.DATABASE_TERRITORY_PLAYER = `${this.DATABASE_TERRITORY}/players`;
            this.DATABASE_BASICITEM = `${this.DATABASE}/basic_item`;
            this.DATABASE_MULTISERVER = `${this.DATABASE}/multi_server`;
            this.DATABASE_STORY = `${this.DATABASE}/story`;
            this.DATABASE_STORY_ITEMS = `${this.DATABASE}/story/items`;
        }
        DATABASE_AREA(DATABASE_AREA, area_json) {
            throw new Error("Method not implemented.");
        }
    }
    Utils.Root = Root;
    class Words {
        constructor() {
            this.CUSTOM_COMMAND_OPERATOR = "관리자 전용 명령어";
            this.CUSTOM_COMMAND_NORMAL = "유저 전용 명령어";
        }
    }
    Utils.Words = Words;
    class Initials {
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
    Utils.Initials = Initials;
    class ConsoleMessage {
        constructor() {
            this._initials = new Initials();
        }
        specific(command, tree_depth = 0) {
            switch (command) {
                case "auther":
                    this.dos_info(command, `${this._initials.auther}`, colors_1.red, tree_depth);
                    break;
                case "title":
                    this.dos_info(command, `${this._initials.title}`, colors_1.red, tree_depth);
                    break;
                default:
            }
        }
        dos_space() {
            console.log("");
        }
        dos_info(specific, message, color, tree_depth = 0) {
            console.info(`${" ".repeat(tree_depth)}${specific}: ${color(message)}`);
        }
        dos_info_server(message, color, tree_depth = 0) {
            console.info(`${" ".repeat(tree_depth)}${(0, colors_1.magenta)(this._initials.keyword)}: ${color(message)}`);
        }
        dos_log_server(message, color, tree_depth = 0) {
            console.info(`${" ".repeat(tree_depth)}${(0, colors_1.magenta)(this._initials.keyword)}: ${color(message)}`);
        }
    }
    Utils.ConsoleMessage = ConsoleMessage;
})(Utils || (Utils = {}));
exports.database = new Utils.Database();
exports.root = new Utils.Root();
exports.word = new Utils.Words();
exports.console_message = new Utils.ConsoleMessage();
var Maker;
(function (Maker) {
    function xz_area_line(x, z) {
        return `${x}_${z}`;
    }
    Maker.xz_area_line = xz_area_line;
    function xz_process_chunk(x, z) {
        if (typeof x === "number")
            return [Math.floor(x / 8), Math.floor(z / 8)];
        return [Math.floor(x.x / 8), Math.floor(x.z / 8)];
    }
    Maker.xz_process_chunk = xz_process_chunk;
    function xz_chunk(areaTerritory) {
        return [areaTerritory.chunk.chunk_x, areaTerritory.chunk.chunk_z];
    }
    Maker.xz_chunk = xz_chunk;
})(Maker = exports.Maker || (exports.Maker = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxtQ0FBb0Q7QUFDcEQseUJBQXlCO0FBS3pCLElBQVUsS0FBSyxDQW1HZDtBQW5HRCxXQUFVLEtBQUs7SUFDWCxNQUFhLFFBQVE7UUFBckI7WUFhSSxlQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBVyxFQUFFO2dCQUN0RCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUM7WUFDRixXQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztvQkFDaEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTt3QkFDcEMsSUFBSSxHQUFHOzRCQUFFLE1BQU0sR0FBRyxDQUFDO29CQUN2QixDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQztRQU9OLENBQUM7UUEzQkcsMEJBQTBCLENBQUMsSUFBWTtZQUNuQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksUUFBUSxJQUFJLEtBQUs7Z0JBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0Qsd0JBQXdCLENBQUMsSUFBWSxFQUFFLFNBQWlCO1lBQ3BELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7Z0JBQzlCLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FB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