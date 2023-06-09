let d = document;
let language = d.documentElement.lang.substring(0, 2);

let test = d.getElementsByClassName('event');
test.innerHTML = "Bonjour ce n'est qu'un test"

































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
        let event = eventsDatas._embedded['hours'];
        for (let i = 0; i < event.length ; i++) {

            console.log(event[i])
            
            
        }
    })
});
