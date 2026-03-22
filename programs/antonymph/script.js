var antonymphWindows = document.querySelectorAll('.antonymph');
var targetSourceWindow = antonymphWindows[antonymphWindows.length - 1];
var targetWindows = {};
function decodeFeatures(featuresString) {
    var featuresArray = featuresString.split(',');
    var featuresObject = {};
    featuresArray.forEach(function (feature) {
        var _a = feature.split('='), key = _a[0], value = _a[1];
        if (value !== undefined) {
            featuresObject[key.trim()] = value.trim();
        }
        else {
            featuresObject[key.trim()] = true;
        }
    });
    return featuresObject;
}
var windowSources = {};
function antonymphCreateWindow(url, target, features) {
    if (targetWindows[target]) {
        // change window url
        var featuresList = decodeFeatures(features);
        //@ts-ignore
        if (url.includes('https:')) {
            targetWindows[target].querySelector('.content-frame').src = url;
        }
        else {
            targetWindows[target].querySelector('.content-frame').src = "/programs/antonymph/resources/".concat(url);
        }
        if (url === 'close.html') {
            antonymphRemoveWindow(target);
            return;
        }
        featuresList['x'] ? targetWindows[target].style.left = featuresList['x'] + 'px' : null;
        featuresList['y'] ? targetWindows[target].style.top = featuresList['y'] + 'px' : null;
        featuresList['width'] ? targetWindows[target].style.width = featuresList['width'] + 'px' : null;
        featuresList['height'] ? targetWindows[target].style.height = featuresList['height'] + 'px' : null;
    }
    else {
        // create window
        var featuresList = decodeFeatures(features);
        var uDim = {
            x: featuresList['x'] | 100,
            y: featuresList['y'] | 100,
            w: featuresList['width'] | 640,
            h: featuresList['height'] | 480
        };
        //@ts-expect-error
        targetWindows[target] = createWindow('Antonymph', "http://local//programs/antonymph/resources/".concat(url), uDim);
        var windowCloseInterval_1 = setInterval(function () {
            console.log(targetWindows[target].querySelector('.content-frame').src);
            if (targetWindows[target].querySelector('.content-frame').src.includes('/programs/antonymph/resources/close.html')) {
                antonymphRemoveWindow(target);
                clearInterval(windowCloseInterval_1);
            }
        }, 1000);
    }
    function getDocument() {
        return targetWindows[target].querySelector('.content-frame').contentDocument;
    }
    function getWindow() {
        return targetWindows[target].querySelector('.content-frame').contentWindow;
    }
    // because my code is DUMB only the first window gets added to the DOM, so here's some forceful methods
    document.querySelector('.window-root').appendChild(targetWindows[target]);
    return {
        moveTo: function (x, y) {
            targetWindows[target].style.left = "".concat(x, "px");
            targetWindows[target].style.top = "".concat(y, "px");
        },
        resizeTo: function (x, y) {
            targetWindows[target].style.width = "".concat(x, "px");
            targetWindows[target].style.height = "".concat(y, "px");
        },
        document: getDocument,
        scrollTo: getDocument().scrollTo,
        window: getWindow,
        close: function () { antonymphRemoveWindow(target); }
    };
}
function antonymphRemoveWindow(target) {
    targetWindows[target].remove();
}
