const $input = document.getElementById('input');
const $body = document.getElementsByTagName('body')[0];
$input.addEventListener('input', () => {
    $body.style.backgroundColor = wordToColor($input.value);
})