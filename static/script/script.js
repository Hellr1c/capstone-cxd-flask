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
             //draw_image_and_boxes(file, boxes);
         } else {
             inf.innerHTML = "Error: " + xhr.statusText;
         }
     }
 }

 xhr.send(data);

});