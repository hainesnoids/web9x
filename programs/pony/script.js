document.querySelectorAll('.pony').forEach((browser) => {
    if (browser.innerHTML === '<span>Awaiting Renderer</span>') { // uninitialized browser window
        // create the nodes
        console.log('Detected a pony window, creating content');
        browser.innerHTML = '';
        const browserTabBar = document.createElement('div');
        browserTabBar.classList.add('pony-tab-bar');
        
        const browserNavBar = document.createElement('nav');
        browserNavBar.classList.add('pony-nav-bar');
        
        const browserURLInput = document.createElement('input');
        browserURLInput.classList.add('pony-url-input');
        browserURLInput.type = 'text';
        browserURLInput.value = 'pony://newtab';
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
        const browserFrame = document.createElement('iframe');
        browserFrame.classList.add('pony-content-frame');
        browserFrame.setAttribute('allowfullscreen', 'true');
        browserFrame.src = 'programs/pony/syswindows/newtab.html';
        browserFrameWrap.appendChild(browserFrame);
        
        // send nodes to window
        browser.appendChild(browserTabBar);
        browser.appendChild(browserFrameWrap);
        
        // add events
        function frameLoaded() {
            browser.classList.remove('loading-page');
        }
        function frameLoading() {
            browser.classList.add('loading-page');
        }
        function parseURL() {
            const uri = browserURLInput.value;
            browser.classList.add('loading-page');
            let url;
            if (uri.startsWith('pony://')) { // system uri
                url = `programs/pony/syswindows/${uri.replaceAll('pony://','')}.html`
            } else url = uri;
            browserFrame.src = url;
        }
        browserURLInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') parseURL();
        });
        browserGoButton.addEventListener('click', parseURL);
        browserFrame.addEventListener('load', frameLoaded);

        // leaving this here just in case some stupid browser leaves this unchecked
        browserFrame.contentWindow.addEventListener('beforeunload', frameLoading);
    }
})
