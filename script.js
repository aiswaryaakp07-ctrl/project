const URL = "https://teachablemachine.withgoogle.com/models/_CMBYSsne/";

let model, webcam, isRunning = false;

async function init() {

    if (isRunning) {
        setStatus("AI system is already running ✔");
        return;
    }

    try {

        setStatus("Loading AI model...");

        model = await tmImage.load(
            URL + "model.json",
            URL + "metadata.json"
        );

        setStatus("Requesting camera access...");

        webcam = new tmImage.Webcam(320, 320, true);

        await webcam.setup();
        await webcam.play();

        document.getElementById("webcam-container").innerHTML = "";

        document
            .getElementById("webcam-container")
            .appendChild(webcam.canvas);

        isRunning = true;

        setStatus("AI Classroom Attention System is active ✔");

        window.requestAnimationFrame(loop);

    } catch (error) {

        console.error(error);

        setStatus(
            "Unable to start the system. Please allow camera access."
        );
    }
}

async function loop() {

    if (!isRunning) return;

    webcam.update();

    await predict();

    window.requestAnimationFrame(loop);
}

async function predict() {

    const prediction = await model.predict(webcam.canvas);

    let bestPrediction = prediction[0];

    for (let i = 1; i < prediction.length; i++) {

        if (
            prediction[i].probability >
            bestPrediction.probability
        ) {
            bestPrediction = prediction[i];
        }
    }

    const className =
        bestPrediction.className.toLowerCase();

    const probability =
        (bestPrediction.probability * 100).toFixed(1);

    let low = 0;
    let medium = 0;
    let high = 0;

    let statusText = "";

    /* No Distraction */
    if (
        className.includes("no") ||
        className.includes("focused")
    ) {

        low = probability;

        statusText =
            "No Distraction 🟢";

        document.getElementById(
            "aiInsight"
        ).innerText =
            "Students appear attentive and engaged. The learning environment seems productive.";

    }

    /* Medium Distraction */
    else if (
        className.includes("medium")
    ) {

        medium = probability;

        statusText =
            "Medium Distraction 🟠";

        document.getElementById(
            "aiInsight"
        ).innerText =
            "Minor distraction patterns detected. Interactive teaching strategies may improve focus.";

    }

    /* High Distraction */
    else {

        high = probability;

        statusText =
            "High Distraction 🔴";

        document.getElementById(
            "aiInsight"
        ).innerText =
            "Significant distraction indicators observed. Additional classroom engagement methods may be beneficial.";
    }

    /* Update percentages */
    document.getElementById(
        "lowVal"
    ).innerText = low + "%";

    document.getElementById(
        "mediumVal"
    ).innerText = medium + "%";

    document.getElementById(
        "highVal"
    ).innerText = high + "%";

    setStatus(
        `Current Status: ${statusText} (${probability}%)`
    );
}

function setStatus(message) {

    document.getElementById(
        "status"
    ).innerText = message;
}

function testModelURL() {

    fetch(URL + "model.json")

        .then(response => {

            if (response.ok) {

                setStatus(
                    "Model connected successfully ✔"
                );

            } else {

                setStatus(
                    "Model connection failed ✖"
                );
            }
        })

        .catch(() => {

            setStatus(
                "Unable to reach the model ✖"
            );
        });
}

function resetDemo() {

    if (webcam) {

        webcam.stop();
    }

    isRunning = false;

    document.getElementById(
        "webcam-container"
    ).innerHTML = "";

    document.getElementById(
        "lowVal"
    ).innerText = "0%";

    document.getElementById(
        "mediumVal"
    ).innerText = "0%";

    document.getElementById(
        "highVal"
    ).innerText = "0%";

    document.getElementById(
        "aiInsight"
    ).innerText =
        "Start the camera to receive real-time attention insights.";

    setStatus(
        "System reset completed."
    );
}
