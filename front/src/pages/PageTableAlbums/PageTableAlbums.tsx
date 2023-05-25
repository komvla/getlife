import React, { useState, useEffect } from 'react';
// components
import BasicLayout from '../../templates/BasicLayout/BasicLayout';
import TitlePage from '../../atoms/typography/TitlePage/TitlePage';
import SelectElementsToShow from '../../organisms/SelectElementsToShow/SelectElementsToShow';
// types
import { Album } from '../../models/album.model';
import { User } from '../../models/user.model';
import { TableCellProps } from '../../models/table.model';
import { Photo } from '../../models/photo.model';
// store
import { useSelector, useDispatch } from 'react-redux';
// functions
import {
  fetchData,
  filterDataForSave,
  findAuthor,
  generateTable,
} from '../sharedFunctions';

const PageTableAlbums = () => {
  const albums = useSelector((state: { albums: Album[] }) => state.albums);
  const users = useSelector((state: { users: User[] }) => state.users);
  const numberOfPhotosInAlbums = useSelector(
    (state: { numberOfPhotosInAlbums: Record<number, number> }) =>
      state.numberOfPhotosInAlbums
  );

  const [error, setError] = useState<string>('');

  const [
    allDataOfTableIsSuccessfullyLoaded,
    setAllDataOfTableIsSuccessfullyLoaded,
  ] = useState<boolean>(true);

  const DEFAULT_NUMBER_OF_ELEMENTS_TO_SHOW = 10;
  const [numberOfElementsToShow, setNumberOfElementsToShow] = useState<number>(
    DEFAULT_NUMBER_OF_ELEMENTS_TO_SHOW
  );

  const tableCellsStructureHeader: TableCellProps[] = [
    {
      name: 'id',
      content: '#ID',
      align: 'left',
      isNumberValue: false,
      type: 'header',
    },
    {
      name: 'author',
      content: 'Author',
      align: 'left',
      isNumberValue: false,
      type: 'header',
    },
    {
      name: 'numberOfPhotos',
      content: 'Photos (qty.)',
      align: 'right',
      isNumberValue: false,
      type: 'header',
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    !albums && loadAlbums();
    !users && loadUsers();
    !numberOfPhotosInAlbums && users && calculateNumberOfPhotosAndAuthors();
  }, [users, albums, numberOfPhotosInAlbums]);

  useEffect(() => {
    setAllDataOfTableIsSuccessfullyLoaded(
      users && albums && numberOfPhotosInAlbums && !error
    );
  }, [users, albums, numberOfPhotosInAlbums, error]);

  const loadAlbums = async () => {
    const response = await fetchData({ type: 'albums' });
    if (!response.ok) {
      setError(response.errorInfo);
    } else {
      const albumsArray = response.data as Album[];
      if (albumsArray) {
        dispatch({
          type: 'SET_ALBUMS',
          payload: filterDataForSave(albumsArray, 'albums'),
        });
      }
    }
  };

  const loadUsers = async () => {
    const response = await fetchData({ type: 'users' });
    if (response.ok) {
      const usersArray = response.data;
      if (usersArray) {
        dispatch({
          type: 'SET_USERS',
          payload: filterDataForSave(usersArray, 'users'),
        });
      }
    } else {
      console.log(response.errorInfo);
    }
  };

  const calculateNumberOfPhotosAndAuthors = async () => {
    const response = await fetchData({ type: 'photos' });
    if (!response.ok) {
      console.log(response.errorInfo);
    } else {
      const photosArray = response.data as Photo[];

      const result: Record<number, number> = photosArray.reduce(
        (obj, photo) => {
          const { albumId } = photo;
          obj[albumId] = (obj[albumId] || 0) + 1;
          return obj;
        },
        {} as Record<number, number>
      );

      if (result) {
        dispatch({
          type: 'SET_NUMBER_OF_PHOTOS_IN_ALBUMS',
          payload: result,
        });
        addDataOfPhotosAndAuthorsToTable(result);
      }
    }
  };

  const addDataOfPhotosAndAuthorsToTable = (result: Record<number, number>) => {
    let newTableData = albums?.map((el) => {
      return {
        ...el,
        numberOfPhotos: result[el.id] ? result[el.id] : 0,
        author: findAuthor(users, el.userId),
      };
    });

    newTableData &&
      dispatch({
        type: 'SET_ALBUMS',
        payload: filterDataForSave(newTableData, 'albums'),
      });
  };

  const tableData = albums?.map((album) => {
    return [
      {
        name: 'id',
        content: album.id,
        align: 'left',
        isNumberValue: true,
        type: 'body',
      },
      {
        name: 'author',
        content: album.author,
        align: 'left',
        isNumberValue: false,
        type: 'body',
      },
      {
        name: 'numberOfPhotos',
        content: album.numberOfPhotos,
        align: 'right',
        isNumberValue: true,
        type: 'body',
      },
    ] as TableCellProps[];
  });

  return (
    <>
      <BasicLayout
        isLoading={!allDataOfTableIsSuccessfullyLoaded && !error}
        error={error}
      >
        <>
          <TitlePage text={'Albums'} />
          <SelectElementsToShow
            value={numberOfElementsToShow}
            maxValue={albums?.length}
            onChange={(newValue) => setNumberOfElementsToShow(newValue)}
          />
          {allDataOfTableIsSuccessfullyLoaded &&
            tableData &&
            generateTable(
              tableCellsStructureHeader,
              tableData,
              numberOfElementsToShow
            )}
        </>
      </BasicLayout>
    </>
  );
};

export default PageTableAlbums;
