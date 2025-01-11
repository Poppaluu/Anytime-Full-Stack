const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');


async function showPosts() {
try{
    const response = await fetch('http://localhost:3000/api/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const posts = await response.json();
    output.innerHTML = '';
  
    posts.forEach((post) => {
      const postEl = document.createElement('div');
      postEl.textContent = post.title;
      output.appendChild(postEl);
    });
} catch (error) {
  console.error(error);
}
}

button.addEventListener('click', showPosts);

/*
button.addEventListener('click', async () => {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  output.innerHTML = posts.map(post => `<li>${post.title}</li>`).join('');
});
*/