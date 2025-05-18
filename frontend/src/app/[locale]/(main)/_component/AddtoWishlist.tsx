'use client';

import { IconHeart } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAddToFavoritesMutation } from '@/store/api/artwork/artwork';
import { notify } from '@/shared/components/notification/notification';
const AddtoCart = ({id}:{id:string}) => {
    const [addToWishlist, {isLoading}] = useAddToFavoritesMutation();
    const [isInWishlist, setIsInWishlist] = useState(false);
  const handleAddToWishlist =async () => {
    try {
      await addToWishlist({artwork_id:id}).unwrap()
      notify('Success', 'Added to wishlist')
      setIsInWishlist(true)
    } catch (error) {
      notify('Error', 'Failed to add to wishlist')
      console.log(error)
    }
  }
  return (
    <>
      <IconHeart
        size={20}
        onClick={handleAddToWishlist}
        color={isInWishlist ? 'red' : 'gray'}
        className='cursor-pointer text-sm'
      />

    </>
  );
};

export default AddtoCart;
