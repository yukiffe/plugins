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
            return [Math.ceil(x / 8), Math.ceil(z / 8)];
        return [Math.ceil(x.x / 8), Math.ceil(x.z / 8)];
    }
    Maker.xz_process_chunk = xz_process_chunk;
    function xz_chunk(areaTerritory) {
        return [areaTerritory.xz_chunk.x, areaTerritory.xz_chunk.z];
    }
    Maker.xz_chunk = xz_chunk;
})(Maker = exports.Maker || (exports.Maker = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxtQ0FBb0Q7QUFDcEQseUJBQXlCO0FBT3pCLElBQVUsS0FBSyxDQWtHZDtBQWxHRCxXQUFVLEtBQUs7SUFDWCxNQUFhLFFBQVE7UUFBckI7WUFhSSxlQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBVyxFQUFFO2dCQUN0RCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUM7WUFDRixXQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN6QyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxJQUFJLEdBQUc7d0JBQUUsTUFBTSxHQUFHLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1FBT04sQ0FBQztRQTFCRywwQkFBMEIsQ0FBQyxJQUFZO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxRQUFRLElBQUksS0FBSztnQkFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsU0FBaUI7WUFDcEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEU7UUFDTCxDQUFDO1FBQ0QsV0FBVyxDQUFDLElBQVk7WUFDcEIsT0FB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