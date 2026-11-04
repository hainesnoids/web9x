(() => {
    // iframe-based window substitute script
    const id = "slope";
    const title = "Slope";

    const iframe = document.createElement("iframe");
    iframe.classList.add("content-frame");
    iframe.allowFullscreen = true;
    iframe.src = `/programs/${id}/index.html`;

    const process = createProgram(title, iframe, `/programs/${id}/icon.png`, {x:20,y:20,w:854,h:480,minw:0,minh:0,resize:true}, id);
})()
