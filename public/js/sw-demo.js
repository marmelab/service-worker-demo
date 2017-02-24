if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', { scope: '/' })
    .then(function(reg) {
        mainMessage('notify', 'Service worker is started');
    }).catch(function(error) {
        mainMessage('alert', 'Service worker registration failed with ' + error);
    });
} else {
    mainMessage('alert', 'You browser do not support Service Worker');
}

function mainMessage(type, msg) {
    var ready = document.getElementById('main-message');
    switch (type) {
    case 'alert':
        ready.classList.remove('green');
        ready.classList.add('red');
        break;
    case 'notify':
        ready.classList.remove('red');
        ready.classList.add('green');
        break;
    default:
        console.error(type + ' is not a valid type for a main message');
        ready.classList.remove('red');
        ready.classList.remove('green');
        ready.innerText = '';
        ready.classList.add('hidden');
        return false;
    }

    ready.innerText = msg;
    ready.classList.remove('hidden');

    return true;
}
