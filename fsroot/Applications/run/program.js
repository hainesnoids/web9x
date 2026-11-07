(() => {
    // DOM-based window substitute script
    const id = "run";
    const title = "Run";

    const data = '<div class="run-input-field"><input type="text" id="run-input"><button id="run-submit">Run</button></div>';

    var div = document.createElement('div');
    div.innerHTML = data;

    div.querySelector('#run-submit').addEventListener('click', () => {
        const textValue = div.querySelector('#run-input').value;
        const success = run(textValue);
        if (success) {
            // kill run
            killProcess(process.pid);
        }
    })
    div.querySelector('#run-input').addEventListener('keydown',(e) => {
        if (e.key === 'Enter') {
            div.querySelector('#run-submit').click();
        }
    })

    const process = createProgram(title, div, `/fsroot/Applications/${id}/icon.ico`, {x:30,y:-30,w:240,h:64,minw:0,minh:0,resize:false}, id);

    div.querySelector('#run-input').focus();
})()
