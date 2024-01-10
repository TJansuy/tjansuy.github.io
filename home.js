var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import QRCode from 'qrcode';
import * as fs from 'fs';
const Links = [
    { content: 'Trixi Jansuy', style: 'Name' },
    { content: 'LinkedIn',
        href: 'https://www.linkedin.com/in/trixi-jansuy/',
        qr: { height: 256, width: 256 },
        style: 'linkedin' },
    { content: 'Github',
        href: 'https://github.com/TJansuy',
        style: 'github' },
];
const createElements = (links) => __awaiter(void 0, void 0, void 0, function* () {
    let toReturn = "";
    for (const index in links) {
        const e = links[index];
        if (e.content && e.href) {
            if (e.qr && e.qr.height && e.qr.width) {
                const qr = yield QRCode.toString(e.href, { type: "svg", height: e.qr.height, width: e.qr.width, errorCorrectionLevel: "H" });
                toReturn += `<div class="QR">${qr}</div>`;
            }
            toReturn += `<a class="Link${e.style ? ' ' + e.style : ''}" href="${e.href}"><div>${e.content}</div></a>`;
        }
        else if (e.content && e.style) {
            toReturn += `<div class="${e.style}">${e.content}</div>`;
        }
    }
    return toReturn;
});
createElements(Links).then((links) => {
    fs.writeFile('./index.html', `<!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css"/>
            <link rel="stylesheet" href="index.css">
        </head>
        <body>
            <div id="LinkContainer">
                ${links}
            </div>
        </body>
    </html>`, () => { });
});
