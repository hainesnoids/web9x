let programs = {
    'run': {
        name: 'Run',
        icon: '/programs/run/icon/ico',
        visible: false
    },
    'explorer': {
        name: 'File Explorer',
        icon: '/programs/explorer/icon.ico'
    },
    'pony': {
        name: 'Internet Dasher',
        icon: '/programs/pony/icon.png'
    },
    'markpad': {
        name: 'Markpad',
        icon: '/programs/markpad/icon.svg'
    },
    'antonymph': {
        name: 'Antonymph',
        icon: '/programs/antonymph/icon.png'
    },
    'jellyfin': {
        name: 'Jellyfin',
        icon: '/programs/jellyfin/icon.png'
    },
    'slope': {
        name: 'Slope',
        icon: '/programs/slope/icon.png',
    },
    'ws4k': {
        name: 'WeatherSTAR 4000',
        icon: '/programs/ws4k/icon.png'
    },
    'wscn': {
        name: 'Weatherscan',
        icon: '/programs/wscn/icon.png'
    },
    'winver': {
        name: 'System Information',
        content: '<img style="margin: -4px 0 -4px" src="/res/logo.png" alt="Web9x banner"><p>Web9x<br>Build 2.0</p><hr><p>Copyright © 2026 Hainesnoids<br>This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.<br><br>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.<br><br>You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/.</p><a href="https://github.com/hainesnoids/web9x"><button>View on Github</button></a>',
        icon: '/programs/winver/icon.ico',
        uDim: {x: 100, y: 100, w: 420, h: 360},
        resizable: false,
        visible: false
    },
    'themes': {
        name: 'Themes',
        icon: '/programs/themes/icon.ico'
    },
    /*'easip': {
        name: 'EASip',
        content: '<button id="allalerts-form-submit">Refresh</button><table id="allalerts-results" style="text-wrap: wrap"></table>',
        icon: '/programs/easip/icon.svg',
        script: '/programs/easip/script.js'
    },
    'sattest': {
        name: 'Saturation Test',
        content: '<img src="/programs/sattest/image.png" width="620" alt="Fluttershy"><p>I often use this image of Fluttershy to test a device\'s color settings. Too much color and the yellow will pop out, Too little color and the pink doesn\'t stand out.</p>',
        icon: '/programs/sattest/icon.svg'
    }*/
}

function windowInts() {

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
