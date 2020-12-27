const API_KEY = `18984826-9a089bf93f102eeea865f0aeb`;
const URL = `https://pixabay.com/api/?&image_type=photo&orientation=horizontal`;

async function FetchImg(pictureInfo, currentPage) {
  try {
    const res = await fetch(
      `${URL}&&key=${API_KEY}&q=${pictureInfo}&page=${currentPage}`,
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export default FetchImg;
