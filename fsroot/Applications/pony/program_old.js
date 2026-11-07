const browser = document.createElement('div');
browser.classList.add("pony");
const process = createProgram("Internet Dasher", browser, "/fsroot/Applications/pony/icon.png", {x:100,y:100,w:640,h:480,minw:0,minh:0,resize:true}, "pony");
loadModule("/fsroot/Applications/pony/sandstone/sandstone.js", process.pid);

const stylesheet = document.createElement('link');
stylesheet.rel = "stylesheet";
stylesheet.href = "/fsroot/Applications/pony/style.css";
browser.appendChild(stylesheet);

const browserTabBar = document.createElement('div');
browserTabBar.classList.add('pony-tab-bar');

const browserNavBar = document.createElement('nav');
browserNavBar.classList.add('pony-nav-bar');

const browserURLInput = document.createElement('input');
browserURLInput.classList.add('pony-url-input');
browserURLInput.type = 'text';
browserURLInput.value = 'pony://newtab';
browserURLInput.placeholder = 'Search DuckDuckGo or type a URL';
browserNavBar.appendChild(browserURLInput);

const browserGoButton = document.createElement('button');
browserGoButton.classList.add('pony-go-button');
browserGoButton.innerText = 'Go';
browserNavBar.appendChild(browserGoButton);

browserTabBar.appendChild(browserNavBar);

const browserLoader = document.createElement('div');
browserLoader.classList.add('pony-loader');

const browserRainbowDash = document.createElement('div');
browserRainbowDash.classList.add('pony-rainbow-dash');
browserLoader.appendChild(browserRainbowDash);

browserTabBar.appendChild(browserLoader);

const browserFrameWrap = document.createElement('div');
browserFrameWrap.classList.add('pony-content');

// send nodes to window
browser.appendChild(browserTabBar);
browser.appendChild(browserFrameWrap);

// sandstone-based rewrite
setTimeout(() => {
    const proxyFrame = new window.sandstone.controller.ProxyFrame();
    globalThis.sandstone = window.sandstone;
    globalThis.main_frame = proxyFrame;

    let wisp = "wss://phonehome.ws4k.net/wisp";
    //let wisp = "ws://127.0.0.1:8001";
    sandstone.libcurl.set_websocket(wisp);

    function navigateUrl() {
        const uri = browserURLInput.value;
        browser.classList.add('loading-page');
        let url;
        if (uri.startsWith('pony://')) { // system uri
            //url = `/fsroot/Applications/pony/syswindows/${uri.replaceAll('pony://','')}.html`
            url = uri;
        } else if (new RegExp('^http(?:s)?').test(uri)) { // url
            url = uri;
        } else/* if (new RegExp('^www\.|\.[a-zA-Z]*$').test(uri))*/ { // url, no provided protocol
            url = `http://${uri}`;
            browserURLInput.value = url;
        } //else { // search query
        //url = `http://frogfind.com/?q=${uri}`;
        //}
        proxyFrame.navigate_to(url);
    }

    async function getPageTitle() {
        return await proxyFrame.eval_js(`document.title`);
    }

    browserURLInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') navigateUrl();
    });
        browserGoButton.addEventListener('click', navigateUrl);

        proxyFrame.special_pages = {
            "pony://newtab": '<h1 style="font-family: sans-serif">Internet Dasher</h1>'
        };
        proxyFrame.on_navigate = () => {
            browser.classList.add('loading-page');
        }
        proxyFrame.on_load = async () => {
            browserURLInput.value = proxyFrame.url.href;
            browser.classList.remove('loading-page');
            setWindowTitleByPid(`${await getPageTitle()} - Internet Dasher`, process.pid);
        }
        proxyFrame.on_url_change = async () => {
            browserURLInput.value = proxyFrame.url.href;
            setWindowTitleByPid(`${await getPageTitle()} - Internet Dasher`, process.pid);
        }
        proxyFrame.iframe.classList.add('pony-content-frame');
        browserFrameWrap.append(proxyFrame.iframe);
        navigateUrl();
},100)
