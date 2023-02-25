import { Form } from "bdsx/bds/form";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export class FormUtils {
    static async form_cancel(ni: NetworkIdentifier, command: string, content: string): Promise<boolean> {
        const res = await Form.sendTo(ni, {
            type: "form",
            title: command,
            content: content,
            buttons: [
                {
                    text: "§l§e확인",
                },
                {
                    text: "§l§c취소",
                },
            ],
        });
        if (res === 1 || res === null) return true;
        else return false;
    }
}
