const items = document.querySelector(".courses__items");
const item = document.querySelectorAll(".courses__items-item");
// console.log(items.querySelector(".courses__items-item").dataset);

async function getItems(level = "All") {
  try {
    let req = await fetch(`./items.json`);
    let res = await req.json();
    res = res.filter(function (element) {
      if (level == "All") {
        return true;
      } else {
        return element.level == level;
      }
    });

    showData(res);
  } catch (err) {
    items.innerHTML = `<h1>${err.message}, CORS error, works with live server</h1>`;
    console.log(Error(err.message));
  }
}

function showData(list) {
  items.classList.add("opacity-0", "transition-opacity", "duration-300");
  setTimeout(() => {
    items.innerHTML = "";
    for (let i = 0; i < list.length; i++) {
      items.innerHTML += ` <div
        data-level=${list[i].level}        
        class="courses__items-item overflow-hidden flex flex-col border-1 border-gray-500 rounded-3xl"
              >
                <div class="aspect-[16/9] relative">
                  <img
                    src="${list[i].image}"
                    class="absolute top-0 left-0 w-full h-full object-cover"
                    alt=""
                  />
                  <a
                href="#"
                class="card-overlay absolute top-0 left-0 w-full h-full bg-gray-900/70 opacity-0 transition-opacity duration-300 overflow-hidden flex justify-center items-end"
              >
                <span
                  class="-mb-8 block transition-[margin-bottom] duration-300 delay-75"
                  ><i class="fa-solid fa-arrow-up-right-from-square"></i> Show
                  Details</span
                >
              </a>
                </div>
                <div
                  class="item-body h-auto flex grow flex-col items-start gap-3 p-4"
                >
                  <h3 class="text-3xl">${list[i].title}</h3>
                  <p class="font-extralight">${list[i].description}</p>
                  <div
                    class="item-foot mt-auto flex justify-between items-center self-stretch"
                  >
                    <a
                      href="#"
                      class="rounded-4xl py-1 px-3 bg-transparent border-2 border-amber-300 hover:bg-amber-300 hover:text-gray-900 transition"
                      >Enroll now <i class="fa-solid fa-arrow-right"></i
                    ></a>
                    <div
                      class="item-level rounded-4xl py-1 px-3 ${
                        list[i].level == "Beginner"
                          ? "bg-green-500"
                          : list[i].level == "Intermediate"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      } text-xs"
                    >
                      ${list[i].level}
                    </div>
                  </div>
                </div>
              </div>`;
    }
    items.classList.remove("opacity-0");
  }, 300);
}

const filter = document.querySelector(".courses__filter");
filter.addEventListener("click", function (e) {
  filter.querySelectorAll("a").forEach((element) => {
    element.classList.remove("active");
  });
  if (e.target.dataset.level) {
    e.preventDefault();
    e.target.classList.add("active");
    let level = e.target.dataset.level;
    getItems(level);
  }
});

let test = document.querySelector(".testimonials");
let testText = test.querySelector(".testimonials__text");
let testImgBig = test.querySelector(".testimonials__images-big");
let testImgMini = test.querySelector(".testimonials__images-mini");

testImgMini.addEventListener("click", function (e) {
  if (e.target.closest(".mini-item")) {
    testImgMini.querySelectorAll("div").forEach(function (ele) {
      ele.classList.remove("active");
    });
    e.target.closest(".mini-item").classList.add("active");
    if (e.target.closest("#img1")) {
      testImgBig.querySelector("img").src = e.target.closest("#img1").src;
      testText.querySelector("q").innerText =
        "This platform gave me the confidence to finally start coding. The explanations were simple, and the projects made learning fun and practical.";
      testText.querySelector("h4").innerText = "Sara Ahmed";
      testText.querySelector("h5").innerText = "Web Development";
    } else if (e.target.closest("#img2")) {
      testImgBig.querySelector("img").src = e.target.closest("#img2").src;
      testText.querySelector("q").innerText =
        "I loved the step-by-step structure. Even as a beginner, I never felt lost. Now I’m building mobile apps I once thought were impossible!";
      testText.querySelector("h4").innerText = "Emily Johnson";
      testText.querySelector("h5").innerText = "Mobile App Development";
    } else if (e.target.closest("#img3")) {
      testImgBig.querySelector("img").src = e.target.closest("#img3").src;
      testText.querySelector("q").innerText =
        "The courses here are a game-changer. Clear lessons, great projects, and the support from the community made a huge difference in my learning journey.”";
      testText.querySelector("h4").innerText = "Omar Khaled";
      testText.querySelector("h5").innerText = "Data Science";
    }
  }
});
