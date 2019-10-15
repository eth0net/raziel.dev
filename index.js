raziel = {

  state: {},

  init: function () {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(() => console.log("Successfuly registered service worker"))
        .catch(e => console.log("Failed to register service worker"))
    }

    let target = document.location.hash.split("/")[1];
    if (target === "") target = "home";
    this.draw(target);

  },

  // draw the UI
  draw: function (target = "home") {
    document.location.hash = (target === "home") ? "/" : "/" + target;
    this.state.active = target;
    new rzl.UI(this.layouts[target], { pnode: "view" });
  },

  layouts: {

    home: {
      meta: { name: "home", domain: "raziel" },
      view: {
        class: "ui-view container rzl-flex-col",
        children: [
          {
            id: "banner", class: "rzl-flex-col", children: [
              { tag: "h1", content: "Raziel" },
              { tag: "p", content: "Web Developer" }
            ]
          },
          {
            id: "cards", class: "rzl-flex-col", children: [
            	{
            		class: "pair rzl-flex-row", children: [
		              {
										class: "card rzl-flex-row", children: [
											{
												class: "rzl-flex-col", children: [
													{ tag: "h2", content: "Rzl" },
				                  { tag: "p", content: "JS Library" }
				                ]
				            	},
				            	{ class: "iconify icon:jam:universe" }
		                ], events: { "click": "raziel.draw.bind(raziel,'rzl')" }
		              },
		              {
		                class: "card rzl-flex-row", children: [
				              {
				                class: "rzl-flex-col", children: [
				                  { tag: "h2", content: "Portfolio" },
				                  { tag: "p", content: "Some of my work" }
				                ]
				              },
		 		            	{ class: "iconify icon:jam:folder" }
		                ], events: { "click": "raziel.draw.bind(raziel,'portfolio')" }
		              },
		            ]
		          },
              {
                class: "pair rzl-flex-row", children: [
		              {
		                class: "card rzl-flex-row", children: [
				              {
				                class: "rzl-flex-col", children: [
				                  { tag: "h2", content: "About" },
				                  { tag: "p", content: "All about me" }
				                ]
				              },
				              { class: "iconify icon:jam:user-circle" }
		                ], events: { "click": "raziel.draw.bind(raziel,'about')" }
		              },
		              {
		                class: "card rzl-flex-row", children: [
				              {
				                class: "rzl-flex-col", children: [
				                  { tag: "h2", content: "Contact" },
				                  { tag: "p", content: "Why not get in touch?" }
				                ]
				              },
				              { class: "iconify icon:jam:message" }
		                ], events: { "click": "raziel.draw.bind(raziel,'contact')" }
		              }
		            ]
		          }
            ]
          }
        ]
      }
    },

    rzl: {
      meta: { name: "rzl", domain: "raziel" },
      view: {
	      class: "ui-view container rzl-flex-col",
	      children: [
	        {
	          id: "banner", class: "rzl-flex-col", children: [
		          { tag: "h1", content: "Rzl" },
		          { tag: "p", content: "Javascript Library" }
	          ]
	        }
	      ],
      }
    },

    portfolio: {
      meta: { name: "portfolio", domain: "raziel" },
      view: {
 	      class: "ui-view container rzl-flex-col",
 	      children: [
 	        {
 	          id: "banner", class: "rzl-flex-col", children: [
		          { tag: "h1", content: "Portfolio" },
		          { tag: "p", content: "Some of my work" }
 	          ]
 	        }
 	      ],
      }
    },

    about: {
      meta: { name: "about", domain: "raziel" },
      view: {
				class: "ui-view container rzl-flex-col",
				children: [
					{
						id: "banner", class: "rzl-flex-col", children: [
							{ tag: "h1", content: "About" },
							{ tag: "p", content: "All about me" }
						]
					}
				],
      }
    },

    contact: {
      meta: { name: "contact", domain: "raziel" },
      view: {
				class: "ui-view container rzl-flex-col",
				children: [
					{
						id: "banner", class: "rzl-flex-col", children: [
							{ tag: "h1", content: "Contact" },
							{ tag: "p", content: "Why not get in touch?" }
						]
					}
				],
      }
    }

  }

}
