

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import Home from './pages/Home';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import SinglePost from './components/singlePost/SinglePost';
import Write from '../src/pages/write/Write'
import Post from '../src/pages/post/Post'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Settings from './pages/settings/Settings'
import { Layout } from './components/Layout/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
function App() {

  
  const queryClient = new QueryClient();
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes >
            <Route element={<Layout/>}> 
            <Route path='/' element={<Home />} />
            <Route path='/post/:id' element={<SinglePost />} />
            <Route path='/add_post' element={<Write />} />
            <Route path='/all_post' element={<Post />} />
            <Route path='/Login' element={< Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/settings/:id' element={<Settings />} /> 
            </Route>
          </Routes>
        </Router>
        <Toaster   position="top-right" toastOptions={{
  duration: 5000,
  style: {
    marginTop: '1rem',
  },
}}
/>
      </QueryClientProvider>
    </>
  );
}

export default App;
