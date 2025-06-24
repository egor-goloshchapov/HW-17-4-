const API_KEY = '51034626-132d0e1016f85c4382ba4bc34';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

let currentPage = Number(localStorage.getItem('pixabayPage')) || 1;
const gallery = document.getElementById('imageGallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');

async function fetchImages(page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=flowers&image_type=photo&pretty=true&per_page=${PER_PAGE}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length === 0) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.innerText = "Більше зображень немає";
      return;
    }

    renderImages(data.hits);
    localStorage.setItem('pixabayPage', currentPage);
  } catch (error) {
    console.error('Помилка при завантаженні:', error);
  }
}

function renderImages(images) {
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;
    gallery.appendChild(img);
  });
}

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  fetchImages(currentPage);
});

fetchImages(currentPage);
