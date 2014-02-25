var currentViewCount = 0;

var page_checkViewCount = function (cid) {
  var viewCount = parseInt(cid.replace('view', ''));
  var diffViewCount = viewCount - currentViewCount;
  var expression;
  if (diffViewCount > 500) {
    console.error('Dude, we are creating ' + diffViewCount + ' views(before: ' + currentViewCount + ', after: ' + viewCount + ' ) here, you sure IE can handle it?');
  }
  currentViewCount = viewCount;
}

window.addEventListener('message', function() {
  page_checkViewCount(event.data.__viewId);
});
