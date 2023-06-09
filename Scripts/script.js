let d = document;
let eventHTML = d.querySelector('#events');
let language = d.documentElement.lang.substring(0, 2);

const salesChannelId = 13357;
const userTypeId = 64;

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');


const clientId = 'apidigicsi';
const clientSecret = 'R89x2seXL';

const formattedDate = `${year}-${month}-${day}`;
const clientLoginEncrypt = btoa(clientId + ':' + clientSecret);

fetch('https://front.apirecette.digitick-ppe.com/v1.1/authorization/token', {
    method: 'post',
    headers: {
        'Accept': 'application/hal+json',
        'Authorization': 'Basic ' + clientLoginEncrypt
    }
}).then(r => {
    return r.json()
}).then(function getEventToday(token) {
    let urlCategories = 'https://front.apirecette.digitick-ppe.com/v1.1/distribution/salesChannels/'+ salesChannelId + '/calendar/day/' + formattedDate + '?lang=' + language;
    fetch(urlCategories, {
        method: 'get', headers: {
            'Accept': 'application/hal+json',
            'Authorization': token.tokenType + ' ' + token.accessToken
        }
    }).then(r => {
        return r.json()
    }).then(function showEvents (eventsDatas) {
        let eventData = eventsDatas._embedded['hours'];
        let oldEvent = [];
        for (let i = 0; i < eventData.length ; i++) {
            if (oldEvent.includes(eventData[i].eventId) === false) {
                console.log('test')
                let urlEvent = 'https://front.apirecette.digitick-ppe.com/v1.1/catalog/events/'+ eventData[i].eventId +'?lang=' + language;

                fetch(urlEvent,{
                    methode : 'get',
                    headers : {
                        'Accept': 'application/hal+json',
                        'Authorization': token.tokenType + ' ' + token.accessToken
                    }
                }).then(r => r.json()).then( function getEvent ( event ){
                    eventHTML.innerHTML +=
                        '  <a href="reservation.html"\n' +
                        '    class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">\n' +
                        '    <img src="Contents/party.png" alt="party">\n' +
                        '    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">' + event.name + '</h5>\n' +
                        '    <p class="font-normal text-gray-700 dark:text-gray-400"> '+ eventData[i].dateStart +'- Le Duplex</p>\n' +
                        '  </a>';
                    console.log(event)
                    }
                )
            }
        }
    })
});
