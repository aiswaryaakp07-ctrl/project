const URL = "https://teachablemachine.withgoogle.com/models/_CMBYSsne/";

let model, webcam, labelContainer;

async function init() {
  setStatus("Loading model...");

  model = await tmImage.load(URL + "model.json", URL + "metadata.json");

  webcam = new tmImage.Webcam(320, 320, true);
  await webcam.setup();
  await webcam.play();

  document.getElementById("webcam-container").innerHTML = "";
  document.getElementById("webcam-container").appendChild(webcam.canvas);

  labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "";

  for (let i = 0; i < model.getTotalClasses(); i++) {
    const div = document.createElement("div");
    div.className = "label-item";
    labelContainer.appendChild(div);
  }

  window.requestAnimationFrame(loop);
  setStatus("AI Running ✔");
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);

  for (let i = 0; i < prediction.length; i++) {
    const p = prediction[i];
    const name = p.className.toLowerCase();
    const percent = (p.probability * 100).toFixed(1);

    let cls = "label-item";
    let labelText = "";

    // ✅ FIXED LOGIC (THIS IS THE KEY)
    if (name.includes("no")) {
      cls += " low";
      labelText = "No Distraction 🟢";
    }
    else if (name.includes("medium")) {
      cls += " medium";
      labelText = "Medium Distraction 🟠";
    }
    else {
      cls += " high";
      labelText = "High Distraction 🔴";
    }

    labelContainer.childNodes[i].className = cls;
    labelContainer.childNodes[i].innerHTML =
      `${labelText} <span>${percent}%</span>`;
  }
}

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}

function testModelURL() {
  setStatus("Model connected ✔");
}

function resetDemo() {
  if (webcam) webcam.stop();
  document.getElementById("webcam-container").innerHTML = "";
  document.getElementById("label-container").innerHTML = "";
  setStatus("Reset done");
}