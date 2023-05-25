import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageTableUsers from '../pages/PageTableUsers/PageTableUsers';
import PageTablePosts from '../pages/PageTablePosts/PageTablePosts';
import PageTableAlbums from '../pages/PageTableAlbums/PageTableAlbums';

const MainRoute = () => {
  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageTableUsers />} />
          <Route path="/posts" element={<PageTablePosts />} />
          <Route path="/albums" element={<PageTableAlbums />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MainRoute;
