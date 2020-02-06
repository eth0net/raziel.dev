raziel = {
  routes: [
    { path: "", layout: "/layouts/home.json", pathMatch: "full" },
    { path: "rzl", layout: "/layouts/rzl.json" },
    { path: "portfolio", layout: "/layouts/portfolio.json" },
    { path: "about", layout: "/layouts/about.json" },
    { path: "contact", layout: "/layouts/contact.json" },
    { path: "", layout: "/layouts/404.json" },
  ],

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

    this.router = new rzl.Router({
      hooks: [
        [
          "willNavigate",
          () => {
            rzl.destroyChildren(document.querySelector("#view"));
            this.showLoader();
          }
        ],
        ["didNavigate", () => this.hideLoader()]
      ],
      outlet: document.getElementById("view"),
      routes: this.routes
    });
  },

  // show the loading animation
  showLoader: function() {
    document.querySelector("#loader-view").classList.remove("rzl-hidden");
  },

  // hide the loading animation
  hideLoader: function() {
    document.querySelector("#loader-view").classList.add("rzl-hidden");
  }
};
