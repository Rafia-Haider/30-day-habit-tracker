let input = document.querySelector(".input-card input");

let saveBtn = document.querySelector(".input-card .save-btn");

let habitGrid = document.querySelector(".tracker");

let habitHeader = document.querySelector(".tracker h2")

let dayGrid = document.querySelector(".tracker .day-grid");

let inputMsg = document.querySelector(".input-card .input");

let inputCard = document.querySelector(".input-card");

const errorMsg = document.createElement("div");
inputMsg.appendChild(errorMsg);
errorMsg.classList.add("error-msg");

const STORAGE_KEY = "trackerObject";

saveBtn.addEventListener("click", () => {
    if (input.value.trim() == "") {
        console.log("please enter some value");
        errorMsg.textContent = "Please Enter a habit.";
    }
    else {
        errorMsg.textContent = "";
        saveToLocalStorage();
        habitGrid.style.display = "block";
        renderDayCells();
        reset();
        habitHeader.textContent = `${input.value}(30-day track):`;
        input.value = "";
        inputCard.style.display = "none";
    }
})



function saveToLocalStorage() {
    let trackerObject = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    trackerObject = {
        habitName: input.value,
        days: Array(30).fill(false)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trackerObject));
}

function renderDayCells() {
    dayGrid.innerHTML = "";

    let trackerObject = JSON.parse(localStorage.getItem(STORAGE_KEY));

    for (let i = 0; i < 30; i++) {
        let dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayGrid.appendChild(dayCell);
        dayCell.textContent = `Day ${i + 1}`;

        if (trackerObject.days[i] === true) {
            dayCell.classList.add("completed");
        }


        // DAY CELL CLICKED, SO DAY COMPLETED.
        dayCell.addEventListener("click", () => {
            let currentObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
            currentObject.days[i] = !currentObject.days[i];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentObject));
            dayCell.classList.toggle("completed");
            if (currentObject.days[i]) {
                let checkImg = document.createElement("img");
                checkImg.classList.add("img");
                checkImg.src = "assets/check.png";
                dayCell.appendChild(checkImg);
                setTimeout(() => {
                    checkImg.remove();
                }, 1000);
            }
        })

    }
}

function reset() {
    if (!document.querySelector(".reset-btn")) {
        let resetBtn = document.createElement("button")
        resetBtn.classList.add("reset-btn");
        habitGrid.appendChild(resetBtn);
        let resetImg = document.createElement("img");
        resetBtn.appendChild(resetImg);
        resetImg.classList.add("reset-img");
        resetImg.src = "assets/undoFinal.png";
        resetBtn.addEventListener("click", () => {
            localStorage.removeItem(STORAGE_KEY);
            dayGrid.innerHTML = "";
            habitGrid.style.display = "none";
            inputCard.style.display = "block";
        })
    }
}


function gridExists() {
    let trackerObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (trackerObject && trackerObject.habitName !== "") {
        habitHeader.textContent = `${trackerObject.habitName}(30-day track)`
        renderDayCells();
        reset();
        habitGrid.style.display = "block";
        inputCard.style.display = "none";
    }
}

window.onload = gridExists;
