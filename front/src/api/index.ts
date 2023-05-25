// ========== GET METHODS ==========

// Get all users
export const getUsers = () => 'https://jsonplaceholder.typicode.com/users';

// Get posts by user id
export const getPostsByUserId = (id: number) =>
  `https://jsonplaceholder.typicode.com/posts?userId=${id}`;

// Get all posts
export const getPosts = () => 'https://jsonplaceholder.typicode.com/posts';

// Get comments by post id
export const getCommentsByPostId = (id: number) =>
  `https://jsonplaceholder.typicode.com/comments?postId=${id}`;

// Get all albums
export const getAlbums = () => 'https://jsonplaceholder.typicode.com/albums';

// Get photos by album id
export const getPhotosByAlbumId = (id: number) =>
  `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;

// Get all photos
export const getPhotos = () => 'https://jsonplaceholder.typicode.com/photos';

// Get all comments
export const getComments = () =>
  'https://jsonplaceholder.typicode.com/comments';
