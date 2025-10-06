document.querySelector('#run-submit').addEventListener('click', () => {
    const textValue = document.querySelector('#run-input').value;
    const success = run(textValue);
    if (success) {
        // kill run
        const process = processes.filter((x) => x.id === 'run')[0];
        killProcess(process.pid);
    }
})
document.querySelector('.run-input-field').addEventListener('keydown',(e) => {
    if (e.key === 'Enter') {
        document.querySelector('#run-submit').click();
    }
})