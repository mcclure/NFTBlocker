window.addEventListener('click', function(event) {
    var t = event.target;
    if (t.className == 'option')
        self.port.emit('click', t.id);
}, false);