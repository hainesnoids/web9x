function run(programId) {
    const programData = programs[programId];
    let program;
    if (programData) {
        program = createProgram(programData.name, programData.content, programData.icon, programData.uDim, programId);
    }
    if (programData.script) {
        const script = document.createElement('script');
        script.src = programData.script;
        program.window.appendChild(script);
    }
    return !!program;
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