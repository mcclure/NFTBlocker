window.addEventListener('click', function(event) {
    var t = event.target;
    if (t.className.indexOf('option') !== false)
        self.port.emit('click', t.id);
}, false);