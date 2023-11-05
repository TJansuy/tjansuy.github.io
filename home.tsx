const createElements = (links: string[][]) => {
    const root = document.getElementById("LinkContainer")
    links.map((val) => {
        let element = document.createElement("a");
        element.appendChild(document.createTextNode(val[0]));
        element.setAttribute("href", val[1]);
        root?.appendChild(document.createElement("div").appendChild(element));
    })
};

const links = [
    ["My github", "https://github.com/TJansuy"],
    ["", ""],
];
createElements(links)