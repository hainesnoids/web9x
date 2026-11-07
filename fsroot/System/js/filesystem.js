window.fsRoot = "/fsroot";
const storageKey = "fs-1";

(() => {
    const initFs = {
        Applications: {},
        System: {
            css: {
                "root.css": "",
                "win98.css": "",
                "window.css": ""
            },
            icons: {
                "computer.ico": "",
                "directory.ico": "",
                "directory_open.ico": "",
                "executable.ico": "",
                "root_applications.ico": "",
                "root.ico": "",
                "root_network.ico": "",
                "root_system.ico": "",
                "root_users.ico": "",
                "root_volumes.ico": "",
                "user_config.ico": "",
                "user_desktop.ico": "",
                "user_documents.ico": "",
                "user_downloads.ico": "",
                "user_movies.ico": "",
                "user_pictures.ico": ""
            },
            js: {
                "filesystem.js": "",
                "index.js": "",
                "programs.js": "",
                "window.js": ""
            },
            res: {
                "favicon.png": "",
                "icon.png": "",
                "logo.png": "",
                "ms_sans_serif_bold.woff": "",
                "ms_sans_serif_bold.woff2": "",
                "ms_sans_serif.woff": "",
                "ms_sans_serif.woff2": ""
            }
        },
        Users: {
            web9x: {
                Desktop: {},
                Documents: {},
                Downloads: {},
                Movies: {},
                Music: {},
                Pictures: {},
                Themes: {}
            }
        }
    }

    function loadFS() {
        const saved = localStorage.getItem(storageKey);

        if (saved === null) {
            localStorage.setItem(storageKey, JSON.stringify(initFs));
            return structuredClone(initFs);
        }

        try {
            return JSON.parse(saved);
        } catch {
            localStorage.setItem(storageKey, JSON.stringify(initFs));
            return structuredClone(initFs);
        }
    }

    function normalizePath(path) {
        if (typeof path !== "string" || !path.trim()) {
            throw new TypeError("path must be a non-empty string");
        }

        const parts = path.replace(/\\/g, "/").split("/").filter(Boolean);

        if (parts[0] === "fsroot") parts.shift();

        if (parts.some(part => part === "." || part === "..")) {
            throw new Error("relative path segments are not supported");
        }

        return parts;
    }

    function getNode(parts) {
        let node = loadFS();

        for (const part of parts) {
            if (typeof node === "string" || !Object.hasOwn(node, part)) {
                return undefined;
            }
            node = node[part];
        }

        return node;
    }

    function saveFS(fs) {
        localStorage.setItem(storageKey, JSON.stringify(fs));
    }

    window.read = function(path) {
        const node = getNode(normalizePath(path));

        if (node === undefined) throw new Error(`path not found: ${path}`);
        if (typeof node !== "string") throw new Error(`not a file: ${path}`);

        return node;
    }

    window.readDir = function(path = window.fsRoot) {
        const node = getNode(normalizePath(path));

        if (node === undefined) throw new Error(`path not found: ${path}`);
        if (typeof node === "string") throw new Error(`not a directory: ${path}`);

        const mimeTypes = {
            css: "text/css",
            html: "text/html",
            js: "text/javascript",
            json: "application/json",
            ico: "image/x-icon",
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            svg: "image/svg+xml",
            woff: "font/woff",
            woff2: "font/woff2",
            txt: "text/plain"
        };

        return Object.entries(node).map(([name, child]) => {
            const isDirectory = typeof child !== "string";
            const extension = name.includes(".")
                ? name.split(".").pop().toLowerCase()
                : "";

            return {
                name,
                type: isDirectory ? "directory" : "file",
                mimetype: isDirectory
                    ? "inode/directory"
                    : mimeTypes[extension] || "application/octet-stream"
            };
        });
    };

    window.write = function(path, content) {
        const parts = normalizePath(path);
        if (parts.length === 0) throw new Error("cannot write to the filesystem root");

        const fs = loadFS();
        let directory = fs;

        for (const part of parts.slice(0, -1)) {
            if (directory[part] === undefined) {
                directory[part] = {};
            } else if (typeof directory[part] === "string") {
                throw new Error(`not a directory: ${part}`);
            }

            directory = directory[part];
        }

        directory[parts.at(-1)] = String(content);
        saveFS(fs);
    }
})()