raziel = {
  layouts: new Map(),
  state: {},

  init: function() {
    console.log("init called");

    // setup service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js")
        .then(() => console.log("Successfuly registered service worker"))
        .catch(e => console.log("Failed to register service worker"));
    }

    // navigate to target using current hash, if any
    this.render();

    // handle future hash changes, including back button
    onhashchange = () => this.render();
  },

  // navigate to the given target
  render: async function(target = this.parseHash()) {
    if (target == "") target = "home";

    rzl.destroyChildren(document.querySelector("#view"));

    this.showLoader();

    const layout = await this.loadLayout(target);

    if (!layout) return false;

    if (this.parseHash != target) this.setHash(target);

    // draw the appropriate interface
    new rzl.UI(layout, { pnode: "view" });

    this.hideLoader();

    // return the new route name
    return target;
  },

  parseHash: function() {
    return location.hash.split("/")[1];
  },

  setHash: function(layoutName) {
    const base = (layoutName === "home") ? "" : layoutName;
    let path = `/${base}`;
    return location.hash = path;
  },

  cacheLayout: function(name, layout) {
    console.log("caching", name, layout);
    this.layouts.set(name, layout);
    return layout;
  },

  loadLayout: async function(target) {
    // check local cache
    if (this.layouts.has(target)) return this.layouts.get(target);

    // else load from server
    return fetch(`layouts/${target}.json`)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => this.cacheLayout(target, data))
      .catch(error => {
        console.error(`Failed to get layout: ${target}`);
        console.error(error);
        return false;
      });
  },

  showLoader: function() {
    document.querySelector("#loader-view").classList.remove("rzl-hidden");
  },

  hideLoader: function() {
    document.querySelector("#loader-view").classList.add("rzl-hidden");
  },
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
