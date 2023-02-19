import { bedrockServer } from "bdsx/launcher";
import { territory_areas } from ".";
import { Chunk } from "./territory_base";

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function view_area(chunk: Chunk): void {
    const x = chunk.chunk_x * 8;
    const z = chunk.chunk_z * 8;
    for (let i = x; i < x + 8; i++) {
        for (let j = z; j < z + 8; j++) {
            if (i == x || i == x + 7 || j == z || j == z + 7) {
                bedrockServer.executeCommand(`/particle minecraft:portal_reverse_particle ${i} ${chunk.y} ${j}`);
            }
        }
    }
}

export function view_around(chunk: Chunk) {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (territory_areas.has(chunk.get_dxz_chunk_line())) {
                view_area(new Chunk(i, chunk.y, j, chunk.dimention_id));
            }
        }
    }
}

export function is_around_area(chunk: Chunk): boolean {
    for (let i = chunk.chunk_x - 2; i <= chunk.chunk_x + 2; i++) {
        for (let j = chunk.chunk_z - 2; j <= chunk.chunk_z + 2; j++) {
            if (territory_areas.has(chunk.get_dxz_chunk_line())) {
                //내 그룹이면 flase
                return true;
            }
        }
    }
    return false;
}
