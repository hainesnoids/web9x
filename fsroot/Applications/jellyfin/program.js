(() => {
    // iframe-based window substitute script
    const id = "jellyfin";
    const title = "Jellyfin";

    const iframe = document.createElement("iframe");
    iframe.classList.add("content-frame");
    iframe.allowFullscreen = true;
    iframe.src = "https://jellyfin.ws4k.net/web/#/selectserver";

    const process = createProgram(title, iframe, `/fsroot/Applications/${id}/icon.png`, {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, id);
})()
