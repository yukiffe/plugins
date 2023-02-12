"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poineer = void 0;
const form_1 = require("bdsx/bds/form");
const utils_1 = require("../../../utils/utils");
const region_base_1 = require("../region_base");
class Poineer {
    static async main_menu(ni) {
        const actor = ni.getActor();
        const areaTerritory = new region_base_1.AreaTerritory(ni);
        const [x, z] = utils_1.Territory.xz_chunk(areaTerritory);
        const area_json = utils_1.Territory.area_json(x, z);
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
                if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_AREA, area_json)) {
                    const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
                    actor.sendMessage(utils_1.chat.mid(`${data._player_name}님의 토지입니다.`));
                }
                else {
                    actor.sendMessage(utils_1.chat.mid(`주인이 없는 토지입니다.`));
                }
                return;
            case 1:
                if (utils_1.database.exist_file(utils_1.root.DATABASE_TERRITORY_AREA, area_json)) {
                    const data = utils_1.database.load(utils_1.root.DATABASE_TERRITORY_AREA, area_json);
                    actor.sendMessage(utils_1.chat.mid(`§c땅 개척에 실패했습니다.`));
                    actor.sendMessage(utils_1.chat.mid(`${data._player_name}님의 토지입니다.`));
                }
                else {
                    utils_1.database.upload(utils_1.root.DATABASE_TERRITORY_AREA, area_json, areaTerritory);
                    utils_1.database.upload(utils_1.root.DATABASE_TERRITORY_PLAYERS, utils_1.Territory.player_json(ni), new region_base_1.RegionBase(ni, areaTerritory));
                    actor.sendMessage(utils_1.chat.mid(`§a새로운 땅을 개척했습니다.`));
                }
                return;
            case 2:
                actor.sendMessage(utils_1.chat.mid("§c땅 개척을 취소했습니다."));
                return;
            default:
                actor.sendMessage(utils_1.chat.mid("§c명령어가 취소되었습니다."));
        }
    }
}
exports.Poineer = Poineer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlcl9mb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGlvbmVlcl9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUFxQztBQUdyQyxnREFBdUU7QUFDdkUsZ0RBQTJEO0FBRTNELE1BQWEsT0FBTztJQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFxQjtRQUN4QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFHLENBQUM7UUFDN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSwyQkFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDakQsTUFBTSxTQUFTLEdBQUcsaUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLE1BQU0sV0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsTUFBTTtZQUNiLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsT0FBTyxFQUFFO2dCQUNMO29CQUNJLElBQUksRUFBRSxVQUFVO2lCQUNuQjtnQkFDRDtvQkFDSSxJQUFJLEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0Q7b0JBQ0ksSUFBSSxFQUFFLFFBQVE7aUJBQ2pCO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxRQUFRLEdBQUcsRUFBRTtZQUNULEtBQUssQ0FBQztnQkFDRixJQUFJLGdCQUFRLENBQUMsVUFBVSxDQUFDLFlBQUksQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsRUFBRTtvQkFDOUQsTUFBTSxJQUFJLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsWUFBSSxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNwRSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsT0FBTztZQUNYLEtBQUssQ0FBQztnQkFDRixJQUFJLGdCQUFRLENBQUMsVUFBVSxDQUFDLFlBQUksQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsRUFBRTtvQkFDOUQsTUFBTSxJQUFJLEdBQUcsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsWUFBSSxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNwRSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDSCxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFJLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUN4RSxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFJLENBQUMsMEJBQTBCLEVBQUUsaUJBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSx3QkFBVSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUMvRyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2lCQUNuRDtnQkFDRCxPQUFPO1lBQ1gsS0FBSyxDQUFDO2dCQUNGLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE9BQU87WUFDWDtnQkFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3REO0lBQ0wsQ0FBQztDQUNKO0FBakRELDBCQWlEQyJ9