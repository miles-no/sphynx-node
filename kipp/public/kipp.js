var kipp = document.getElementById('kipp');

fetch('http://localhost:3002/moduledefinitions')
  .then(function (res) {
    return res.json();
  })
  .then(function (defs) {
    var buttons = defs.map(function (def) {
      return `<button id="${def.key}">${def.name}</button>`;
    }).join('');
    document.getElementById('kipp').innerHTML = buttons;

    return defs;
  })
  .then(function (md) {
    md.forEach(function (def) {
      document.getElementById(def.key).addEventListener('click', function(e){
        e.preventDefault();

        fetch(def.admin.url)
          .then(function(res) {
            return res.text();
          }).then(function(body) {
            var m = `<div data-module-id="${3}">
                      <div>${def.name}</div>
                      <div>${body}</div>
                    </div>`;
            var nodes = document.querySelectorAll('[data-module-id]');
            var last = nodes[nodes.length - 1];
            last.insertAdjacentHTML('afterend', m);
          });
      });
    })
  });
