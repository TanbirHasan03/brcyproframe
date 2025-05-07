const uploadInput = document.getElementById("upload");
const previewImage = document.getElementById("preview");
const warning = document.getElementById("warning");
const downloadBtn = document.getElementById("download");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const frameImage = new Image();
frameImage.src = "RCYBOGURA.png";
frameImage.crossOrigin = "anonymous";

let userImage = new Image();

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    userImage = new Image();
    userImage.onload = function () {
      // Check if image is square
      if (userImage.width !== userImage.height) {
        warning.style.display = "block";
        previewImage.src = "";
        downloadBtn.style.display = "none";
        return;
      }

      warning.style.display = "none";
      canvas.width = userImage.width;
      canvas.height = userImage.height;

      // Wait for frame to fully load before drawing
      if (!frameImage.complete) {
        frameImage.onload = () => drawFinalImage();
      } else {
        drawFinalImage();
      }
    };
    userImage.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

function drawFinalImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(userImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

  // Show preview and download button
  previewImage.src = canvas.toDataURL("image/png");
  downloadBtn.style.display = "inline-block";
}

downloadBtn.onclick = function () {
  canvas.toBlob(function (blob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "profile_with_frame.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, "image/png");
};
