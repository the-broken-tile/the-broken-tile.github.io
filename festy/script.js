const $root = document.getElementById('root');
const $install = document.getElementById('install');

let id = navigator.geolocation.watchPosition(
    function success(pos) {
        const crd = pos.coords;
        console.log('Location changed');
        $root.innerText = `Latitude: ${crd.latitude}\nLongitude: ${crd.longitude}\nMore or less ${crd.accuracy} meters.`;
    },
    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    },
    {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    },
);

if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification('Hi there!');
} else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === 'granted') {
            const notification = new Notification('Hi there!');
        }
    });
}

let installPrompt = null;

$install.addEventListener('click', () => {

});

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    $install.removeAttribute('hidden');
});

$install.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);

    installPrompt = null;
    $install.hidden = false;
});