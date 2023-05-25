import React, { useState, useEffect } from 'react';
// components
import BasicLayout from '../../templates/BasicLayout/BasicLayout';
import TitlePage from '../../atoms/typography/TitlePage/TitlePage';
import SelectElementsToShow from '../../organisms/SelectElementsToShow/SelectElementsToShow';
// types
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { TableCellProps } from '../../models/table.model';
import { Comment } from '../../models/comment.model';
// store
import { useSelector, useDispatch } from 'react-redux';
// functions
import {
  fetchData,
  filterDataForSave,
  findAuthor,
  generateTable,
} from '../sharedFunctions';

const PageTablePosts = () => {
  const posts = useSelector((state: { posts: Post[] }) => state.posts);
  const users = useSelector((state: { users: User[] }) => state.users);
  const numberOfCommentsInPosts = useSelector(
    (state: { numberOfCommentsInPosts: Record<number, number> }) =>
      state.numberOfCommentsInPosts
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
      name: 'numberOfComments',
      content: 'Comments (qty.)',
      align: 'right',
      isNumberValue: false,
      type: 'header',
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    !posts && loadPosts();
    !users && loadUsers();
    !numberOfCommentsInPosts && users && calculateNumberOfCommentsAndAuthors();
  }, [users, posts, numberOfCommentsInPosts]);

  useEffect(() => {
    setAllDataOfTableIsSuccessfullyLoaded(
      users && posts && numberOfCommentsInPosts && !error
    );
  }, [users, posts, numberOfCommentsInPosts, error]);

  const loadPosts = async () => {
    const response = await fetchData({ type: 'posts' });
    if (!response.ok) {
      setError(response.errorInfo);
    } else {
      const postsArray = response.data;
      postsArray &&
        dispatch({
          type: 'SET_POSTS',
          payload: filterDataForSave(postsArray, 'posts'),
        });
    }
  };

  const loadUsers = async () => {
    const response = await fetchData({ type: 'users' });
    if (response.ok) {
      const usersArray = response.data;
      usersArray &&
        dispatch({
          type: 'SET_USERS',
          payload: filterDataForSave(usersArray, 'users'),
        });
    } else {
      console.log(response.errorInfo);
    }
  };

  const calculateNumberOfCommentsAndAuthors = async () => {
    const response = await fetchData({ type: 'comments' });
    if (!response.ok) {
      console.log(response.errorInfo);
    } else {
      const commentsArray = response.data as Comment[];

      const result: Record<number, number> = commentsArray.reduce(
        (obj, photo) => {
          const { postId } = photo;
          obj[postId] = (obj[postId] || 0) + 1;
          return obj;
        },
        {} as Record<number, number>
      );

      if (result) {
        dispatch({
          type: 'SET_NUMBER_OF_COMMENTS_IN_POSTS',
          payload: result,
        });
        addDataOfCommentsAndAuthorsToTable(result);
      }
    }
  };

  const addDataOfCommentsAndAuthorsToTable = (
    result: Record<number, number>
  ) => {
    let newTableData = posts?.map((el) => {
      return {
        ...el,
        numberOfComments: result[el.id] ? result[el.id] : 0,
        author: findAuthor(users, el.userId),
      };
    });

    newTableData &&
      dispatch({
        type: 'SET_POSTS',
        payload: filterDataForSave(newTableData, 'posts'),
      });
  };

  const tableData = posts?.map((post) => {
    return [
      {
        name: 'id',
        content: post.id,
        align: 'left',
        isNumberValue: true,
        type: 'body',
      },
      {
        name: 'author',
        content: post.author,
        align: 'left',
        isNumberValue: false,
        type: 'body',
      },
      {
        name: 'numberOfComments',
        content: post.numberOfComments,
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
          <TitlePage text={'Posts'} />
          <SelectElementsToShow
            value={numberOfElementsToShow}
            maxValue={posts?.length}
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

export default PageTablePosts;
