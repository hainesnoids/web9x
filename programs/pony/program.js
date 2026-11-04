// iframe-based window substitute script
(() => {
    const id = "pony";
    const title = "Internet Dasher";

    const iframe = document.createElement("iframe");
    iframe.classList.add("content-frame");
    iframe.allowFullscreen = true;
    iframe.src = `/programs/${id}/index.html`;

    const process = createProgram(title, iframe, `/programs/${id}/icon.png`, {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, id);
})()
