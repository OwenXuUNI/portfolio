// Javascript code was generated with the assistance of ChatGpt
const container = document.querySelector('.selection_container');

const categories = [
  {name:"Branding", id:"branding"},
  {name:"Film", id:"film"},
  {name:"Misc", id:"misc"}
];

const projects = {
  branding: [
    {title:"Little Black Coffee", link:"lbc.html"},
    {title:"more coming soon", link:""}
  ],
  film: [
    {title:"Isolation", link:"isolation.html"},
    {title:"more coming soon", link:""}
  ],
  misc: [
    {title:"Snowfall", link:"snowfall.html"},
    {title:"more coming soon", link:""}
  ]
};

container.addEventListener("click", (e) => {

  const box = e.target.closest(".box");
  if(!box) return;

  // RETURN BUTTON
  if(box.dataset.type === "return"){

    const boxes = document.querySelectorAll(".box");
    boxes.forEach(b => b.classList.add("hide"));

    setTimeout(showCategories, 400);
    return;
  }

  // PROJECT CLICK
  if(box.dataset.link){
    if(box.dataset.link !== ""){
      window.location.href = box.dataset.link;
    }
    return;
  }

  // CATEGORY CLICK
  const category = box.dataset.category;
  if(!category) return;

  const boxes = document.querySelectorAll(".box");
  boxes.forEach(b => b.classList.add("hide"));

  setTimeout(() => {

    container.innerHTML = "";

    // PROJECTS FIRST
    projects[category].forEach(project => {

      const newBox = document.createElement("div");
      newBox.classList.add("box");
      newBox.textContent = project.title;
      newBox.dataset.link = project.link;

      container.appendChild(newBox);

    });

    // RETURN BUTTON LAST (appears on the right)
    const returnBox = document.createElement("div");
    returnBox.classList.add("box");
    returnBox.dataset.type = "return";
    returnBox.textContent = "Return";

    container.appendChild(returnBox);

  },400);

});


function showCategories(){

  container.innerHTML = "";

  categories.forEach(cat => {

    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.category = cat.id;
    box.textContent = cat.name;

    container.appendChild(box);

  });

}