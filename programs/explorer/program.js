(() => {
    // DOM-based window substitute script
    const id = "explorer";
    const title = "File Explorer";

    const data = '<span>coming soon!</span>';

    function stringToDOM(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString;
        return div;
    }

    const process = createProgram(title, stringToDOM(data), `/programs/${id}/icon.ico`, {x:100,y:100,w:420,h:360,minw:0,minh:0,resize:false}, id);
})()
