(() => {
    // iframe-based window substitute script
    const id = "markpad";
    const title = "Markpad";

    const iframe = document.createElement("iframe");
    iframe.classList.add("content-frame");
    iframe.allowFullscreen = true;
    iframe.src = "https://markpad.ws4k.net";

    const process = createProgram(title, iframe, `/fsroot/Applications/${id}/icon.ico`, {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, id);
})()
