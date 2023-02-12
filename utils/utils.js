"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionTerritory = exports.AreaTerritory = exports.Utils = void 0;
const colors_1 = require("colors");
const fs = require("fs");
1;
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
            this.root = new Root();
            this.create_folder_if_not_exist(this.root.DATABASE);
            this.create_folder_if_not_exist(this.root.DATABASE_AREA);
        }
        create_folder_if_not_exist(path) {
            const database = fs.existsSync(path);
            if (database == false)
                fs.mkdirSync(path);
        }
        create_file_if_not_exist(path) {
            if (fs.existsSync(path) == false) {
                fs.writeFileSync(path, JSON.stringify({}));
            }
        }
        load(path, file_name) {
            this.create_file_if_not_exist(`${path}/${file_name}`);
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
            this.DATABASE_AREA = `${this.DATABASE}/area`;
            this.DATABASE_REGION = `${this.DATABASE}/region`;
            this.DATABASE_PLAYERS = `${this.DATABASE}/players`;
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
        constructor() {
            this._initials = new Initials();
        }
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
})(Utils = exports.Utils || (exports.Utils = {}));
class AreaTerritory {
    constructor(ni) {
        const actor = ni.getActor();
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
exports.AreaTerritory = AreaTerritory;
class RegionTerritory {
    get area_territory() {
        return this._area_territory;
    }
}
exports.RegionTerritory = RegionTerritory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxtQ0FBb0Q7QUFDcEQseUJBQXlCO0FBQ3pCLENBQUMsQ0FBQztBQUVGLElBQWlCLEtBQUssQ0E0R3JCO0FBNUdELFdBQWlCLEtBQUs7SUFDbEIsTUFBYSxRQUFRO1FBRWpCO1lBY0EsZUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQVcsRUFBRTtnQkFDdEQsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDO1lBQ0YsV0FBTSxHQUFHLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQUUsRUFBRTtnQkFDekMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtvQkFDcEMsSUFBSSxHQUFHO3dCQUFFLE1BQU0sR0FBRyxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztZQXBCRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUNELDBCQUEwQixDQUFDLElBQVk7WUFDbkMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLFFBQVEsSUFBSSxLQUFLO2dCQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUNELHdCQUF3QixDQUFDLElBQVk7WUFDakMsSUFBSSxFQUFFLENB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