const createElements = (links: string[][]) => {
    const root = document.getElementById("LinkContainer")
    links.map((val) => {
        if (val[0] && val[1]) {
            let element = document.createElement("a");
            element.appendChild(document.createTextNode(val[0]));
            element.setAttribute("href", val[1]);

            let container = document.createElement("div");
            container.appendChild(element);
            container.setAttribute("class", "Link")
            root?.appendChild(container);
        }
    })
};

const links = [
    ["My github", "https://github.com/TJansuy"],
    ["My LinkedIn", "https://www.linkedin.com/in/trixi-jansuy/"],
    ["", ""],
];
createElements(links)