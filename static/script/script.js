/**
* "Upload" button onClick handler: uploads selected 
* image file to backend, receives an array of
* detected objects and draws them on top of image

const input = document.getElementById("uploadInput");
input.addEventListener("change",async(event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("image_file",file,"image_file");
    const response = await fetch("/detect",{
        method:"post",
        body:data
    });
    const boxes = await response.json();
    draw_image_and_boxes(file,boxes);
})
    */

const input = document.getElementById("uploadInput");
const info = document.getElementById("info");
const inf = document.getElementById("inf");

info.style.display = "none";

input.addEventListener("change", (event) => {
 const file = event.target.files[0];
 const data = new FormData();
 data.append("image_file", file, "image_file");
 info.style.display = "block";

 const xhr = new XMLHttpRequest();
 xhr.open("POST", "/detect");

 xhr.upload.addEventListener("progress", (e) => {
     if (e.lengthComputable) {
         const progress = (e.loaded / e.total) * 100;
         inf.innerHTML = progress != 100 ? "Uploading image... " + progress + "%" : "Waiting for server to respond...";
     }
 });

 xhr.onreadystatechange = () => {
     if (xhr.readyState === 4) {
         if (xhr.status === 200) {
             info.style.display = "none";
             const boxes = JSON.parse(xhr.responseText);
             update_canvas(file, boxes);
             update_sidebar(boxes);
             //draw_image_and_boxes(file, boxes);
         } else {
             inf.innerHTML = "Error: " + xhr.statusText;
         }
     }
 }

 xhr.send(data);

});

function update_sidebar (boxes) {
    const cards = document.getElementById("cards");
    cards.innerHTML = ""; // clears laman.

    let labels = {};
    boxes.forEach(([ x1, y1, x2, y2, label ]) => {
        if (label in labels) {
            labels[ label ] += 1;
        } else {
            labels[ label ] = 1;
        }
    });

    for (const [ key, value ] of Object.entries(labels)) {
        const card = document.createElement("div");
        card.classList.add("card");
        
        const title = document.createElement("div");
        const num = document.createElement("div");
        const btn = document.createElement("div");
        const icon = document.createElement("img");
        icon.src = dropdown;
        btn.appendChild(icon);
        title.innerHTML = key;
        num.innerHTML = value;
        card.appendChild(title);
        card.appendChild(num);
        card.appendChild(btn);
        cards.appendChild(card);
    }
}