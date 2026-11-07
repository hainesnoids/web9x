let programs = {
    'run': {
        name: 'Run',
        icon: '/fsroot/Applications/run/icon/ico',
        visible: false
    },
    'explorer': {
        name: 'File Explorer',
        icon: '/fsroot/Applications/explorer/icon.ico'
    },
    'pony': {
        name: 'Internet Dasher',
        icon: '/fsroot/Applications/pony/icon.png'
    },
    'markpad': {
        name: 'Markpad',
        icon: '/fsroot/Applications/markpad/icon.ico'
    },
    'antonymph': {
        name: 'Antonymph',
        icon: '/fsroot/Applications/antonymph/icon.png'
    },
    'jellyfin': {
        name: 'Jellyfin',
        icon: '/fsroot/Applications/jellyfin/icon.png'
    },
    'slope': {
        name: 'Slope',
        icon: '/fsroot/Applications/slope/icon.png',
    },
    'ws4k': {
        name: 'WeatherSTAR 4000',
        icon: '/fsroot/Applications/ws4k/icon.png'
    },
    'wscn': {
        name: 'Weatherscan',
        icon: '/fsroot/Applications/wscn/icon.png'
    },
    'winver': {
        name: 'System Information',
        icon: '/fsroot/Applications/winver/icon.ico',
        visible: false
    },
    'themes': {
        name: 'Themes',
        icon: '/fsroot/Applications/themes/icon.ico'
    },
    /*'easip': {
        name: 'EASip',
        content: '<button id="allalerts-form-submit">Refresh</button><table id="allalerts-results" style="text-wrap: wrap"></table>',
        icon: '/fsroot/Applications/easip/icon.svg',
        script: '/fsroot/Applications/easip/script.js'
    },
    'sattest': {
        name: 'Saturation Test',
        content: '<img src="/fsroot/Applications/sattest/image.png" width="620" alt="Fluttershy"><p>I often use this image of Fluttershy to test a device\'s color settings. Too much color and the yellow will pop out, Too little color and the pink doesn\'t stand out.</p>',
        icon: '/fsroot/Applications/sattest/icon.svg'
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
