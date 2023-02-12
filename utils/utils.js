"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Territory = exports.console_message = exports.chat = exports.word = exports.root = exports.database = void 0;
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
            this.DATABASE_TERRITORY_PLAYERS = `${this.DATABASE_TERRITORY}/players`;
            this.DATABASE_BASICITEM = `${this.DATABASE}/basic_item`;
            this.DATABASE_MULTISERVER = `${this.DATABASE}/multi_server`;
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
    class Chat {
        begin(command) {
            return ` §l§f[${command}]`;
        }
        mid(message) {
            return `§l§f${message}`;
        }
    }
    Utils.Chat = Chat;
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
exports.chat = new Utils.Chat();
exports.console_message = new Utils.ConsoleMessage();
var Territory;
(function (Territory) {
    function make_xz_chunk(position) {
        return [Math.ceil(position.x / 8), Math.ceil(position.z / 8)];
    }
    Territory.make_xz_chunk = make_xz_chunk;
    function xz_chunk(areaTerritory) {
        return [areaTerritory.x_chunk, areaTerritory.z_chunk];
    }
    Territory.xz_chunk = xz_chunk;
    function area_json(x, z) {
        return `${x}_${z}.json`;
    }
    Territory.area_json = area_json;
    function player_json(ni) {
        return `${ni.getAddressHigh}_${ni.getAddressLow}.json`;
    }
    Territory.player_json = player_json;
})(Territory = exports.Territory || (exports.Territory = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxtQ0FBb0Q7QUFDcEQseUJBQXlCO0FBTXpCLElBQVUsS0FBSyxDQW1HZDtBQW5HRCxXQUFVLEtBQUs7SUFDWCxNQUFhLFFBQVE7UUFBckI7WUFVSSxlQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBVyxFQUFFO2dCQUN0RCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUM7WUFDRixXQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN6QyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxJQUFJLEdBQUc7d0JBQUUsTUFBTSxHQUFHLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1FBT04sQ0FBQztRQXZCRywwQkFBMEIsQ0FBQyxJQUFZO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxRQUFRLElBQUksS0FBSztnQkFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsU0FBaUI7WUFDcEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEU7UUFDTCxDQUFDO1FBU0QsSUFBSSxDQUFDLElBQVksRUFBRSxTQUFp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