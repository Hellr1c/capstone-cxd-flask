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
             //enableZoom()
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
        if (label in coco[ 0 ]) {
            console.log(label + " found in boxes")
            if (label in labels) {
                labels[ label ] += 1;
            } else {
                labels[ label ] = 1;
            }
        }
    });

    for (const [ key, value ] of Object.entries(labels)) {
        if (key in coco[ 0 ]) {
            const card = document.createElement("div");
            card.classList.add("card");

            const head = document.createElement("div");
            head.classList.add("card-head");

            const body = document.createElement("div");
            body.classList.add("card-body");
            const title = document.createElement("div");
            const num = document.createElement("div");
            const btn = document.createElement("div");
            const button = document.createElement("button");
            const icon = document.createElement("img");
            icon.src = dropdown;
            button.addEventListener("click", () => {
                console.log(Object.keys(labels).indexOf(key));
                onCardOpen(Object.keys(labels).indexOf(key));
            });
            button.appendChild(icon);
            btn.appendChild(button);
            title.innerHTML = key;
            num.innerHTML = value;
            head.appendChild(title);
            head.appendChild(num);
            head.appendChild(btn);

            /** body */
            let nutrients = "";
        
            if (key in coco[ 0 ]) {
                console.log(key + " found in script js");
                const row = getNutritionRowInfo(coco[ 0 ][ key ]);
                console.log(row);
                const entries = Object.entries(row).filter(([ key ]) => key !== "" || key !== "name"); // Filter out empty key

                for (const [ key, value ] of entries) {
                    if (key === "" || key === "name") {
                        continue;
                    }
                    console.log(`Key: ${ key }, Value: ${ value }`);
                    nutrients += "<p>" + key + ": " + value + "</p>";
                }
            
            } else {
                nutrients += "<p>No nutrient information found.</p>";
            }

            body.innerHTML = nutrients;

            card.appendChild(head);
            card.appendChild(body);
            cards.appendChild(card);
        }
    }
}

function onCardOpen(n) {
    const body = document.getElementsByClassName("card-body")[n];
    console.log(n);
    body.style.display = body.style.display == "block" ? "none" : "block";
}

function getDatasetAsJson () {
    fetch(csv)
        .then((res) => res.text())
        .then((text) => {
            console.log(text);
      // do something with "text"
      const lines = text.split(/\r?\n/);

    // Get headers from the first line
            const headers = lines[ 0 ].split(',');
            console.log(headers);

    // Parse remaining lines into JSON objects
    const jsonData = lines.slice(1).map(line => {
        const values = line.split(/,(?=(?:[^"]*"[^"]*")*(?![^"]*"))/);
      const obj = {};
        headers.forEach((header, index) => {
            obj[ header.trim() ] = values[ index ]?.trim() || "";
        });
      return obj;
    });

    return jsonData;
  })
  .then(data => {
      nutrition = data;
  })
  .catch((e) => console.error(e));
}

function findFoodByTerm (term) {
    const results = [];
    for (const item of nutrition) {
        const name = item.name?.toLowerCase();
        if (name && name.includes(term.toLowerCase())) {
            results.push(item);
        }
    }
    return results;
}

function getNutritionRowInfo (id) {
    return nutrition[ id ];
}
let nutrition = "";
getDatasetAsJson();
console.log("TESTING>>> " + nutrition);


