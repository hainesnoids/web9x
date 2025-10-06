let programs = {
    'run': {
        name: 'Run',
        content: '<div class="run-input-field"><input type="text" id="run-input"><button id="run-submit">Run</button></div>',
        icon: '',
        uDim: {x: 30,y: -30,w: 240,h: 64},
        script: '/programs/run/script.js',
        visible: false
    },
    'jellyfin': {
        name: 'Jellyfin',
        content: 'https://jellyfin.ws4k.net',
        icon: '/programs/jellyfin/icon.png'
    },
    'slope': {
        name: 'Slope',
        content: 'http://local/programs/slope',
        icon: '/programs/slope/icon.png',
        uDim: {x: 20, y: 20, w: 1280, h: 720},
    },
    'wrstreaming': {
        name: 'WR Streaming',
        content: 'https://streaming.weatherranch.com/app',
        icon: '/programs/wrstreaming/icon.png'
    },
    'ws4k': {
        name: 'WeatherSTAR 4000',
        content: 'https://battaglia.ddns.net/twc',
        icon: '/programs/ws4k/icon.png'
    },
    'wscn': {
        name: 'Weatherscan',
        content: 'https://v1.weatherscan.me/',
        icon: '/programs/wscn/icon.png'
    },
    'easip': {
        name: 'EASip',
        content: '<button id="allalerts-form-submit">Refresh</button><table id="allalerts-results" style="text-wrap: wrap"></table>',
        icon: '/programs/easip/icon.svg',
        script: '/programs/easip/script.js'
    },
    'hardr': {
        name: 'Hard R Clip',
        content: 'http://local/res/hardr.mp4',
        visible: false
    },
    'winver': {
        name: 'System Information',
        content: '<img style="margin: -8px -8px -4px" src="/res/logo.png" alt="Web9x banner"><p>Web9x<br>Build 2510.0</p><hr><p>Copyright (C) 2025 Hainesnoids<br>This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.<br><br>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.<br><br>You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/.</p><a href="https://github.com/hainesnoids/web9x"><button>View on Github</button></a>',
        uDim: {x: 100, y: 100, w: 420, h: 360},
        visible: false
    },
    'sattest': {
        name: 'Saturation Test',
        content: '<img src="/programs/sattest/image.png" width="620" alt="Fluttershy"><p>I often use this image of Fluttershy to test a device\'s color settings. Too much color and the yellow will pop out, Too little color and the pink doesn\'t stand out.</p>',
        icon: '/programs/sattest/icon.svg'
    }
}

function renderDesktopIcons() {
    const desktop = document.querySelector('.desktop');
    desktop.innerHTML = '';
    for (const [key, program] of Object.entries(programs)) {
        if (program['visible'] !== false) {
            // create desktop icon
            const desktopIcon = document.createElement('button');
            desktopIcon.classList.add('desktop-icon');
            desktopIcon.classList.add('win98-unstyled');
            const desktopIconImage = document.createElement('img');
            desktopIconImage.src = program.icon;
            desktopIcon.appendChild(desktopIconImage);
            const desktopIconLabel = document.createElement('span');
            desktopIconLabel.innerText = program.name;
            desktopIcon.appendChild(desktopIconLabel);

            // click event
            desktopIcon.addEventListener('dblclick', () => {
                run(key);
            })

            // add to desktop
            desktop.appendChild(desktopIcon);
        }
    }
}

document.addEventListener('DOMContentLoaded', renderDesktopIcons);
