"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poineer = void 0;
const form_1 = require("bdsx/bds/form");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
const root = new utils_1.Utils.Root();
const database = new utils_1.Utils.Database();
const chat = new utils_1.Utils.Chat();
//
class Poineer {
    static async main_menu(ni) {
        const actor = ni.getActor();
        const areaTerritory = new utils_1.AreaTerritory(ni);
        const area_json = `${areaTerritory.x_chunk}_${areaTerritory.z_chunk}.json`;
        const res = await form_1.Form.sendTo(ni, {
            type: "form",
            title: "§l토지",
            content: "토지의 소유권을 주장합니다.",
            buttons: [
                {
                    text: "§l§e땅 정보",
                },
                {
                    text: "§l§a땅 개척",
                },
                {
                    text: "§l§c취소",
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
                if (database.exist_file(root.DATABASE_AREA, area_json)) {
                    const data = database.load(root.DATABASE_AREA, area_json);
                    actor.sendMessage(chat.mid(`§c땅 개척에 실패했습니다.`));
                    actor.sendMessage(chat.mid(`${data._player_name}님의 토지입니다.`));
                }
                else {
                    database.upload(root.DATABASE_AREA, area_json, areaTerritory);
                    database.upload(root.DATABASE_PLAYERS, `${ni.getAddressHigh}_${ni.getAddressLow}.json`, new region_base_1.RegionBase(ni, areaTerritory));
                    actor.sendMessage(chat.mid(`§a새로운 땅을 개척했습니다.`));
                }
                return;
            case 2:
                actor.sendMessage(chat.mid("§c땅 개척을 취소했습니다."));
                return;
            default:
                actor.sendMessage(chat.mid("§c명령어가 취소되었습니다."));
        }
    }
}
exports.Poineer = Poineer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUdyQyxnREFBNEQ7QUFDNUQsZ0RBQTRDO0FBRTVDLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RDLE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzlCLEVBQUU7QUFDRixNQUFhLE9BQU87SUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBcUI7UUFDeEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRyxDQUFDO1FBQzdCLE1BQU0sYUFBYSxHQUFHLElBQUkscUJBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLFNBQVMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sT0FBTyxDQUFDO1FBQzNFLE1BQU0sR0FBRyxHQUFHLE1BQU0sV0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsT0FBTyxFQUFFO2dCQUNMO29CQUNJLElBQUksRUFBRSxVQUFVO2lCQUNuQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLFFBQVE7aUJBQ2pCO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxRQUFRLEdBQUcsRUFBRTtZQUNULEtBQUssQ0FBQztnQkFDRixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRTtvQkFDcEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMxRCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsT0FBTztZQUNYLEtBQUssQ0FBQztnQkFDRixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRTtvQkFDcEQsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMxRCxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUM5RCxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLGFBQWEsT0FBTyxFQUFFLElBQUksd0JBQVUsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDM0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztpQkFDbkQ7Z0JBQ0QsT0FBTztZQUNYLEtBQUssQ0FBQztnQkFDRixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPO1lBQ1g7Z0JBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7Q0FDSjtBQWhERCwwQkFnREMifQ==