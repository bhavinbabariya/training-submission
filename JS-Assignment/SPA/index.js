const home = document.getElementById("home");const homeBtn = document.getElementById("homeBtn");
homeBtn.addEventListener("click", () => {
     home.scrollIntoView({
         behavior: "smooth",
         block: "end",
         inline: "nearest",
     });});