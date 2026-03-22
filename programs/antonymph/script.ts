const antonymphWindows = document.querySelectorAll('.antonymph');
const targetSourceWindow = antonymphWindows[antonymphWindows.length-1];

let targetWindows:{string?: HTMLDivElement} = {}

function decodeFeatures(featuresString: string) {
    const featuresArray: string[] = featuresString.split(',');
    const featuresObject = {};

    featuresArray.forEach(feature => {
        const [key, value] = feature.split('=');
        if (value !== undefined) {
            featuresObject[key.trim()] = value.trim();
        } else {
            featuresObject[key.trim()] = true;
        }
    });

    return featuresObject;
}

let windowSources = {};

function antonymphCreateWindow(url:string, target:string, features:string) {
    if (targetWindows[target]) {
        // change window url
        const featuresList = decodeFeatures(features);
        //@ts-ignore
        if (url.includes('https:')) {
            targetWindows[target].querySelector('.content-frame').src = url;
        } else {
            targetWindows[target].querySelector('.content-frame').src = `/programs/antonymph/resources/${url}`;
        }
        if (url === 'close.html') {
            antonymphRemoveWindow(target);
            return;
        }
        featuresList['x'] ? targetWindows[target].style.left = featuresList['x'] + 'px' : null;
        featuresList['y'] ? targetWindows[target].style.top = featuresList['y'] + 'px' : null;
        featuresList['width'] ? targetWindows[target].style.width = featuresList['width'] + 'px' : null;
        featuresList['height'] ? targetWindows[target].style.height = featuresList['height'] + 'px' : null;
    } else {
        // create window
        const featuresList = decodeFeatures(features);
        let uDim = {
            x: featuresList['x'] | 100,
            y: featuresList['y'] | 100,
            w: featuresList['width'] | 640,
            h: featuresList['height'] | 480
        };
        //@ts-expect-error
        targetWindows[target] = createWindow('Antonymph', `http://local//programs/antonymph/resources/${url}`, uDim);

        const windowCloseInterval = setInterval(() => {
            console.log(targetWindows[target].querySelector('.content-frame').src);
            if (targetWindows[target].querySelector('.content-frame').src.includes('/programs/antonymph/resources/close.html')) {
                antonymphRemoveWindow(target);
                clearInterval(windowCloseInterval);
            }
        },1000);
    }
    function getDocument() {
        return targetWindows[target].querySelector('.content-frame').contentDocument
    }
    function getWindow() {
        return targetWindows[target].querySelector('.content-frame').contentWindow
    }
    // because my code is DUMB only the first window gets added to the DOM, so here's some forceful methods
    document.querySelector('.window-root').appendChild(targetWindows[target]);
    return {
        moveTo: (x: number, y: number) => {
            targetWindows[target].style.left = `${x}px`;
            targetWindows[target].style.top = `${y}px`;
        },
        resizeTo: (x: number, y: number) => {
            targetWindows[target].style.width = `${x}px`;
            targetWindows[target].style.height = `${y}px`;
        },
        document: getDocument,
        scrollTo: getDocument().scrollTo,
        window: getWindow,
        close: () => {antonymphRemoveWindow(target)}
    };
}

function antonymphRemoveWindow(target:string) {
    targetWindows[target].remove();
}