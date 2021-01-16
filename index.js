raziel = {
  layouts: new Map(),
  state: {},

  // setup the initial view and service worker
  init: function() {
    console.log("init called");

    // setup service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js")
        .then(() => console.log("Successfuly registered service worker"))
        .catch(e => console.log("Failed to register service worker"));
    }

    document.getElementById("copyright-date").textContent = new Date().getFullYear();

    // render the initial view
    this.render();

    // handle hash changes
    onhashchange = () => this.render();
  },

  // navigate to the given target
  render: async function(target = this.parseHash()) {
    if (!target || target == "") target = "home";

    // clear out old content in the div
    rzl.destroyChildren(document.querySelector("#view"));

    // display the loader
    this.showLoader();

    // get the layout
    const layout = await this.loadLayout(target);
    if (!layout) return false;
    
    // update hash and render the layout
    if (this.parseHash != target) this.setHash(target);
    new rzl.UI(layout, { pnode: "view" });

    this.hideLoader();

    // return the new route name
    return target;
  },

  // parse the layout name from the hash
  parseHash: function() {
    return location.hash.split("/")[1];
  },

  // update the hash using the new layout name
  setHash: function(layoutName) {
    const base = (layoutName === "home") ? "" : layoutName;
    let path = `/${base}`;
    return location.hash = path;
  },

  // store a copy of the layout locally
  cacheLayout: function(name, layout) {
    console.log("caching", name, layout);
    this.layouts.set(name, layout);
    return layout;
  },

  // load layouts in from the server
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

  // show the loading animation
  showLoader: function() {
    document.querySelector("#loader-view").classList.remove("rzl-hidden");
  },

  // hide the loading animation
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
