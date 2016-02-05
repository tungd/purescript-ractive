
// module Test.Main

var jsdom = require('jsdom');

var _html = "<!doctype html><html><body><div id='app'></div></body></html>";
var _template = "<div>template</div>";


//based on ideas from @fraser-xu
//original article: http://webuild.envato.com/blog/running-headless-javascript-testing-with-electron-on-any-ci-server/
var setupDOM = function(html){
  return function(){
    if (typeof document !== 'undefined') {
      return
    }

    if(html &&
      html.constructor &&
      html.constructor.name != 'Nothing') {
      docHTML = html;
    }else{
      docHTML = _html;
    }

    global.document = jsdom.jsdom(docHTML);
    global.window = global.document.defaultView;
    global.navigator = {
      userAgent: 'PureScript.DOM'
    };
  };
  return {};
};

module.exports = {
  setupDOM   : setupDOM,
  defaultHtml     : _html,
  defaultTemplate : _template
}