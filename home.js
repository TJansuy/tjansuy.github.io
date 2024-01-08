"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("@zxing/browser");
const QRType1 = {
    width: 256,
    height: 256
};
const parseQrLink = (value) => {
    // Construct the clickable Link element
    let element = document.createElement('a');
    element.appendChild(document.createTextNode(value.text));
    element.setAttribute('href', value.link);
    element.setAttribute('id', '');
    // If there are QR Options, attempt to create a QR Code.
    if (value?.qr) {
        try {
            // Attempt to generator the QR Code using ZXing/browser
            const qr = new browser_1.BrowserQRCodeSvgWriter().write(value.link, value.qr.width, value.qr.height);
            // Store it in an element above the link
            const container = document.createElement('div');
            container.setAttribute('class', 'QR-Code');
            container.appendChild(qr);
            container.appendChild(element);
            element = container;
        }
        catch (ignored) {
            // Oh well
            console.log('Unable to create QR Code!: ' + ignored);
        }
    }
    return element;
};
const createElements = (links) => {
    const root = document.getElementById('LinkContainer');
    links.map((val) => {
        if (val.text && val.link) {
            const container = document.createElement('div');
            container.appendChild(parseQrLink(val));
            container.setAttribute('class', 'Link');
            root?.appendChild(container);
        }
    });
};
const links = [
    {
        text: 'My LinkedIn',
        link: 'https://www.linkedin.com/in/trixi-jansuy/',
        qr: QRType1
    },
    {
        text: 'My github',
        link: 'https://github.com/TJansuy',
    },
];
document.addEventListener('DOMContentLoaded', () => {
    createElements(links);
});
