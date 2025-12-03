const uploadInput = document.getElementById("upload");
const previewImage = document.getElementById("preview");
const warning = document.getElementById("warning");
const downloadBtn = document.getElementById("download");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

let frame = new Image();
frame.src = "RCYBOGURA.png";
frame.crossOrigin = "anonymous";

let userImg = new Image();

uploadInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    userImg = new Image();
    userImg.onload = function () {
      if (userImg.width !== userImg.height) {
        warning.style.display = "block";
        previewImage.src = "";
        downloadBtn.style.display = "none";
        return;
      }
      warning.style.display = "none";

      canvas.width = userImg.width;
      canvas.height = userImg.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userImg, 0, 0, canvas.width, canvas.height);
      frame.onload = () => {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        previewImage.src = dataURL;
        downloadBtn.style.display = "inline-block";
      };

      if (frame.complete) {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL("image/png");
        previewImage.src = dataURL;
        downloadBtn.style.display = "inline-block";
      }
    };
    userImg.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.onclick = () => {
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "profile_with_frame.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
