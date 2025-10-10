import * as sandstone from "./sandstone/sandstone.mjs";

document.querySelectorAll('.pony').forEach(async (browser) => {
    if (browser.innerHTML === '<span>Awaiting Renderer</span>') { // uninitialized browser window
        const browserPid = browser.getAttribute('data-pid');
        // create the nodes
        //console.log('Detected a pony window, creating content');
        browser.innerHTML = '';
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
        const proxyFrame = new sandstone.controller.ProxyFrame();
        globalThis.sandstone = sandstone;
        globalThis.main_frame = proxyFrame;

        let wisp = "wss://wisp.mercurywork.shop/";
        //let wisp = "ws://127.0.0.1:8001";
        sandstone.libcurl.set_websocket(wisp);

        function navigateUrl() {
            const uri = browserURLInput.value;
            browser.classList.add('loading-page');
            let url;
            if (uri.startsWith('pony://')) { // system uri
                //url = `/programs/pony/syswindows/${uri.replaceAll('pony://','')}.html`
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
            return await proxyFrame.eval_js(`document.querySelector('title').innerHTML`);
        }

        browserURLInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') navigateUrl();
        });
        browserGoButton.addEventListener('click', navigateUrl);

        proxyFrame.special_pages = {
            "pony://newtab": await fetch('programs/pony/syswindows/newtab.html').then((response) => {return response.text()}),
        };
        proxyFrame.on_navigate = () => {
            browser.classList.add('loading-page');
        }
        proxyFrame.on_load = async () => {
            browserURLInput.value = proxyFrame.url.href;
            browser.classList.remove('loading-page');
            setWindowTitleByPid(`${getPageTitle()} - Internet Dasher`, browserPid);
        }
        proxyFrame.on_url_change = () => {
            browserURLInput.value = proxyFrame.url.href;
            setWindowTitleByPid(`${getPageTitle()} - Internet Dasher`, browserPid);
        }
        proxyFrame.iframe.classList.add('pony-content-frame');
        browserFrameWrap.append(proxyFrame.iframe);
        navigateUrl();
    }
})
