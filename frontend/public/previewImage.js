function previewImage(event) {
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.innerHTML = '';
  const url = URL.createObjectURL(event.target.files[0])
  imagePreview.innerHTML += '<img src="' + url + '">';
}