import { getUsers, getPosts, getAlbums, getPhotos, getComments } from '../api';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';
import { Comment } from '../models/comment.model';
import { TableComponentProps } from '../models/table.model';
import TableComponent from '../organisms/TableComponent/TableComponent';

interface FetchTableDataProps {
  type: 'users' | 'posts' | 'albums' | 'photos' | 'comments';
}

interface FetchTableDataResponse<T> {
  ok: boolean;
  errorInfo: any;
  data?: T | null;
}

type DataArray = User[] | Post[] | Album[] | Photo[] | Comment[];

const getFetchURL = (type: FetchTableDataProps['type']): string => {
  const fetchURLs: { [key in FetchTableDataProps['type']]: string } = {
    users: getUsers(),
    posts: getPosts(),
    albums: getAlbums(),
    photos: getPhotos(),
    comments: getComments(),
  };
  return fetchURLs[type];
};

export const fetchData = async ({
  type,
}: FetchTableDataProps): Promise<
  | FetchTableDataResponse<undefined>
  | FetchTableDataResponse<User[] | Post[] | Album[] | Photo[]>
> => {
  try {
    const response = await fetch(getFetchURL(type));

    if (!response.ok) {
      return { ok: false, errorInfo: `Error fetching ${type}`, data: null };
    }

    let data;
    if (type === 'users') {
      data = (await response.json()) as User[];
    } else if (type === 'posts') {
      data = (await response.json()) as Post[];
    } else if (type === 'albums') {
      data = (await response.json()) as Album[];
    } else if (type === 'photos') {
      data = (await response.json()) as Photo[];
    } else if (type === 'comments') {
      data = (await response.json()) as Comment[];
    }
    return { ok: true, errorInfo: null, data };
  } catch (error) {
    return { ok: false, errorInfo: error, data: null };
  }
};

// filtering of api responses to not store the necessary data in redux store

export const filterDataForSave = (
  data: DataArray,
  type: FetchTableDataProps['type']
) => {
  if (type === 'users') {
    return (data as User[]).map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        numberOfPosts: user.numberOfPosts,
      };
    });
  }
  if (type === 'posts') {
    return (data as Post[]).map((post) => {
      return {
        id: post.id,
        userId: post.userId,
        author: post.author,
        numberOfComments: post.numberOfComments,
      };
    });
  }
  if (type === 'albums') {
    return (data as Album[]).map((album) => {
      return {
        id: album.id,
        numberOfPhotos: album.numberOfPhotos,
        userId: album.userId,
        author: album.author,
      };
    });
  }
  if (type === 'photos') {
    return (data as Photo[]).map((photo) => {
      return { id: photo.id, albumId: photo.albumId };
    });
  }
  if (type === 'comments') {
    return (data as Comment[]).map((comment) => {
      return { id: comment.id, postId: comment.postId };
    });
  }
};

export const findAuthor = (users: User[], authorId: number) => {
  if (users) {
    const author: any = users.filter((user) => user.id === authorId)[0]?.name;
    return author || null;
  }
};

export const generateTable = (
  tableCellsStructureHeader: TableComponentProps['header'],
  tableData: TableComponentProps['body'],
  numberOfElementsToShow?: TableComponentProps['numberOfElementsToShow']
) => {
  return (
    tableCellsStructureHeader &&
    tableData && (
      <TableComponent
        numberOfElementsToShow={numberOfElementsToShow}
        header={tableCellsStructureHeader}
        body={tableData.slice(0, numberOfElementsToShow)}
      />
    )
  );
};
