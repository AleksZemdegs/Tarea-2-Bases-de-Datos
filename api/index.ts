import {serve} from 'bun';

const PORT = 3049;

interface Post {
  id: string;
  title: string;
  content: string;
}

let blogPosts: Post[] = [];

function handleGetAllPosts() {
  return new Response(JSON.stringify(blogPosts), {
    headers: { 'Content-Type': 'application/json'},
    });
}

function handleGetPostById(id: string) {
  const post = blogPosts.find((post) => post.id == id);

  if (!post) {
    return new Response('Post Not Found', { status: 404});
  }

  return new Response(JSON.stringify(post), {
    headers: { 'Content-Type': 'application/json'}
  });
}

function handleCreatePost(title: string, content: string) {
  const newPost: Post = {
    id: `${blogPosts.length}`,
    title,
    content,
  };

  blogPosts.push(newPost);

  return new Response(JSON.stringify(newPost), {
    headers: { 'Content-Type': 'application/json'},
    status: 201,
  });
}

function handleDeletePost(id: string) {
  const postIndex = blogPosts.findIndex(post => post.id == id);

  if (postIndex ==  -1) {
    return new Response("Post Not Found", { status: 404});
  }

  blogPosts.splice(postIndex, 1);

  return new Response("Post Updated", { status: 200 });
}

function handleUpdatePost(id: string, title: string, content: string) {
  const postIndex = blogPosts.findIndex(post => post.id == id);

  if (postIndex ==  -1) {
    return new Response("Post Not Found", { status: 404});
  }

  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title,
    content,
  }

  return new Response("Post Updated", { status: 200 });
}

// Serve HTTP server
serve({
  port: PORT,
  async fetch(request) {
    const { method } = request;
    const {pathname } = new URL(request.url);
    const pathRegexForID = /^\/api\/posts\/(\d+)$/;

    // GET - Route to get post by id.
    if (method == 'GET') {
      const match = pathname.match(pathRegexForID);
      const id = match && match[1];

      if (id) {
        return handleGetPostById(id);
      }
    }

    // GET - Route to get all posts.
    if (method == 'GET' && pathname == '/api/posts') {
      return handleGetAllPosts();
    }

    // POST - Route to create a post.
    if (method == 'POST' && pathname == '/api/posts') {
      const newPost = await request.json();
      return handleCreatePost(newPost.title, newPost.content);
    }

    // DELETE - Route to delete a post by id.
    if (method == 'DELETE' && pathname == '/api/posts') {
      const {id} = await request.json();
      return handleDeletePost(id);
    }

    return new Response("Not Found", { status: 404});
  },
});

console.log(`Listening on http://localhost:${PORT} ...`);