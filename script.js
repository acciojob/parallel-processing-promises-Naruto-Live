const output = document.getElementById("output");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.src = url;

        img.onload = () => resolve(img);

        img.onerror = () => reject(`Failed to load ${url}`);

    });

}

btn.addEventListener("click", () => {

    output.innerHTML = "";
    error.innerHTML = "";

    loading.innerHTML = "Loading...";

    Promise.all(
        images.map(image => downloadImage(image.url))
    )

    .then((imgs) => {

        loading.innerHTML = "";

        imgs.forEach(img => {
            output.appendChild(img);
        });

    })

    .catch((err) => {

        loading.innerHTML = "";

        error.textContent = err;

    });

});