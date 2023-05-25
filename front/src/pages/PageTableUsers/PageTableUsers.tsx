import React, { useState, useEffect } from 'react';
// components
import BasicLayout from '../../templates/BasicLayout/BasicLayout';
import TitlePage from '../../atoms/typography/TitlePage/TitlePage';
// types
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { TableCellProps } from '../../models/table.model';
// store
import { useSelector, useDispatch } from 'react-redux';
// functions
import {
  fetchData,
  filterDataForSave,
  generateTable,
} from '../sharedFunctions';

const PageTableUsers = () => {
  const users = useSelector((state: { users: User[] }) => state.users);
  const posts = useSelector((state: { posts: Post[] }) => state.posts);
  const numberOfPostsByUser = useSelector(
    (state: { numberOfPostsByUser: Record<number, number> }) =>
      state.numberOfPostsByUser
  );

  const [error, setError] = useState<string>('');

  const [
    allDataOfTableIsSuccessfullyLoaded,
    setAllDataOfTableIsSuccessfullyLoaded,
  ] = useState<boolean>(true);

  const tableCellsStructureHeader: TableCellProps[] = [
    {
      name: 'id',
      content: '#ID',
      align: 'left',
      isNumberValue: true,
      type: 'header',
    },
    {
      name: 'name',
      content: 'Complete Name',
      align: 'left',
      isNumberValue: false,
      type: 'header',
    },
    {
      name: 'email',
      content: 'Email',
      align: 'left',
      isNumberValue: false,
      type: 'header',
    },
    {
      name: 'numberOfPostsByUser',
      content: 'Posts (qty.)',
      align: 'right',
      isNumberValue: false,
      type: 'header',
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    !users && loadUsers();
    !posts && loadPosts();
    !numberOfPostsByUser && users && posts && calculateNumberOfPostsByUsers();
  }, [users, posts, numberOfPostsByUser]);

  useEffect(() => {
    setAllDataOfTableIsSuccessfullyLoaded(
      users && posts && numberOfPostsByUser && !error
    );
  }, [users, posts, numberOfPostsByUser, error]);

  const loadUsers = async () => {
    const response = await fetchData({ type: 'users' });
    if (!response.ok) {
      setError(response.errorInfo);
    } else {
      const usersArray = response.data;
      usersArray &&
        dispatch({
          type: 'SET_USERS',
          payload: filterDataForSave(usersArray, 'users'),
        });
    }

  };

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

  const calculateNumberOfPostsByUsers = async () => {
    const postsArray = posts as Post[];

    const result: Record<number, number> = postsArray.reduce((obj, post) => {
      const { userId } = post;
      obj[userId] = (obj[userId] || 0) + 1;
      return obj;
    }, {} as Record<number, number>);

    if (result) {
      dispatch({
        type: 'SET_NUMBER_OF_POSTS_BY_USER',
        payload: result,
      });
      addDataOfPostToTable(result);
    }
  };

  const addDataOfPostToTable = (result: Record<number, number>) => {
    let newTableData = users?.map((el) => {
      return {
        ...el,
        numberOfPosts: result[el.id] ? result[el.id] : 0,
      };
    });

    newTableData &&
      dispatch({
        type: 'SET_USERS',
        payload: filterDataForSave(newTableData, 'users'),
      });
  };

  const tableData = users?.map((user) => {
    return [
      {
        name: 'id',
        content: user.id,
        align: 'left',
        isNumberValue: true,
        type: 'body',
      },
      {
        name: 'name',
        content: user.name,
        align: 'left',
        isNumberValue: false,
        type: 'body',
      },
      {
        name: 'email',
        content: user.email,
        align: 'left',
        isNumberValue: false,
        type: 'body',
      },
      {
        name: 'numberOfPostsByUser',
        content: user.numberOfPosts,
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
          <TitlePage text={'Users'} />
          {allDataOfTableIsSuccessfullyLoaded &&
            tableData &&
            generateTable(tableCellsStructureHeader, tableData)}
        </>
      </BasicLayout>
    </>
  );
};

export default PageTableUsers;
