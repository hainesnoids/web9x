(() => {
    // DOM-based window substitute script
    const id = "winver";
    const title = "System Information";

    const data = '<img style="margin: -4px 0 -4px" src="/fsroot/System/res/logo.png" alt="Web9x banner"><p>Web9x<br>Build 2.1</p><hr><p>Copyright © 2026 Hainesnoids<br>This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.<br><br>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.<br><br>You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/.</p><a href="https://github.com/hainesnoids/web9x"><button>View on Github</button></a>';

    function stringToDOM(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString;
        return div;
    }

    const process = createProgram(title, stringToDOM(data), `/fsroot/Applications/${id}/icon.ico`, {x:100,y:100,w:420,h:360,minw:0,minh:0,resize:false}, id);
})()
