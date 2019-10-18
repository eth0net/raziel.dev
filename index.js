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
 	        { tag: "hr" },
          {
            id: "navcards", class: "rzl-flex-col", children: [
            	{
            		class: "pair rzl-flex-row", children: [
		              {
										class: "card link rzl-flex-row", children: [
											{
												class: "rzl-flex-col", children: [
													{ tag: "h2", content: "Rzl" },
				                  { tag: "p", content: "JS Library" }
				                ]
				            	},
				            	{ class: "iconify icon:whh:galaxyalt" }
		                ], events: { "click": "raziel.draw.bind(raziel,'rzl')" }
		              },
		              {
		                class: "card link rzl-flex-row", children: [
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
		                class: "card link rzl-flex-row", children: [
				              {
				                class: "rzl-flex-col", children: [
				                  { tag: "h2", content: "About" },
				                  { tag: "p", content: "All about me" }
				                ]
				              },
				              { class: "iconify icon:uil:user-square" }
		                ], events: { "click": "raziel.draw.bind(raziel,'about')" }
		              },
		              {
		                class: "card link rzl-flex-row", children: [
				              {
				                class: "rzl-flex-col", children: [
				                  { tag: "h2", content: "Contact" },
				                  { tag: "p", content: "Why not get in touch?" }
				                ]
				              },
				              { class: "iconify icon:jam:messages" }
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
		          { tag: "p", content: "JavaScript Library" },
	          ]
	        },
	        { tag: "hr" },
	        {
       			id: "overview", class: "rzl-flex-row", children: [
	        		{
		        		class: "card rzl-flex-row", children: [
			        		{
				        		class: "rzl-flex-col", children: [
											{ tag: "h2", content: "DOM Manipulation" },
											{ tag: "p", content: "Easily create, mutate and " +
												"destroy DOM elements directly, or use the UI " +
												"builder for more complex and repetetive builds." }
			        			]
			        		},
									{ class: "iconify icon:fa-solid:wrench" }
	        			]
	        		},
	        		{
		        		class: "card rzl-flex-row", children: [
			        		{
				        		class: "rzl-flex-col", children: [
											{ tag: "h2", content: "UI Builder" },
											{ tag: "p", content: "An iterative user interface " +
												"builder powering dynamic single page " +
												"application views." }
			        			]
			        		},
			        		{ class: "iconify icon:ic:round-dashboard" }
	        			]
	        		},
	        		{
		        		class: "card rzl-flex-row", children: [
			        		{
				        		class: "rzl-flex-col", children: [
											{ tag: "h2", content: "Convenience Functions" },
											{ tag: "p", content: "Random number generators, " +
												"data validation fuctions and more included." }
			        			]
			        		},
			        		{ class: "iconify icon:whh:braces" }
	        			]
	        		},
       			]
       		},
       		{
       			id: "examples", class: "rzl-flex-col", children: [
       				{
       					class: "example rzl-flex-col", children: [
       						{ tag: "h2", content: "Manipulating DOM elements" },
       						{ tag: "p", content: "There are a number of ways you can use Rzl to manipulate the DOM, here are some examples." },
       						{
       							tag: "pre", children: [
       								{
       									tag: "code", content:
       										"<span class='code-comment'>// Creating a simple element</span><br>" +
       										"let heading = rzl.addElement('h1', document.body, " +
       										"{ id: 'heading1', content: 'Hello World!' });<br>" +
       										"<br>" +
       										"<span class='code-comment'>// Finding an element</span><br>" +
       										"let found = rzl.findChild(document.body, 'h1', 'heading1');<br>" +
       										"<br>" +
       										"<span class='code-comment'>// Destroying an element</span><br>" +
       										"rzl.destroyElement(found, document.body);<br>" +
       										"rzl.destroyChild(document.body, 'h1', 'heading1');<br>" +
       										"<br>" +
       										"<span class='code-comment'>// Destroying child elements</span><br>" +
       										"rzl.destroyChildren(document.body);<br>" +
       										"rzl.destroyChildren(document.body, 'div');<br>"
       								}
       							]
       						}
       					]
       				},
       				{
       					class: "example rzl-flex-col", children: [
       						{ tag: "h2", content: "Building a User Interface" },
       						{
       							tag: "p",
       							content: "You can also use Rzl to change the contents of " +
       											 "the DOM quickly using predefined layouts, giving" +
       											 " you the tools you need to create powerful single" +
       											 " page applications."
       						},
       						{
       							tag: "pre", children: [
       								{
       									tag: "code", content:
       										"<span class='code-comment'>// Create a UI definition</span><br>" +
       										"let def = {<br>" +
       										"  meta: { name: 'myUIName' },<br>" +
       										"  view: {<br>" +
       										"    class: 'myClass1',<br>" +
       										"    children: [<br>" +
       										"      { tag: 'h1', id: 'heading1', class: 'myClass2', content: 'UI Heading!' },<br>" +
       										"      {<br>" +
       										"        tag: 'div',<br>" +
       										"        style: {<br>" +
       										"          display: 'flex',<br>" +
       										"          flexDirection: 'column',<br>" +
       										"          'flex-wrap': 'nowrap'<br>" +
       										"        },<br>" +
       										"        children: [<br>" +
       										"          { tag: 'h2', content: 'Flexbox Heading' },<br>" +
       										"          { tag: 'p', content: 'Flexbox paragraph.' }<br>" +
       										"        ]<br>" +
       										"      }<br>" +
       										"    ]<br>" +
       										"  }<br>" +
       										"};<br>" +
       										"<br>" +
       										"<span class='code-comment'>// Create a class instance</span><br>" +
       										"let myUI = new rzl.UI(def, { pnode: document.body });<br>"
       								}
       							]
       						}
       					]
       				},
       				{
       					class: "example rzl-flex-col", children: [
       						{ tag: "h2", content: "Convenience Functions" },
       						{
       							tag: "p",
       							content: "There are also some convenience functions " +
       											 "included in Rzl, simplifying some common tasks."
       						},
       						{
       							tag: "pre", children: [
       								{
       									tag: "code", content:
       										"<span class='code-comment'>// Capitalise the first letter in a string</span><br>" +
       										"let cap = rzl.capitalise('test'); <span class='code-comment'>// 'Test'</span><br>" +
       										"<br>" +
       										"<span class='code-comment'>// Gather the fields of a form by id</span><br>" +
       										"let fields = rzl.getFormFields(myForm);<br>" +
       										"<span class='code-comment'>// { id1: field1, id2: field2 }</span><br>" +
       										"<br>" +
       										"<span class='code-comment'>// Get the largest number in an Array</span><br>" +
       										"let arr = [1, 5, 10];<br>" +
       										"let large = rzl.largestOf(arr); <span class='code-comment'>// 10</span><br>" +
       										"<br>" +
       										"<span class='code-comment'>// Get a random entry from an Array</span><br>" +
       										"let large = rzl.randomArrayItem(arr);<br>" +
       										"<br>" +
       										"<span class='code-comment'>// Generate random integers</span><br>" +
       										"let rng0 = rzl.rng0to(100); <span class='code-comment'>// 0 to 100</span><br>" +
       										"let rng1 = rzl.rng1to(100); <span class='code-comment'>// 1 to 100</span><br>" +
       										"<br>" +
       										"<span class='code-comment'>// Check for undefined variables</span><br>" +
       										"let out1 = rzl.undef(myVar); <span class='code-comment'>// true</span><br>" +
       										"let myVar = 'I am defined!';<br>" +
       										"let out2 = rzl.undef(myVar); <span class='code-comment'>// false</span><br>" +
       										""
       								}
       							]
       						}
       					]
       				},
       			]
	        },
	        { tag: "hr" },
	        {
	        	id: "next", class: "rzl-flex-col", children: [
	        		{ tag: "h2", content: "Where to go next" },
			        {
			        	id: "steps", class: "rzl-flex-row", children: [
									{ tag: "a", content: "Code", props: { href: "https://github.com/raziel2244/rzl" } },
									{ tag: "a", content: "Docs", props: { href: "https://docs.raziel.dev" } },
									{ tag: "a", content: "Gitter", props: { href: "https://gitter.im/raziel2244/rzl" } },
			        	]
			        }
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
		          { tag: "p", content: "Some of my work" },
 							{ tag: "p", content: "<br>Under construction" }
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
							{ tag: "p", content: "All about me" },
							{ tag: "p", content: "<br>Under construction" }
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
							{ tag: "p", content: "Why not get in touch?" },
							{ tag: "p", content: "<br>Under construction" }
						]
					}
				],
      }
    },

  }

}
