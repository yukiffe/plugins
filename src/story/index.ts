import { green, yellow } from "colors";
import { existsSync, mkdirSync } from "fs";
import { console_message, database, root } from "./../../utils/utils";
import { StoryBase } from "../story_base";
import * as fs from "fs";

database.create_folder_if_not_exist(root.DATABASE_STORY);

export const story = new Map<string, StoryBase>();
const story_files = fs.readdirSync(root.DATABASE_STORY);
story_files.forEach(file => {
    const story_class: StoryBase = database.load(root.DATABASE_STORY, file);
    story.set(`${story_class.player.xuid}`, story_class);
});

console_message.dos_log_server("events Loading", yellow, 2);
import "./events/events";
console_message.dos_log_server("events Loaded", green, 2);
