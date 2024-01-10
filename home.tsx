import QRCode from 'qrcode';
import * as fs from 'fs';

const Links = [
    {content: 'Trixi Jansuy', style: 'Name'},
    {content: 'LinkedIn',
    href: 'https://www.linkedin.com/in/trixi-jansuy/',
    qr: {height: 256, width: 256},
    style: 'linkedin'},
    {content: 'Github', 
    href: 'https://github.com/TJansuy',
    style: 'github'},
];

type LinksType = {content: string, href?: string, qr?:{height: number, width: number}, style?: string};

const createElements = async (links: LinksType[]) => {
    let toReturn: string = "";

    for (const index in links) {
        const e = links[index];
        if(e.content && e.href) {
            if (e.qr && e.qr.height && e.qr.width) {
                const qr = await QRCode.toString(e.href, {type: "svg", height: e.qr.height, width: e.qr.width, errorCorrectionLevel: "H"} as QRCode.QRCodeToStringOptions);
                toReturn += `<div class="QR">${qr}</div>`;
            }
            toReturn += `<a class="Link${e.style ? ' ' + e.style : ''}" href="${e.href}"><div>${e.content}</div></a>`;
        } else if (e.content && e.style){
            toReturn += `<div class="${e.style}">${e.content}</div>`
        }
    }

    return toReturn;
};

createElements(Links).then((links) => {
    fs.writeFile('./index.html', 
    `<!DOCTYPE html>
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
    </html>`, () => {});
});