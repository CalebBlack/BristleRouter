const Bristle = require('bristlejs');

function createRouter(map) {
  var router = new Bristle('router');
  var routes = Object.assign({}, map);
  new BristleRouter(router, routes);
  return router;
}
class BristleRouter {
  constructor(bristle, routes) {
    this.checkURL = this.checkURL.bind(this);
    this.setURL = this.setURL.bind(this);
    this.getMatchingRoute = this.getMatchingRoute.bind(this);
    this.URL = window.location.pathname;
    this.bristle = bristle;
    this.routes = routes;
    window.addEventListener("hashchange", (event) => {
      this.checkURL();
    });
    this.disableRouteRefreshing.bind(this)();
    this.render();
  }
  disableRouteRefreshing(){
    document.addEventListener('click',(event)=>{
      let target = event.target;
      if (target.tagName.toLowerCase() === 'a') {
        if (target.hostname === window.location.hostname && this.routes.hasOwnProperty(target.pathname  || '/')) {
          event.preventDefault();
          history.pushState(null, null, target.pathname);
          this.setURL(target.pathname);
        }
      }
    })
  }
  render() {
    this.bristle.children = [];
    var element = this.bristle.element;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    var currentPath = this.getMatchingRoute(this.URL);
    if (currentPath && this.routes.hasOwnProperty(currentPath)) {
      var child = this.routes[currentPath];
      if (child instanceof HTMLElement) {
        this.bristle.render(child);
      } else if (child instanceof Bristle) {
        child.appendTo(this.bristle);
      }
    }
  }
  getMatchingRoute(pathIn) {
    var inputPath = this.getParts(pathIn);
    var output = null;
    Object.keys(this.routes).forEach(checkPath => {
      var checkParts = this.getParts(checkPath);
      if (output === null && this.doRoutePartsMatch(inputPath, checkParts)) {
        output = checkPath;
      }
    });
    return output;
  }
  doRoutePartsMatch(routeParts, currentParts) {
    if (routeParts.length !== currentParts.length) {
      return false;
    }
    for (var i = 0; i < routeParts; i++) {
      if (routeParts[i] !== '*' && routeParts[i] !== currentPath[i]) {
        return false;
      }
    }
    return true;
  }
  getPath(parts) {
    if (!Array.isArray(parts)) {
      throw this.error('Invalid Parts Input');
    }
    return '/' + parts.join('/');
  }
  getParts(path) {
    if (!typeof path === 'string' || path.length <= 0) {
      throw this.error('Invalid Path!')
    }
    return path.split('/').filter((path) => {
      return path
    });
  }
  checkURL() {
    if (this.URL !== window.location.pathname) {
      this.setURL(window.location.pathname);
    }
  }
  setURL(URL) {
    this.URL = URL;
    this.render();
  }
  error(str) {
    return new Error('BristleRouter Error: ' + str);
  }
}
module.exports = createRouter;
