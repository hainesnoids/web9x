(() => {
    // DOM-based window substitute script
    const browser = document.createElement('div');
    browser.classList.add("explorer");
    browser.classList.add("content-frame");

    const process = createProgram("File Explorer", browser, `/fsroot/Applications/explorer/icon.ico`, {x:100,y:100,w:420,h:360,minw:0,minh:0,resize:true}, "explorer");
    const shadow = browser.attachShadow({mode: "open"});

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/fsroot/Applications/explorer/explorer.css";
    shadow.appendChild(stylesheet);

    const dirView = document.createElement("div");
    dirView.classList.add("directory-view");
    shadow.appendChild(dirView);

    // the kinda fun part
    let currentDir = "/";
    const initialDir = "/";
    const homeFolder = "/Users/web9x";
    const pathIcons = {
        "/": "root",
        "/Users": "root_users",
        "/System": "root_system",
        "/Applications": "root_applications",
        "~/Desktop": "user_desktop",
        "~/Documents": "user_documents",
        "~/Pictures": "user_pictures",
        "~/Movies": "user_movies",
        "~/Downloads": "user_downloads",
        "~/Config": "user_config",
    }
    function determineIcon(dirItem, path) {
        let icon;
        const itemPath = `${path === "/" ? "" : path === homeFolder ? "~" : path}/${dirItem.name}`;
        if (pathIcons[itemPath]) {
            icon = pathIcons[itemPath];
        } else if (dirItem.type === "directory") {
            icon = "directory";
        } else {
            icon = `mimetypes/${dirItem.mimetype.replace("/","_")}`;
        }
        return `${fsRoot}/System/icons/${icon}.ico`
    }
    function readAndDisplayDirectory(path) {
        dirView.querySelectorAll("button").forEach((node) => {node.remove()});
        const contents = readDir(path);
        currentDir = path;
        contents.forEach((file) => {
            // <button class="file win98-unstyled"><img src="/fsroot/Applications/explorer/icon.ico"><span>File Explorer</span></button>
            const button = document.createElement("button");
            button.classList.add("file", "win98-unstyled");
            button.addEventListener("dblclick", () => {readAndDisplayDirectory(`${currentDir}${currentDir === "/"?"":"/"}${file.name}`)});

            const fileIcon = document.createElement("img");
            fileIcon.src = determineIcon(file, path);
            const fileName = document.createElement("span");
            fileName.innerText = file.name;
            button.append(fileIcon,fileName);
            dirView.appendChild(button);
        })
    }
    readAndDisplayDirectory(initialDir);
})()
