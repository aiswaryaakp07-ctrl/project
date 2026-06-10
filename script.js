const URL = "https://teachablemachine.withgoogle.com/models/_CMBYSsne/";

let model, webcam;

async function init() {
  setStatus("Loading model...");

  model = await tmImage.load(URL + "model.json", URL + "metadata.json");

  webcam = new tmImage.Webcam(320, 320, true);
  await webcam.setup();
  await webcam.play();

  document.getElementById("webcam-container").innerHTML = "";
  document.getElementById("webcam-container").appendChild(webcam.canvas);

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

  // 🔥 FIND BEST MATCH ONLY
  let best = prediction[0];

  for (let i = 1; i < prediction.length; i++) {
    if (prediction[i].probability > best.probability) {
      best = prediction[i];
    }
  }

  const name = best.className.toLowerCase();
  const percent = (best.probability * 100).toFixed(1);

  let statusText = "";
  let low = 0, medium = 0, high = 0;

  // 🔥 FIXED CLEAN LOGIC
  if (name.includes("no")) {
    low = percent;
    statusText = "No Distraction 🟢";
  }
  else if (name.includes("medium")) {
    medium = percent;
    statusText = "Medium Distraction 🟠";
  }
  else {
    high = percent;
    statusText = "High Distraction 🔴";
  }

  // update UI boxes (ONLY ONE ACTIVE AT A TIME)
  document.getElementById("lowVal").innerText = low + "%";
  document.getElementById("mediumVal").innerText = medium + "%";
  document.getElementById("highVal").innerText = high + "%";

  setStatus(`Current Status: ${statusText} (${percent}%)`);
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
  setStatus("Reset done");

  document.getElementById("lowVal").innerText = "0%";
  document.getElementById("mediumVal").innerText = "0%";
  document.getElementById("highVal").innerText = "0%";
}