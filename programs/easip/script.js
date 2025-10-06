document.getElementById('allalerts-form-submit').onclick = function(){
    var resultBox = document.getElementById('allalerts-results')
    fetch(`https://easip-client.ccp.xcal.tv/eas/api/alert/active?format=json`)
        .then((response) => response.json())
        .then((data) => {
            let hiddenAlerts = 0;
            resultBox.innerHTML = `
            <tr>
                <th>Event</th>
                <th>Header</th>
                <th>Description</th>
                <th>Instructions</th>
                <th>Urgency</th>
                <th>Severity</th>
                <th>Certainty</th>
                <th>Issued</th>
                <th>Effective</th>
                <th>Expires</th>
                <th>Video</th>
            </tr>
            `
            for (const item of data.alerts) {
                /*if (item.identifier.startsWith('ZCZC-EAS-RWT-SyntheticTestAlert-comcast-eas')) {
                    // Synthetic Test Alert, hide
                    hiddenAlerts++;
                } else {*/
                    resultBox.innerHTML += `
            <tr>
                <td>${item.info[0].event}</td>
                <td>${item.identifier + item.info[0].senderName}</td>
                <td>${item.info[0].description}</td>
                <td>${item.info[0].instruction}</td>
                <td>${item.info[0].urgency}</td>
                <td>${item.info[0].severity}</td>
                <td>${item.info[0].certainty}</td>
                <td>${new Date(item.sent).getFullYear()} / ${String(new Date(item.sent).getMonth() + 1).padStart(2,'0')} / ${String(new Date(item.sent).getDate()).padStart(2,'0')} ${String(new Date(item.sent).getHours()).padStart(2,'0')}:${String(new Date(item.sent).getMinutes() + 1).padStart(2,'0')}:${String(new Date(item.sent).getSeconds()).padStart(2,'0')}</td>
                <td>${new Date(item.info[0].effective).getFullYear()} / ${String(new Date(item.info[0].effective).getMonth() + 1).padStart(2,'0')} / ${String(new Date(item.info[0].effective).getDate()).padStart(2,'0')} ${String(new Date(item.info[0].effective).getHours()).padStart(2,'0')}:${String(new Date(item.info[0].effective).getMinutes() + 1).padStart(2,'0')}:${String(new Date(item.info[0].effective).getSeconds()).padStart(2,'0')}</td>
                <td>${new Date(item.info[0].expires).getFullYear()} / ${String(new Date(item.info[0].expires).getMonth() + 1).padStart(2,'0')} / ${String(new Date(item.info[0].expires).getDate()).padStart(2,'0')} ${String(new Date(item.info[0].expires).getHours()).padStart(2,'0')}:${String(new Date(item.info[0].expires).getMinutes() + 1).padStart(2,'0')}:${String(new Date(item.info[0].expires).getSeconds()).padStart(2,'0')}</tzd>
                <td><button onclick="createWindow( '${item.info[0].event}', 'https://ws4k.net/easip/player?v=${item.info[0].resource[0].uri}', {x: 120, y: 120, w: 854, h: 480} )"><span>Play Video</span></button></td>
            </tr>
            `;}
            //}
            if (hiddenAlerts > 1) {
                resultBox.innerHTML += `<tr><th class="tf">${hiddenAlerts} other alerts were hidden.</th></tr>`;
            } else if (hiddenAlerts > 0) {
                resultBox.innerHTML += `<tr><th class="tf">${hiddenAlerts} other alert was hidden.</th></tr>`;
            }
        })
        .catch(resultBox.innerHTML = '<tr><td>Waiting for alerts...</td></tr>')
}
document.getElementById('allalerts-form-submit').click()