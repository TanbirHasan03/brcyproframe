const uploadInput = document.getElementById("upload");
const previewImage = document.getElementById("preview");
const warning = document.getElementById("warning");
const downloadBtn = document.getElementById("download");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let frameImage = new Image();
frameImage.src = "RCYBOGURA.png";

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // Check aspect ratio
      if (img.width !== img.height) {
        warning.style.display = "block";
        previewImage.src = "";
        downloadBtn.style.display = "none";
        return;
      }

      warning.style.display = "none";
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      frameImage.onload = () => {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        previewImage.src = canvas.toDataURL("image/png");
        downloadBtn.style.display = "inline-block";
      };

      // In case frame is already loaded
      if (frameImage.complete) {
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        previewImage.src = canvas.toDataURL("image/png");
        downloadBtn.style.display = "inline-block";
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

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
