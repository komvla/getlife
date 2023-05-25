import { createStore } from 'redux';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Album } from '../models/album.model';

interface AppState {
  users: User[] | null;
  posts: Post[] | null;
  albums: Album[] | null;
  numberOfPhotosInAlbums: Record<number, number> | null;
  numberOfCommentsInPosts: Record<number, number> | null;
  numberOfPostsByUser: Record<number, number> | null;
}

const initialState: AppState = {
  users: null,
  posts: null,
  albums: null,
  numberOfPhotosInAlbums: null,
  numberOfCommentsInPosts: null,
  numberOfPostsByUser: null,
};

function rootReducer(state = initialState, action: any): AppState {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    case 'SET_ALBUMS':
      return {
        ...state,
        albums: action.payload,
      };

    case 'SET_NUMBER_OF_PHOTOS_IN_ALBUMS':
      return {
        ...state,
        numberOfPhotosInAlbums: action.payload,
      };
    case 'SET_NUMBER_OF_COMMENTS_IN_POSTS':
      return {
        ...state,
        numberOfCommentsInPosts: action.payload,
      };
    case 'SET_NUMBER_OF_POSTS_BY_USER':
      return {
        ...state,
        numberOfPostsByUser: action.payload,
      };
    default:
      return state;
  }
}

export const store = createStore(rootReducer);
