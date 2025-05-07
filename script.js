document.getElementById("upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = function () {
    if (img.width !== img.height) {
      document.getElementById("warning").innerText = "Please upload a square (1:1) image.";
      return;
    } else {
      document.getElementById("warning").innerText = "";
    }

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    const frame = new Image();
    frame.onload = function () {
      ctx.drawImage(frame, 0, 0, img.width, img.height);
    };
    frame.src = "RCYBOGURA.png";
  };

  img.src = URL.createObjectURL(file);
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const canvas = document.getElementById("canvas");
  if (canvas.toDataURL() === "") {
    alert("Please upload a valid square image first.");
    return;
  }
  const link = document.createElement("a");
  link.download = "framed_profile.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});