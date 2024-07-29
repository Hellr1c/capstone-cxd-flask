const video = document.getElementById("webcam");
function takephoto() {
    const capture = document.getElementById("capture");
    capture.style.display = capture.style.display == "block" ? "none": "block";
    MODE = "takephoto";
    canvas.style.display = canvas.style.display == "block" ? "none": "block";;
    video.style.display = video.style.display == "block" ? "none": "block";
    setup_camera();
}

async function setup_camera() {
    console.log("Setup...");
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
}

function capture() {
    canvas.style.display = "block";
    video.style.display = "none";
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('image_file', blob, 'image.jpg');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/detect', true);
        info.style.display = "block";
        xhr.upload.addEventListener("progress", (e) => {
            if (e.lengthComputable) {
                const progress = (e.loaded / e.total) * 100;
                inf.innerHTML = progress != 100 ? "Uploading image... " + progress + "%" : "Waiting for server to respond...";
            }
        });
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    info.style.display = "none";
                    console.log('Image sent successfully');
                    const boxes = JSON.parse(xhr.responseText);
                    update_canvas(blob, boxes);
                    update_sidebar(boxes);
                    // Handle response from server if needed
                } else {
                    console.error('Failed to send image:', xhr.status);
                }
            }
        };

        xhr.send(formData);
    }, 'image/jpeg')
}