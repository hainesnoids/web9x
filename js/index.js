function runOld(programId) {
    const programData = programs[programId];
    let program;
    if (programData) {
        program = createProgram(programData.name, programData.content, programData.icon, programData.uDim, programId, programData);
    }
    if (programData.script) {
        const script = document.createElement('script');
        if (programData.script_is_module) {
            script.type = 'module';
        }
        script.src = programData.script;
        program.window.appendChild(script);
    }
    return !!program;
}

function run(programId) {
    function isURL() {
        try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    }
    if (isURL(programId)) {
        // external
    } else {
        // system program
        i=document.createElement('script');
        // tip: we can load every script as a module then use the window constructor to add global variables
        // new tip: we cant
        //i.type="module";
        i.src=`/programs/${programId}/program.js`;
        i.setAttribute("data-for-pid", newPid + 1);
        document.head.appendChild(i);
        /*fetch(`/programs/${programId}/program.js`)
            .then(async (r) => {return await r.text()})
            .then((js) => {
                // fuck it
                eval(js);
            })*/
    }
    return true;
}

function clock() {
    const date = new Date(Date.now());
    // const hour = ((date.getHours() - 1) % 12) + 1; for the americans out there
    const hour = String(date.getHours()).padStart(2,'0')
    const minute = String(date.getMinutes()).padStart(2,'0');

    document.getElementById('clock').innerText = `${hour}:${minute}`;
    window.requestAnimationFrame(clock);
}

document.addEventListener('DOMContentLoaded', () => {
    window.requestAnimationFrame(clock);
})

function loadModule(url, pid) {
    if (!pid) return false;
    i=document.createElement('script');
    // tip: we can load every script as a module then use the window constructor to add global variables
    i.src=url;
    i.setAttribute("data-for-pid", pid);
    document.head.appendChild(i);
    return true;
}
