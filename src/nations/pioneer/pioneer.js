"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("colors");
const fs_1 = require("fs");
const utils_1 = require("../../../utils/utils");
const root = new utils_1.Utils.Root();
let database;
database = (0, fs_1.existsSync)(root.DATABASE_AREA);
if (database == false)
    (0, fs_1.mkdirSync)(root.DATABASE_AREA);
database = (0, fs_1.existsSync)(root.DATABASE_PLAYERS);
if (database == false)
    (0, fs_1.mkdirSync)(root.DATABASE_PLAYERS);
//
const message = new utils_1.Utils.ConsoleMessage();
message.dos_log_server("pioneer_command Loading", colors_1.yellow, 3);
require("./pioneer_command");
message.dos_log_server("pioneer_command Loaded", colors_1.green, 3);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlvbmVlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpb25lZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBdUM7QUFDdkMsMkJBQTJDO0FBQzNDLGdEQUE2QztBQUU3QyxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM5QixJQUFJLFFBQVEsQ0FBQztBQUNiLFFBQVEsR0FBRyxJQUFBLGVBQVUsRUFBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUMsSUFBSSxRQUFRLElBQUksS0FBSztJQUFFLElBQUEsY0FBUyxFQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVyRCxRQUFRLEdBQUcsSUFBQSxlQUFVLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDN0MsSUFBSSxRQUFRLElBQUksS0FBSztJQUFFLElBQUEsY0FBUyxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3hELEVBQUU7QUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUUzQyxPQUFPLENBQUMsY0FBYyxDQUFDLHlCQUF5QixFQUFFLGVBQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3RCw2QkFBMkI7QUFDM0IsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxjQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==