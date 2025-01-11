document.addEventListener('DOMContentLoaded', () => {
  const output = document.querySelector('#output');
  const button = document.querySelector('#get-posts-btn');
  const form = document.querySelector('#add-post-form');

  async function showPosts() {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      output.innerHTML = '';

      posts.forEach((post) => {
        const postEl = document.createElement('div');
        const titleEl = document.createElement('h3');
        const contentEl = document.createElement('p');

        titleEl.textContent = post.title;
        contentEl.textContent = post.content;

        postEl.appendChild(titleEl);
        postEl.appendChild(contentEl);
        output.appendChild(postEl);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function addPost(e) {
    e.preventDefault();
    const title = form.querySelector('#title').value;
    const content = form.querySelector('#content').value;

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      showPosts();
    } catch (error) {
      console.error(error);
    }
  }
  button.addEventListener('click', showPosts);
  form.addEventListener('submit', addPost);
});