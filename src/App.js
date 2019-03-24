import React from 'react';
import { Admin, Resource, EditGuesser, ListGuesser } from 'react-admin';
import { UserList } from './users';
import { PostList, PostEdit } from './posts';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import dataProvider from './dataProvider';

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="products" list={ListGuesser}/>
  </Admin>
);

export default App;