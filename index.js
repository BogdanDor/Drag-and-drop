document.onreadystatechange = function() {
  switch(document.readyState) {
    case 'complete':
      sortable(document.getElementById('list'));
      break;
  }
};

function sortable(rootElement) {
  var dragElement;
  var a = rootElement;
  [].slice.call(rootElement.children).forEach(function(element) {
    element.draggable = true;
  });
  rootElement.addEventListener('dragstart', onDragStart, false);

  function onDragStart(evt) {
    dragElement = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('Text', dragElement.textContent);
    rootElement.addEventListener('dragover', onDragOver, false);
    rootElement.addEventListener('dragend', onDragEnd, false);
    rootElement.addEventListener('drop', onDrop, false);
    dragElement.classList.add('drag');
    setTimeout(function() {
    }, 0);
  }

  function onDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
    var target = evt.target;
    if (target && target !== dragElement && target.className == 'card') {
      var reference = null;
      if (target.nextElementSibling) {
        var rect = target.getBoundingClientRect();
        var next = (evt.clientY - rect.top)/(rect.bottom - rect.top) > 0.5;
        reference = next && target.nextElementSibling || target;
      }
      rootElement.insertBefore(dragElement, reference);
    }
  }

  function onDragEnd(evt) {
    if(evt.preventDefault) { evt.preventDefault(); }
    if(evt.stopPropagation) { evt.stopPropagation(); }
    dragElement.classList.remove('drag');
    rootElement.removeEventListener('dragover', onDragOver, false);
    rootElement.removeEventListener('dragend', onDragEnd, false);
    rootElement.removeEventListener('drop', onDrop, false);
  }

  function onDrop(evt) {
    if(evt.preventDefault) { evt.preventDefault(); }
    if(evt.stopPropagation) { evt.stopPropagation(); }
  }
}

