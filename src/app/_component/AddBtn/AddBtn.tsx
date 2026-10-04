'use client'
import { addToCart } from "@/api/actions/cartActions/addToCart"
import { useMutation ,useQueryClient } from "@tanstack/react-query";
import React, { ReactNode } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { toast } from "sonner";

export default function AddBtn({cls , child ,prodId}: {cls?: string, child?: ReactNode, prodId: string}) {
  const query = useQueryClient();

async function handleAddToCart() {

  mutate(prodId)

}

const { data, mutate } = useMutation({
  mutationFn: addToCart,
  onSuccess: (data) => {
    toast.success(data.message)
     query.invalidateQueries({queryKey:['getCart']})
  },
  onError: () => {
    toast.error("Login first")
  }
})



return (
    <>
        <button onClick={handleAddToCart} className={cls}>
            {child}
        </button>
    </>
)
}
