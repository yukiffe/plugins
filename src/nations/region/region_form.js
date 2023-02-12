"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = exports.map = void 0;
const blockpos_1 = require("bdsx/bds/blockpos");
const form_1 = require("bdsx/bds/form");
const utils_1 = require("../../../utils/utils");
const root = new utils_1.Utils.Root();
const database = new utils_1.Utils.Database();
const chat = new utils_1.Utils.Chat();
exports.map = new Map(); //임시용
class Region {
    static async main_menu(ni) {
        const actor = ni.getActor();
        const areaTerritory = new utils_1.AreaTerritory(ni);
        const area_json = `${areaTerritory.x_chunk}_${areaTerritory.z_chunk}.json`;
        const user_json = `${ni.getAddressHigh}_${ni.getAddressLow}.json`;
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "명령어 제작중, 땅건축은 내 땅 내에서만 건축가능하게\n(외부로부터 보호되는 영역만 건축할수있도록 도와줌\n한번더누르면해제 ",
            buttons: [
                {
                    text: "§l§e땅 정보",
                },
                {
                    text: "§l§a땅 이동",
                },
                {
                    text: "§l§a땅 건축",
                },
                {
                    text: "§l§4땅 삭제",
                },
                {
                    text: "§l§f땅 확장(추가예정기능)",
                },
            ],
        });
        switch (res) {
            case 0:
                if (database.exist_file(root.DATABASE_AREA, area_json)) {
                    const data = database.load(root.DATABASE_AREA, area_json);
                    actor.sendMessage(chat.mid(`${data._player_name}님의 토지입니다.`));
                }
                else {
                    actor.sendMessage(chat.mid(`주인이 없는 토지입니다.`));
                }
                return;
            case 1:
                if (await this.check_cancel(ni, "땅 이동"))
                    return;
                if (database.exist_file(root.DATABASE_PLAYERS, user_json)) {
                    const data = database.load(root.DATABASE_PLAYERS, user_json);
                    actor.teleport(blockpos_1.Vec3.create(data._spawn_position));
                    actor.sendMessage(chat.mid(`${data._player_name}님의 땅으로 이동했습니다.`));
                }
                else {
                    actor.sendMessage(chat.mid(`가진 땅이 존재하지 않습니다.`));
                }
                return;
            case 2:
                if (await this.check_cancel(ni, "땅 건축"))
                    return;
                if (exports.map[actor.getNameTag()] === null || exports.map[actor.getNameTag()] === undefined || exports.map[actor.getNameTag()] === false) {
                    exports.map[actor.getNameTag()] = true;
                    actor.sendMessage(chat.mid("땅 전용 건축이 켜졌습니다."));
                }
                else {
                    exports.map[actor.getNameTag()] = false;
                    actor.sendMessage(chat.mid("땅 전용 건축이 꺼졌습니다."));
                }
            case 3:
                if (await this.check_cancel(ni, "땅 삭제(주의 복구불가)"))
                    return;
                actor.sendMessage(chat.mid("땅을 삭제했습니다."));
                if (database.exist_file(root.DATABASE_PLAYERS, user_json)) {
                    const data = database.load(root.DATABASE_PLAYERS, user_json);
                    const loc = data._spawn_position;
                    database.unlink(root.DATABASE_AREA, `${Math.ceil(loc.x / 8)}_${Math.ceil(loc.z / 8)}.json`);
                    database.unlink(root.DATABASE_PLAYERS, user_json);
                }
            default:
                actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
        }
    }
    static async check_cancel(ni, command) {
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: command,
            content: "명령어를 사용하시겠습니까?",
            buttons: [
                {
                    text: "§l§e확인",
                },
                {
                    text: "§l§a취소",
                },
            ],
        });
        if (res === 0 || res === null)
            return false;
        else
            return true;
    }
}
exports.Region = Region;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaW9uX2Zvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpb25fZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnREFBeUM7QUFDekMsd0NBQXFDO0FBR3JDLGdEQUE0RDtBQUc1RCxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUVqQixRQUFBLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBbUIsQ0FBQyxDQUFDLEtBQUs7QUFDcEQsTUFBYSxNQUFNO0lBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBcUI7UUFDeEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO1FBQzdCLE1BQU0sYUFBYSxHQUFHLElBQUkscUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLFNBQVMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sT0FBTyxDQUFDO1FBQzNFLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsYUFBYSxPQUFPLENBQUM7UUFDbEUsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxNQUFNO1lBQ2IsT0FBTyxFQUFFLHVFQUF1RTtZQUNoRixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2dCQUNEO29CQUNJLElBQUksRUFBRSxVQUFVO2lCQUNuQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLFVBQVU7aUJBQ25CO2dCQUNEO29CQUNJLElBQUksRUFBRSxrQkFBa0I7aUJBQzNCO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxRQUFRLEdBQUcsRUFBRTtZQUNULEtBQUssQ0FBQztnQkFDRixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRTtvQkFDcEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMxRCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsT0FBTztZQUNYLEtBQUssQ0FBQztnQkFDRixJQUFJLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO29CQUFFLE9BQU87Z0JBQ2hELElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLEVBQUU7b0JBQ3ZELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3RCxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLGdCQUFnQixDQUFDLENBQUMsQ0FBQztpQkFDckU7cUJBQU07b0JBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztpQkFDbkQ7Z0JBQ0QsT0FBTztZQUNYLEtBQUssQ0FBQztnQkFDRixJQUFJLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDO29CQUFFLE9BQU87Z0JBQ2hELElBQUksV0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxXQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssU0FBUyxJQUFJLFdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ2hILFdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7aUJBQ2xEO3FCQUFNO29CQUNILFdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7aUJBQ2xEO1lBQ0wsS0FBSyxDQUFDO2dCQUNGLElBQUksTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUM7b0JBQUUsT0FBTztnQkFDekQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLEVBQUU7b0JBQ3ZELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO29CQUNqQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ3JEO1lBQ0w7Z0JBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFxQixFQUFFLE9BQWU7UUFDNUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNEO29CQUNJLElBQUksRUFBRSxRQUFRO2lCQUNqQjthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7O1lBQ3ZDLE9BQU8sSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQXRGRCx3QkFzRkMifQ==