import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HomeContext } from "../providers/HomeProvider";
import Login from "./authentication/Login";
import Register from "./authentication/Register";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(HomeContext);
  
    if (!isLoggedIn) {
      return (  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />      
        </Routes> 
      );
    }
    // else{
    //  return(
    //    <UserProfileProvider>
    //    <PostProvider>
    //   <TagProvider>  
    //     <CategoryProvider>
    //       <CommentProvider> 
    //         <Routes>
    //         <Route path="/" element={<Hello />} />
    //         <Route path="/category" element={ <CategoryList />} />
    //         <Route path="/category/add" element={ <CategoryForm />} />
    //         <Route path="/category/delete/:id" element={<CategoryForm />} />
    //         <Route path="category/edit/:categoryId/*" element={<CategoryForm />} />      
  
    //         <Route path="/users" element={<UserList />} />
    //         <Route path="/users/:id" element={<UserDetails />} />
  
    //         <Route path="/tags" element={<TagList />} />
    //         <Route path="/add/tags/" element={<TagForm />} />
    //         <Route path="/delete/tags/:TagId" element={<TagForm />} />
    //         <Route path="tags/edit/:tagId/*" element={<TagForm />} />
  
    //         <Route path="/posts" element={<PostList />} />
    //         <Route path="/posts/:id" element={<PostDetail />} />
    //         <Route path="/posts/ManageTag/:postId" element={<ManageTagForm />} />
    //         {/* <Route path="/myposts" element={<UserPosts />} /> */}
    //         <Route path="/post/comments/:id/*" element={<CommentList />} />
            
    //       </Routes>
    //       </CommentProvider>
        
    //     </CategoryProvider>
    //   </TagProvider>
    //   </PostProvider>
    //   </UserProfileProvider>
  
  
    //  );
    // }
  }