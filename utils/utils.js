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
            this.DATABASE_STORY = `${this.DATABASE}/story`;
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
        var _a;
        return `${(_a = ni.getActor()) === null || _a === void 0 ? void 0 : _a.getXuid()}.json`;
    }
    Territory.player_json = player_json;
})(Territory = exports.Territory || (exports.Territory = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxtQ0FBb0Q7QUFDcEQseUJBQXlCO0FBTXpCLElBQVUsS0FBSyxDQW9HZDtBQXBHRCxXQUFVLEtBQUs7SUFDWCxNQUFhLFFBQVE7UUFBckI7WUFVSSxlQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBVyxFQUFFO2dCQUN0RCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUM7WUFDRixXQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN6QyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxJQUFJLEdBQUc7d0JBQUUsTUFBTSxHQUFHLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1FBT04sQ0FBQztRQXZCRywwQkFBMEIsQ0FBQyxJQUFZO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxRQUFRLElBQUksS0FBSztnQkFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCx3QkFBd0IsQ0FBQyxJQUFZLEVBQUUsU0FBaUI7WUFDcEQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRTtnQkFDOUIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDaEU7UUFDTCxDQUFDO1FBU0QsSUFBSSxDQUFDLElBQVksRUFBRSxTQUFpQjtZQUNoQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQUUsSUFBUztZQUM3QyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0UsQ0FBQztLQUNKO0lBeEJZLGNBQVEsV0F3QnBCLENBQUE7SUFDRCxNQUFhLElBQUk7UUFBakI7WUFJVyxhQUFRLEdBQUcsYUFBYSxDQUFDO1lBQ3pCLHVCQUFrQixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsWUFBWSxDQUFDO1lBQ2xELDRCQUF1QixHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixPQUFPLENBQUM7WUFDNUQsOEJBQXlCLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLFNBQVMsQ0FBQztZQUNoRSwrQkFBMEIsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsVUFBVSxDQUFDO1lBQ2xFLHVCQUFrQixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsYUFBYSxDQUFDO1lBQ25ELHlCQUFvQixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsZUFBZSxDQUFDO1lBQ3ZELG1CQUFjLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxRQUFRLENBQUM7UUFDckQsQ0FBQztRQVhHLGFBQWEsQ0FBQyxhQUFrQixFQUFFLFNBQWlCO1lBQy9DLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMvQyxDQUFDO0tBU0o7SUFaWSxVQUFJLE9BWWhCLENBQUE7SUFDRCxNQUFhLEtBQUs7UUFBbEI7WUFDVyw0QkFBdUIsR0FBVyxZQUFZLENBQUM7WUFDL0MsMEJBQXFCLEdBQVcsV0FBVyxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUhZLFdBQUssUUFHakIsQ0FBQTtJQUNELE1BQWEsSUFBSTtRQUNiLEtBQUssQ0FBQyxPQUFlO1lBQ2pCLE9BQU8sU0FBUyxPQUFPLEdBQUcsQ0FBQztRQUMvQixDQUFDO1FBQ0QsR0FBRyxDQUFDLE9BQWU7WUFDZixPQUFPLE9BQU8sT0FBTyxFQUFFLENBQUM7UUFDNUIsQ0FBQztLQUNKO0lBUFksVUFBSSxPQU9oQixDQUFBO0lBQ0QsTUFBYSxRQUFRO1FBSWpCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxPQUFPO1lBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLE1BQU07WUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksS0FBSztZQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO0tBQ0o7SUFsQlksY0FBUSxXQWtCcEIsQ0FBQTtJQUNELE1BQWEsY0FBYztRQUV2QjtZQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsUUFBUSxDQUFDLE9BQWUsRUFBRSxVQUFVLEdBQUcsQ0FBQztZQUNwQyxRQUFRLE9BQU8sRUFBRTtnQkFDYixLQUFLLFFBQVE7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLFlBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDcEUsTUFBTTtnQkFDVixLQUFLLE9BQU87b0JBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLFlBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDbkUsTUFBTTtnQkFDVixRQUFRO2FBQ1g7UUFDTCxDQUFDO1FBQ0QsU0FBUztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUNELFFBQVEsQ0FBQyxRQUFnQixFQUFFLE9BQWUsRUFBRSxLQUFZLEVBQUUsYUFBcUIsQ0FBQztZQUM1RSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBRUQsZUFBZSxDQUFDLE9BQWUsRUFBRSxLQUFZLEVBQUUsYUFBcUIsQ0FBQztZQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFPLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25HLENBQUM7UUFDRCxjQUFjLENBQUMsT0FBZSxFQUFFLEtBQVksRUFBRSxhQUFxQixDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQU8sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkcsQ0FBQztLQUNKO0lBN0JZLG9CQUFjLGlCQTZCMUIsQ0FBQTtBQUNMLENBQUMsRUFwR1MsS0FBSyxLQUFMLEtBQUssUUFvR2Q7QUFFWSxRQUFBLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoQyxRQUFBLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixRQUFBLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN6QixRQUFBLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixRQUFBLGVBQWUsR0FBRyxJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUxRCxJQUFpQixTQUFTLENBYXpCO0FBYkQsV0FBaUIsU0FBUztJQUN0QixTQUFnQixhQUFhLENBQUMsUUFBeUI7UUFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRmUsdUJBQWEsZ0JBRTVCLENBQUE7SUFDRCxTQUFnQixRQUFRLENBQUMsYUFBNEI7UUFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFGZSxrQkFBUSxXQUV2QixDQUFBO0lBQ0QsU0FBZ0IsU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQzFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUZlLG1CQUFTLFlBRXhCLENBQUE7SUFDRCxTQUFnQixXQUFXLENBQUMsRUFBcUI7O1FBQzdDLE9BQU8sR0FBRyxNQUFBLEVBQUUsQ0FBQyxRQUFRLEVBQUUsMENBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztJQUM5QyxDQUFDO0lBRmUscUJBQVcsY0FFMUIsQ0FBQTtBQUNMLENBQUMsRUFiZ0IsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFhekIifQ==