document.getElementById("upload").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function (event) {
    img.onload = function () {
      // Check if image is 1:1 ratio
      if (img.width !== img.height) {
        alert("Please upload a square (1:1 ratio) image.");
        return;
      }

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Draw user's image first
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Load frame image
      const frame = new Image();
      frame.onload = function () {
        // Draw frame image on top
        ctx.drawImage(frame, 0, 0, img.width, img.height);

        // Enable download button
        const downloadBtn = document.getElementById("download");
        downloadBtn.disabled = false;

        // Set download functionality
        downloadBtn.onclick = function () {
          const link = document.createElement("a");
          link.download = "profile_with_frame.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        };
      };

      frame.onerror = function () {
        alert("❌ Failed to load frame image. Make sure 'RCYBOGURA.png' is in the same directory.");
        console.error("Frame image failed to load.");
      };

      frame.src = "RCYBOGURA.png"; // your frame image name
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});
