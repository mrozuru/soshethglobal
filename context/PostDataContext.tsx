// PostDataContext.tsx
"use client"; // Ensure client-side rendering

import React, { createContext, useContext, useState } from 'react';

// Define the context type
interface PostDataContextType {
  postData: any; // Consider using a more specific type
  setPostData: React.Dispatch<React.SetStateAction<any>>; // Adjust the type as needed
}

// Create the context with a default value
const PostDataContext = createContext<PostDataContextType>({
  postData: {}, // Default postData state
  setPostData: () => {}, // Default setter function
});

// Custom hook to use the PostData context
export const usePostData = () => useContext(PostDataContext);

// Context provider component
export const PostDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [postData, setPostData] = useState({}); // You might want to define an initial state that's more specific

  return (
    <PostDataContext.Provider value={{ postData, setPostData }}>
      {children}
    </PostDataContext.Provider>
  );
};
