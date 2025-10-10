/*
    uDim = {x, y, w, h}
    x = position x
    y = position y
    w = width
    h = height
*/

let processes = [],
    focusOrder = [],
    newPid = -1,
    newFocusLayer = 0;

function createProgram( name, content, icon, uDim = {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, id = '', programData = {} ) {
    const pid = String(newPid + 1);
    newPid++;
    const window = createWindow(name, content, uDim, icon, pid);
    const process = {
        'name': name,
        'icon': icon,
        'window': window,
        'minimized': false,
        'maximized': false,
        'focused': false,
        'id': id,
        'pid': pid
    };
    processes.push(process);
    renderProcesses();
    return process;
}

function createWindow( title, content, uDim, icon, pid ) {
    // setup
    const windowRoot = document.querySelector('.desktop-root');
    const template = document.getElementById('window-template');
    const window = template.content.cloneNode(true).childNodes[0];

    // apply configuration
    window.querySelector('.title').innerHTML = title;
    window.style.width = uDim.w + 'px';
    window.style.height = uDim.h + 'px';
    if (uDim.x < 0) {
        const rootSizeX = windowRoot.getBoundingClientRect().width;
        window.style.left = rootSizeX - uDim.w - (uDim.x * -1) + 'px';
    } else {
        window.style.left = uDim.x + 'px';
    }
    if (uDim.y < 0) {
        const rootSizeY = windowRoot.getBoundingClientRect().height;
        window.style.top = rootSizeY - uDim.h + uDim.y + 'px';
    } else {
        window.style.top = uDim.y + 'px';
    }

    // content rendering
    if (icon) {
        window.querySelector('.window-icon').src = icon;
    }
    if (pid >= 0) {
        window.setAttribute('data-pid', pid);
    }
    if (content instanceof HTMLElement) { // element
        window.querySelector('.content').appendChild(content);
    } else if (String(content).startsWith('http')) { // iframe
        const contentFrame = document.createElement('iframe')
        contentFrame.classList.add('content-frame');
        contentFrame.setAttribute('allowfullscreen', 'true');
        contentFrame.src = content.replaceAll('http://local/','');
        window.querySelector('.content').appendChild(contentFrame);
    } else if (typeof content === 'string') { // string
        window.querySelector('.content').innerHTML = content;
    }

    // setup focus layer
    const focusLayer = newFocusLayer++;
    window.setAttribute('data-focus-layer', focusLayer);
    focusOrder.unshift(focusLayer);

    // window dragging
    let offsetX, offsetY;
    const windowDragNode = window.querySelector('.titlebar');

    function windowDragStart(e) {
        window.classList.add("dragging");
        offsetX = e.clientX - windowDragNode.getBoundingClientRect().left;
        offsetY = e.clientY - windowDragNode.getBoundingClientRect().top;

        document.addEventListener('mousemove', windowDrag);
        document.addEventListener('mouseup', windowDragEnd);
    }
    function windowDrag(e) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
    }
    function windowDragEnd() {
        window.classList.remove("dragging");
        document.removeEventListener('mousemove', windowDrag);
        document.removeEventListener('mouseup', windowDragEnd);
    }

    windowDragNode.addEventListener('mousedown', windowDragStart);

    // window resizing
    let resizeOffsetX, resizeOffsetY, resizeSourceX, resizeSourceY;
    const windowResizeNodes = {
         n: window.querySelector('.resize-handle-n'),
        ne: window.querySelector('.resize-handle-ne'),
         e: window.querySelector('.resize-handle-e'),
        se: window.querySelector('.resize-handle-se'),
         s: window.querySelector('.resize-handle-s'),
        sw: window.querySelector('.resize-handle-sw'),
         w: window.querySelector('.resize-handle-w'),
        nw: window.querySelector('.resize-handle-nw'),
    }
    let windowResizeNode,
        windowResizeDirection = '';

    function windowResizeStart(e) {
        window.classList.add("dragging");
        windowResizeNode = e.target;
        resizeOffsetX = e.clientX;
        resizeOffsetY = e.clientY;
        resizeSourceX = window.getBoundingClientRect().width;
        resizeSourceY = window.getBoundingClientRect().height;

        document.addEventListener('mousemove', windowResize);
        document.addEventListener('mouseup', windowResizeEnd);
    }
    function windowResize(e) {
        if (windowResizeDirection.includes('w')) {
            window.style.left = `${e.clientX}px`;
            window.style.width = `${resizeSourceX - (e.clientX - resizeOffsetX)}px`;
        } else if (windowResizeDirection.includes('e')) {
            window.style.width = `${e.clientX - window.getBoundingClientRect().left}px`;
        }
        if (windowResizeDirection.includes('n')) {
            window.style.top = `${e.clientY}px`;
            window.style.height = `${resizeSourceY - (e.clientY - resizeOffsetY)}px`;
        } else if (windowResizeDirection.includes('s')) {
            window.style.height = `${e.clientY - window.getBoundingClientRect().top}px`;
        }
    }
    function windowResizeEnd() {
        window.classList.remove("dragging");
        windowResizeNode = null;
        windowResizeDirection = '';
        document.removeEventListener('mousemove', windowResize);
        document.removeEventListener('mouseup', windowResizeEnd);
    }

    for (const [key, value] of Object.entries(windowResizeNodes)) {
        value.addEventListener('mousedown', (e) => {
            windowResizeDirection = key;
            windowResizeStart(e);
        });
    }

    // window focus
    window.addEventListener('mousedown', () => {focusWindow(window)});

    // close button
    window.querySelector('.close').addEventListener("click", () => {
        if (pid >= 0) {
            killProcess(pid);
        } else {
            window.remove();
        }

        // remove window id from focus index and focus the next available window
        const focusIndex = focusOrder.indexOf(focusLayer);
        if (focusIndex !== -1) {
            focusOrder.splice(focusIndex,1);
            if (focusOrder.length >= 1) {
                focusWindow(document.querySelector(`.window[data-focus-layer="${focusOrder[0]}"]`))
            }
        }
    });

    // maximize/restore button
    function maximizeWindow() {
        const mxmbtn = window.querySelector('.maximiz');
        if (mxmbtn.getAttribute('aria-label') === 'Maximize') {
            mxmbtn.setAttribute('aria-label', 'Restore');
            window.classList.add('maximized');
        } else if (mxmbtn.getAttribute('aria-label') === 'Restore') {
            mxmbtn.setAttribute('aria-label', 'Maximize');
            window.classList.remove('maximized');
        }
    }
    window.querySelector('.maximiz').addEventListener("click", maximizeWindow);
    window.querySelector('.titlebar').addEventListener('dblclick', maximizeWindow);

    // minimize button
    if (!pid) {
        window.querySelector('.minimize').style.display = 'none';
    }
    window.querySelector('.minimize').addEventListener('click', () => {minimizeWindow(window)});

    // pre-focus the window
    focusWindow(window);

    // final step
    document.querySelector('.window-root').appendChild(window);
    return window
}

function focusWindow(window) {
    // actually focus the window
    document.querySelectorAll('.window').forEach((win) => {
        win.removeAttribute('focus');
    })
    window.setAttribute('focus', '');
    document.querySelectorAll('.task[window-state="focused"]').forEach((task) => {
        task.setAttribute('window-state', 'open');
        processes.forEach((process) => {
            process['focused'] = false;
        });
    })
    if (window.getAttribute('data-pid')) {
        const openTask = document.querySelector(`.task[data-pid="${window.getAttribute('data-pid')}"]`);
        if (openTask) {
            openTask.setAttribute('window-state', 'focused');
        }
        const proc = processes.filter((x) => x.pid === window.getAttribute('data-pid'))[0];
        const process = processes.indexOf(proc);
        process['focused'] = true;
    }

    // push window to front of focus chain
    const focusIndex = focusOrder.indexOf(focusOrder.filter((x) => x === Number(window.getAttribute('data-focus-layer')))[0]);
    if (focusIndex) {
        focusOrder.splice(focusIndex,1);
        focusOrder.unshift(Number(window.getAttribute('data-focus-layer')));
    }

    // deal with focus order
    for (let i = 0; i < focusOrder.length; i++) {
        const focusLayer = focusOrder[i];
        const focusLayerWindow = document.querySelector(`.window[data-focus-layer="${focusLayer}"]`);
        if (focusLayerWindow) {
            focusLayerWindow.style.zIndex = String(i * -1 + focusOrder.length);
        }
    }

}

function minimizeWindow(window) {
    if (!window.getAttribute('data-pid')) {
        console.error('Cannot minimize a window that does not have an associating process ID.');
        return
    }
    window.setAttribute('state', 'minimized');
    if (window.getAttribute('data-pid')) {
        const openTask = document.querySelector(`.task[data-pid="${window.getAttribute('data-pid')}"]`);
        if (openTask) {
            openTask.setAttribute('window-state', 'minimized');
        }
        const proc = processes.filter((x) => x.pid === window.getAttribute('data-pid'))[0];
        const process = processes.indexOf(proc);
        process['minimized'] = true;
    }
}

function restoreWindow(window) {
    window.removeAttribute('state');
    if (window.getAttribute('data-pid')) {
        const openTask = document.querySelector(`.task[data-pid="${window.getAttribute('data-pid')}"]`);
        if (openTask) {
            openTask.setAttribute('window-state', 'open');
        }
        const proc = processes.filter((x) => x.pid === window.getAttribute('data-pid'))[0];
        const process = processes.indexOf(proc);
        process['minimized'] = false;
    }
}

function killProcess(pid) {
    // kill process
    const process = processes.filter((x) => x.pid === pid)[0];
    const processIndex = processes.indexOf(process);
    if (process) {
        process.window.remove();
        processes.splice(processIndex,1);
    }

    renderProcesses();
}

function renderProcesses() {
    const tasksObject = document.querySelector('.tasks');
    tasksObject.innerHTML = '';
    processes.forEach((process) => {
        // create task object
        const taskRoot = document.createElement('button');
        taskRoot.classList.add('task');
        taskRoot.setAttribute('data-pid', process.pid);
        const taskImage = document.createElement('img');
        taskImage.classList.add('task-image');
        taskImage.src = process.icon;
        const taskLabel = document.createElement('span');
        taskLabel.classList.add('task-label');
        taskLabel.innerText = process.name;
        taskRoot.appendChild(taskImage);
        taskRoot.appendChild(taskLabel);

        // add click events
        taskRoot.addEventListener('click', () => {
            if (taskRoot.getAttribute('window-state') === 'minimized') { // window is minimized
                restoreWindow(process.window);
                focusWindow(process.window);
            } else if (taskRoot.getAttribute('window-state') === 'focused') { // window is focused
                minimizeWindow(process.window);
            } else { // assume window is visible, just focus it
                focusWindow(process.window);
            }
        })

        // final step
        tasksObject.appendChild(taskRoot);
    })
}

function windowTransitionEffect(window, effectId) {

}

function setWindowTitleByPid(title, pid) {
    const process = processes.filter((x) => x.pid === pid)[0];
    if (process) {
        process.name = title;
        process.window.querySelector('.title-bar-text').innerText = title;
    }
    return !!process;
}