const selectAll = $container => {
    const $selectAll = document.createElement('button');
    $selectAll.type = 'button';
    $selectAll.innerText = 'Select all';
    $container.appendChild($selectAll);

    const $deselectAll = document.createElement('button');
    $deselectAll.type = 'button';
    $deselectAll.innerText = 'Deselect all';
    $container.appendChild($deselectAll);

    const toggle = on => {
        $container.querySelectorAll('input[type="checkbox"]').forEach($checkbox => {
            $checkbox.checked = on;
        });
    };

    $selectAll.addEventListener('click', e => {
        e.preventDefault();
        toggle(true);
    });

    $deselectAll.addEventListener('click', e => {
        e.preventDefault();
        toggle(false);
    });

    return [$selectAll, $deselectAll];
}