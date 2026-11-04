(() => {
    // iframe-based window substitute script
    const id = "wscn";
    const title = "Weatherscan";

    const iframe = document.createElement("iframe");
    iframe.classList.add("content-frame");
    iframe.allowFullscreen = true;
    iframe.src = "https://v1.weatherscan.net/";

    const process = createProgram(title, iframe, `/programs/${id}/icon.png`, {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, id);
})()
