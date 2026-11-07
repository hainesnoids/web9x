(() => {
    // DOM-based window substitute script
    const id = "themes";
    const title = "Themes";

    const data = '<span>work in progress!</span>';

    function stringToDOM(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString;
        return div;
    }

    const process = createProgram(title, stringToDOM(data), `/fsroot/Applications/${id}/icon.ico`, {x:100,y:100,w:420,h:360,minw:0,minh:0,resize:false}, id);
})()
