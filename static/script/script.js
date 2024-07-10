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
             draw_image_and_boxes(file, boxes);
         } else {
             inf.innerHTML = "Error: " + xhr.statusText;
         }
     }
 }

 xhr.send(data);

});



/**
* Function draws the image from provided file
* and bounding boxes of detected objects on
* top of the image
* @param file Uploaded file object
* @param boxes Array of bounding boxes in format
  [[x1,y1,x2,y2,object_type,probability],...]
*/
function draw_image_and_boxes(file,boxes) {
   const img = new Image()
   img.src = URL.createObjectURL(file);
   img.onload = () => {
       const canvas = document.querySelector("canvas");
       canvas.width = img.width;
       canvas.height = img.height;
       const ctx = canvas.getContext("2d");
       ctx.drawImage(img,0,0);
       ctx.strokeStyle = "#00FF00";
       ctx.lineWidth = 3;
       ctx.font = "18px serif";
       boxes.forEach(([x1,y1,x2,y2,label]) => {
           ctx.strokeRect(x1,y1,x2-x1,y2-y1);
           ctx.fillStyle = "#00ff00";
           const width = ctx.measureText(label).width;
           ctx.fillRect(x1,y1,width+10,25);
           ctx.fillStyle = "#000000";
           ctx.fillText(label,x1,y1+18);
       });
   }
}