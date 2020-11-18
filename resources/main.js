function $(x) {
  return document.getElementById(x);
} 

const expandSkis = $('ski-expand-icon');
const skisInfo = $('more-info-skis');

const expandBindings = $('bindings-expand-icon');
const bindingsInfo = $('more-info-bindings');

expandSkis = onclick = function() {
  expandSkis.style.transform = 'rotate(-90deg)';
  skisInfo.style.display = 'flex';
}

expandBindings = onclick = function() {
  expandBindings.style.transform = 'rotate(-90deg)';
  bindingsInfo.style.display = 'flex';
}