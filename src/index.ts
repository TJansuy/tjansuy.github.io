import { BrowserQRCodeSvgWriter } from '@zxing/browser'

type qrType = {
    width: number,
    height: number
}

type qrLink = {text: string, link: string, qr?: qrType};

const QRType1: qrType = {
    width: 256,
    height: 256
}

const parseQrLink = (value: qrLink): HTMLElement => {
    // Construct the clickable Link element
    let element: HTMLElement = document.createElement('a');
    element.appendChild(document.createTextNode(value.text));
    element.setAttribute('href', value.link);
    element.setAttribute('id', '')
    
    // If there are QR Options, attempt to create a QR Code.
    if (value?.qr) {
        try {
            // Attempt to generator the QR Code using ZXing/browser
            const qr = new BrowserQRCodeSvgWriter().write(value.link, value.qr.width, value.qr.height)
            
            // Store it in an element above the link
            const container = document.createElement('div');
            container.setAttribute('class', 'QR-Code');
            container.appendChild(qr);
            container.appendChild(element);

            element = container;
        } catch (ignored) {
            // Oh well
            console.log('Unable to create QR Code!: ' + ignored)
        }
    }

    return element;
}

const createElements = (links: qrLink[]): void => {
    const root = document.getElementById('LinkContainer')
    links.map((val: qrLink) => {
        if (val.text && val.link) {
            const container = document.createElement('div');
            container.appendChild(parseQrLink(val));
            container.setAttribute('class', 'Link')
            root?.appendChild(container);
        }
    })
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
})