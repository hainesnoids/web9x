(() => {
    const id = "paint";
    const title = "Paint";

    const browser = document.createElement('div');
    browser.classList.add("paint");
    browser.classList.add("content-frame");

    const process = createProgram(title, browser, `/fsroot/Applications/${id}/icon.ico`, {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, id);
    const shadow = browser.attachShadow({mode: "open"});

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "/fsroot/Applications/paint/paint.css";
    shadow.appendChild(stylesheet);

    var canvas = document.createElement('canvas');
    canvas.id = 'sdop-canvas';
    var anchorTarget = shadow;
        anchorParent = browser;
        originAnchor = {
            host: "*",
            path: null,
            selector: "body",
            resizeChild: null
        }
    anchorTarget.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    resizeCanvas();

    function resizeCanvas() {
        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
            ctxWidth = canvas.width,
            ctxHeight = canvas.height;
        if (originAnchor.resizeChild !== null) {
            canvas.width = Math.max(
                anchorTarget.querySelector(originAnchor.resizeChild).getBoundingClientRect().width,
                anchorParent.getBoundingClientRect().width,
                ctxWidth
            );
            canvas.height = Math.max(
                anchorTarget.querySelector(originAnchor.resizeChild).getBoundingClientRect().height,
                anchorParent.getBoundingClientRect().height,
                ctxHeight
            );
        } else {
            canvas.width = anchorParent.getBoundingClientRect().width;
            canvas.height = anchorParent.getBoundingClientRect().height;
        }
        ctx.putImageData(imageData,0,0);
    }
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(anchorParent);

    var color = "#ff0000"
    var width = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    var region;

    var mouseDown = false;
    var mouseInterval;

    var controls = document.createElement('div');
    controls.id = 'sdop-controls';
    anchorTarget.appendChild(controls);

    /* colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = color;
    colorPicker.style.backgroundColor = 'transparent';
    colorPicker.style.padding = '0';
    colorPicker.style.margin = '2px 0';
    controls.appendChild(colorPicker);

    colorPicker.addEventListener('change', (e) => {
        color = e.target.value;
    }); */
    widthContainer = document.createElement('div');
    widthContainer.classList = 'sdop-tools-row';

    widthSlider = document.createElement('input');
    widthSlider.type = 'range';
    widthSlider.min = 1;
    widthSlider.max = 20;
    widthSlider.value = 5;
    widthSlider.step = 1;
    widthSlider.id = 'sdop-width-slider';
    widthSlider.addEventListener('change', (e) => {
        width = e.target.value;
    });

    widthLabel = document.createElement('label');
    widthLabel.classList = 'sdop-width-label';
    widthLabel.textContent = '5px';
    widthSlider.addEventListener('input', (e) => {
        widthLabel.textContent = `${e.target.value}px`;
    });

    widthContainer.appendChild(widthSlider);
    widthContainer.appendChild(widthLabel);

    var colorContainer = document.createElement('div');
    colorContainer.classList.add('sdop-tools-row', 'sdop-color-selector');

    var colors = ['#000000','#666666','#880000','#888800','#008800','#008888','#000088','#880088','#5f276f','#2259a7','#358f3d','#f6eb1e','#f68920','#e81f27','#52c6f7','#f39fb0','#1ea6fd','#fed200','#ff1e7f','#fef32b','#cccccc','#ffffff','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff','#ffc8c7','#c8c9ff','#fd7d7d','#8d01a0','#6296fe','#fe62d8','#99015a','#cd5a9b','#fd914a','#cc2e0b','#262626','#904ec9'];
    colorContainer.style.width = `${Math.round(colors.length / 2) * 16}px`
    var colorChangeBtns = [];
    colors.forEach((itmColor) => {
        var button = document.createElement('button');
        button.style.backgroundColor = itmColor;
        button.classList.add('sdop-color-button', 'win98-unstyled');
        button.addEventListener('click', () => {
            for (var i = 0; i < colorChangeBtns.length; i++) {
                colorChangeBtns[i].classList.remove('sdop-color-active-button');
            }
            button.classList.add('sdop-color-active-button');
            // document.documentElement.style.setProperty('--sdop-current-color', itmColor);
            color = itmColor;
        });
        colorChangeBtns.push(button);
        colorContainer.appendChild(button);
    });
    colorChangeBtns[0].click();

    var tools = document.createElement('div');
    tools.classList = 'sdop-tools-row sdop-mode-row';
    /*
    var dragger = document.createElement('div');
    dragger.classList = 'sdop-dragger';
    for (var i = 0; i < 3; i++) {
        var draggerLine = document.createElement('div');
        draggerLine.classList = 'sdop-dragger-line';
        dragger.appendChild(draggerLine);
    }

    controls.appendChild(dragger);
    */
    var bigContainer = document.createElement('div');
    bigContainer.classList = 'sdop-big-container';
    controls.appendChild(bigContainer);

    bigContainer.appendChild(tools);
    bigContainer.appendChild(colorContainer);
    bigContainer.appendChild(widthContainer);

    var toolsButtons = [];

    var drawButton = document.createElement('button');
    drawButton.textContent = 'Draw';
    drawButton.classList = 'sdop-tools-button';
    drawButton.addEventListener('click', () => {
        canvas.style.pointerEvents = 'auto';
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = color;
        for (var i = 0; i < toolsButtons.length; i++) {
            toolsButtons[i].classList.remove('sdop-tools-active-button');
        }
        drawButton.classList.add('sdop-tools-active-button');
        canvas.classList.remove('sdop-mode-erase');
        canvas.classList.add('sdop-mode-draw');
    });
    tools.appendChild(drawButton);
    toolsButtons.push(drawButton);
    drawButton.click();

    var eraserButton = document.createElement('button');
    eraserButton.textContent = 'Erase';
    eraserButton.classList = 'sdop-tools-button';
    eraserButton.addEventListener('click', () => {
        canvas.style.pointerEvents = 'auto';
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
        for (var i = 0; i < toolsButtons.length; i++) {
            toolsButtons[i].classList.remove('sdop-tools-active-button');
        }
        eraserButton.classList.add('sdop-tools-active-button');
        canvas.classList.remove('sdop-mode-draw');
        canvas.classList.add('sdop-mode-erase');
    });
    tools.appendChild(eraserButton);
    toolsButtons.push(eraserButton);

    /*var interactButton = document.createElement('button');
    interactButton.textContent = 'Interact';
    interactButton.classList = 'sdop-tools-button';
    interactButton.addEventListener('click', () => {
        canvas.style.pointerEvents = 'none';
        for (var i = 0; i < toolsButtons.length; i++) {
            toolsButtons[i].classList.remove('sdop-tools-active-button');
        }
        interactButton.classList.add('sdop-tools-active-button');
    });
    tools.appendChild(interactButton);
    toolsButtons.push(interactButton);*/

    canvas.addEventListener('mousemove', (e) => {
        //e.stopPropagation();
        if (mouseDown) {
            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().x, e.clientY - canvas.getBoundingClientRect().y);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    })

    canvas.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        region = new Path2D();
        ctx.lineWidth = width;
        ctx.beginPath();
        mouseDown = true;
        console.log('indeed mousedown');
    });
    canvas.addEventListener('mouseup', (e) => {
        e.stopPropagation();
        ctx.closePath();
        mouseDown = false;
        clearInterval(mouseInterval);
        console.log('indeed mouseup');
    });

    function close() {
        canvas.remove();
        controls.remove();
    }
})()