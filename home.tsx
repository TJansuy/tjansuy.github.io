const createElements = (links: string[][]) => {
    const root = document.getElementById("LinkContainer")
    links.map((val, index) => {
        let element = document.createElement("div");
        element.appendChild(document.createTextNode(val[0]));
        element.setAttribute("href", val[1]);
        root?.appendChild(element);
    })
};

const links = [
    ["My github", "https://github.com/TJansuy"],
    ["", ""],
];
createElements(links);