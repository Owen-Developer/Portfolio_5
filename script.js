let homeLinks = document.querySelectorAll(".home-link");
let headerDisc = document.querySelector(".header-disc-flex");
let viewFlex = document.querySelector(".view-flex");
let menuModal = document.querySelector(".menu-modal");
let homeImgs = document.querySelectorAll(".home-img");
let workImgFlexs = document.querySelectorAll(".work-img-flex");
let workImgs1 = workImgFlexs[0].querySelectorAll(".work-img");
let workImgs2 = workImgFlexs[1].querySelectorAll(".work-img");
let reviewWrappers = document.querySelectorAll(".rev-wrapper");
let testBtns = document.querySelectorAll(".btn-test");
let line1 = document.querySelector(".menu-line1");
let line2 = document.querySelector(".menu-line2");
let line3 = document.querySelector(".menu-line3");

let homeIdx = 1;
let currentWindow = window.innerWidth;
let aboutFirst = true;
let modalOpen = false;
let firstReset = true;
let testTimeout;
let starterElements;
let starterArray = [];


homeLinks.forEach((link, idx) => {
    link.addEventListener("mouseenter", () => {
        document.querySelectorAll(".home-arr")[idx].classList.add("home-arr-vis");
    });
    link.addEventListener("mouseleave", () => {
        document.querySelectorAll(".home-arr")[idx].classList.remove("home-arr-vis");
    });
});

function flexHover(list, selectedClass1, selectedClass2){
    console.log(list);
    list.addEventListener("mouseenter", () => {
        document.querySelector("." + selectedClass1).style.color = "hsl(213, 86%, 68%)";
        document.querySelector("." + selectedClass2).style.backgroundColor = "hsl(213, 86%, 68%)";
    });
    list.addEventListener("mouseleave", () => {
        document.querySelector("." + selectedClass1).style.color = "var(--blue-black)";
        document.querySelector("." + selectedClass2).style.backgroundColor = "var(--blue-black)";
    });
}
flexHover(headerDisc, "header-disc-txt", "header-arr-wrapper");
flexHover(viewFlex, "view-txt", "view-arr-wrapper");
flexHover(document.querySelector(".serv-view-flex"), "serv-view-txt", "serv-arr-wrapper");
flexHover(document.querySelector(".art-view-flex"), "art-view-txt", "art-arr-wrapper");

function toggleModal(){
    if(!modalOpen){
        modalOpen = true;
        menuModal.style.display = "flex";
        setTimeout(() => {
            menuModal.style.opacity = "1";
            line1.style.width = "32px";
            line1.style.transform = "rotate(-45deg)";
            line1.style.top = "12px"
            line2.style.opacity = "0";
            line3.style.width = "32px";
            line3.style.transform = "rotate(45deg)";
            line3.style.top = "-12px";
        }, 50);
    } else {
        modalOpen = false;
        menuModal.style.opacity = "0";
        line1.style.width = "20px";
        line1.style.transform = "rotate(0deg)";
        line1.style.top = "0px"
        line2.style.opacity = "1";
        line3.style.width = "12px";
        line3.style.transform = "rotate(0deg)";
        line3.style.top = "0px";
        setTimeout(() => {
            menuModal.style.display = "none";
        }, 500);
    }
}

//    HOME     //
setInterval(() => {
    let oldImg = homeImgs[homeIdx];
    let newImg;
    if(homeIdx == 2){
        newImg = homeImgs[0];
        homeIdx = 0;
    } else {
        newImg = homeImgs[homeIdx + 1];
        homeIdx++;
    }
    oldImg.classList.add("home-away");
    setTimeout(() => {
        newImg.classList.remove("home-ready");
    }, 100);
    setTimeout(() => {
        oldImg.classList.add("home-ready");
        oldImg.classList.remove("home-away");
    }, 700);
}, 3000);
//    ABOUT     //
setInterval(() => {
    if(aboutFirst){
        document.querySelectorAll(".about-img")[0].style.opacity = "0";
            document.querySelectorAll(".about-img")[1].style.opacity = "1";
        aboutFirst = false;
    } else {
        document.querySelectorAll(".about-img")[1].style.opacity = "0";
            document.querySelectorAll(".about-img")[0].style.opacity = "1";
        aboutFirst = true;
    }
}, 4200);

function moveWork(imgSet, direction){
    let startingOffset = 2805;
    let imgWidth = 531;
    let imgGap = 30;
    if(window.innerWidth > 760){
        startingOffset = 2805;
        imgWidth = 531;
        imgGap = 30;
    } else {
        startingOffset = 1545;
        imgWidth = 294;
        imgGap = 15;
    }
    imgSet.forEach((img, idx) => {
        let currentOffset = startingOffset - ((imgGap * (idx)) + (imgWidth * idx));// last = 0 // reset = 0 - gap - imgwidth 
        img.style[direction] = currentOffset + "px";
    });

    setInterval(() => {
        imgSet.forEach(img => {
            let currentImgWidth;
            if(direction == "left"){
                currentImgWidth = Number(img.style.left.slice(0, img.style.left.indexOf("p"))); // straight up Num
            } else {
                currentImgWidth = Number(img.style.right.slice(0, img.style.right.indexOf("p"))); // straight up Num
            }
            if(currentImgWidth == (0 - imgGap - imgWidth)){
                if(direction == "left"){   
                    img.style.left = startingOffset + "px";
                } else {
                    img.style.right = startingOffset + "px";
                }
            } else {
                if(direction == "left"){
                    img.style.left = (currentImgWidth - 1) + "px";
                } else {
                    img.style.right = (currentImgWidth - 1) + "px";
                }
            }
        });
    }, 10);
}
moveWork(workImgs1, "left");
moveWork(workImgs2, "right");

document.querySelectorAll(".skill-box").forEach(box => {
    box.addEventListener("mouseenter", () => {
        box.style.borderBottom = "1px solid var(--skyblue)";
        box.querySelector(".skill-arr-wrapper").classList.add("skill-arr-active");
        box.querySelector(".skill-arr").src = "images/serv-arr-hover.png";
        document.querySelectorAll(".serv-img-container").forEach(container => {
            container.style.opacity = "0";
        });
        box.querySelector(".serv-img-container").style.opacity = "1";
    });
    box.addEventListener("mouseleave", () => {
        box.style.borderBottom = "1px solid hsla(240, 20%, 19%, 0.25)";
        box.querySelector(".skill-arr-wrapper").classList.remove("skill-arr-active");
        box.querySelector(".skill-arr").src = "images/serv-arr.png";
        box.querySelector(".serv-img-container").style.opacity = "0";
    });
});

function switchReview(direction){if(!testTimeout){
    testTimeout = true;
    setTimeout(() => {testTimeout = false;}, 1000);
    let rightAmount = getWidth(window.innerWidth);
    let currentAmount = reviewWrappers[0].style.right;
    let currentNumber = Number(currentAmount.slice(0, currentAmount.indexOf("p")));
    if(direction == "right"){
        reviewIdx++;
        if(reviewIdx == 5){
            testBtns[1].classList.add("test-inactive");
            moveReviewWrappers((currentNumber + rightAmount) + "px");
        } else {
            testBtns[0].classList.remove("test-inactive");
            moveReviewWrappers((currentNumber + rightAmount) + "px");
        }
    } else if(direction == "left") {
        reviewIdx--;
        if(reviewIdx == 0){
            testBtns[0].classList.add("test-inactive");
            moveReviewWrappers((currentNumber - rightAmount) + "px");
        } else {
            testBtns[1].classList.remove("test-inactive");
            moveReviewWrappers((currentNumber - rightAmount) + "px");
        }
    }
}}
function moveReviewWrappers(amount){
    reviewWrappers.forEach((wrapper, idx) => {
        wrapper.style.right = amount;
        if(idx == reviewIdx){
            wrapper.style.opacity = "1";
        } else {
            wrapper.style.opacity = "1";
        }
    });
}
function getWidth(windowWidth){
    if(windowWidth <= 655){
        return 320;
    } else if(windowWidth <= 1600){
        return 530;
    } else {
        return 1190;
    }
}
function resetTest(){if(window.innerWidth != currentWindow || firstReset){
    testBtns.forEach(btn => {btn.classList.remove("test-inactive")});
    reviewIdx = 1;
    if(window.innerWidth <= 655){
        moveReviewWrappers("-480px");
    } else if(window.innerWidth <= 1600){
        moveReviewWrappers("-795px");
    } else {
        moveReviewWrappers("-1784px");
    }
    currentWindow = window.innerWidth;
    firstReset = false;
}}
resetTest(); // FIX INVIS
window.addEventListener("resize", resetTest);

document.querySelectorAll(".art-link-flex").forEach(link => {
    link.addEventListener("mouseenter", () => {
        link.querySelector(".art-link").style.color = "var(--skyblue)";
        link.querySelector(".box-arr-wrapper").style.backgroundColor = "var(--skyblue)";
        link.querySelector(".box-arr-wrapper").style.border = "1px solid var(--skyblue)";
        link.querySelector(".box-arr").style.color = "white";
    });
    link.addEventListener("mouseleave", () => {
        link.querySelector(".box-arr-wrapper").style.backgroundColor = "white";
        link.querySelector(".box-arr-wrapper").style.border = "1px solid hsla(240, 20%, 19%, 0.25)";
        link.querySelector(".box-arr").style.color = "var(--blue-black)";
        link.querySelector(".art-link").style.color = "var(--blue-black)";
    });
});

function setStarterElements(){
    // DECLARE VISIBLE ELEMENTS CORRESPONDING DEVICE
    starterElements = document.querySelectorAll(".st-a");
    if(window.innerWidth <= 492){
        starterArray.push(starterElements[0]);
        starterArray.push(starterElements[2]);
        starterArray.push(starterElements[4]);
        starterArray.push(starterElements[1]);
    } else if(window.innerWidth <= 760) {
        starterArray.push(starterElements[0]);
        starterArray.push(starterElements[2]);
        starterArray.push(starterElements[4]);
        starterArray.push(starterElements[5]);
        starterArray.push(starterElements[1]);
    } else if(window.innerWidth <= 1150) {
        starterArray.push(starterElements[0]);
        starterArray.push(starterElements[1]);
        starterArray.push(starterElements[2]);
        starterArray.push(starterElements[3]);
        starterArray.push(starterElements[4]);
        starterArray.push(starterElements[5]);
    } else if(window.innerWidth > 1150){
        starterArray.push(starterElements[0]);
        starterArray.push(starterElements[1]);
        starterArray.push(starterElements[2]);
        starterArray.push(starterElements[3]);
        starterArray.push(starterElements[4]);
        starterArray.push(starterElements[5]);
        starterArray.push(starterElements[6]);
    }

    // MAKE ELEMENTS VISIBLE
    starterArray.forEach((element, idx) => {
        element.style.transition = "0.5s ease";
        element.style.position = "relative";
        setTimeout(() => {
            element.style.bottom = "0px";
            element.classList.remove("st-a", "st-492");
        }, 300 * (idx + 1));
    });
}
setStarterElements();

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "0.5s ease";
        entry.target.style.position = "relative";
        entry.target.style.bottom = "0px";
        entry.target.classList.remove("scroll-target");

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0 // Trigger when 10% of the element is visible
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});