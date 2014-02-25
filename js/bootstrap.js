var currentViewCount = 0;


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

// chrome.browserAction.onClicked.addListener(function(tab) {
//     // No tabs or host permissions needed!
//     console.log('Turning ' + tab.url + ' red!');
//     chrome.tabs.executeScript({
//       code: 'document.body.style.backgroundColor="blue"'
//     });
//   });

var expression = "window.__viewId; window.addEventListener('mouseup', function(){ window.__viewId = new Backbone.View().cid; window.postMessage({__viewId: window.__viewId}, '*')});"
chrome.devtools.inspectedWindow.eval(expression);



chrome.devtools.panels.elements.createSidebarPane(
    "Promenade Properties",
    function(sidebar) {


  // feature: display property
  function updateElementProperties() {
    sidebar.setExpression("(" + page_getProperties.toString() + ")()");
  }
  updateElementProperties();
  chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties);

  // // feature: warn view count
  // $(document).click(function() {
  //   var viewCount = page_calculateViewCount();
  //   var diffViewCount = viewCount - currentViewCount;
  //   if (diffViewCount > 500) {
  //     console.error('Dude, we are creating a lot of views here, you sure IE can handle it?', window.location.href, diffViewCount);
  //   }
  //   currentViewCount = viewCount;
  // });
});