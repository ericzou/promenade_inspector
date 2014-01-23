var page_getProperties = function() {
  var app = window.daboApp; // hardcode the app name for now
  var $currentElement = $($0);
  var modelId = $currentElement.data('model-id');
  var modelType = $currentElement.data('type');
  var ret = app;

  if (modelType) {
    ret = app.getResource(modelType);
  }

  if (modelId && (typeof ret.get === 'function')) {
    ret = ret.get(modelId);
  }

  return ret;
}

chrome.devtools.panels.elements.createSidebarPane(
    "Promenade Properties",
    function(sidebar) {
  function updateElementProperties() {
    sidebar.setExpression("(" + page_getProperties.toString() + ")()");
  }
  updateElementProperties();
  chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties);
});