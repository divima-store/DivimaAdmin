"use server";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function createProduct(formData) {
  try {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const imageFile = formData.get("imagePath");

    if (!name || !description || !price || !imageFile) {
      throw new Error("All fields are required");
    }

    const fileName = `${Date.now()}-${imageFile.name}`;

    // List all files in the bucket to check if the image already exists
    const { data: files, error: listError } = await supabase.storage
      .from("Images")
      .list();

    if (listError) {
      throw new Error("Error listing images: " + listError.message);
    }

    const fileExists = files.some((file) => file.name === imageFile.name);

    if (fileExists) {
      throw new Error("Image already exists in the bucket.");
    }

    const { data: imageData, error: uploadError } = await supabase.storage
      .from("Images")
      .upload(fileName, imageFile);

    if (uploadError) {
      throw new Error("Error uploading image: " + uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("Images").getPublicUrl(fileName);

    const { data, error } = await supabase
      .from("products")
      .insert([{ name, description, price, imageUrl: publicUrl }])
      .select()
      .single();

    if (error) {
      throw new Error("Error creating product: " + error.message);
    }

    revalidatePath("/products");
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateProduct(formData) {
  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const imageFile = formData.get("imagePath");

    if (!id || !name || !description || !price) {
      throw new Error("All fields are required");
    }

    let publicUrl = formData.get("imageUrl"); // Use existing image URL if no new image is uploaded

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { data: imageData, error: uploadError } = await supabase.storage
        .from("Images")
        .upload(fileName, imageFile);

      if (uploadError) {
        throw new Error("Error uploading image: " + uploadError.message);
      }

      const {
        data: { publicUrl: newPublicUrl },
      } = supabase.storage.from("Images").getPublicUrl(fileName);
      publicUrl = newPublicUrl;
    }

    const { data, error } = await supabase
      .from("products")
      .update({ name, description, price, imageUrl: publicUrl })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error("Error updating product: " + error.message);
    }

    revalidatePath("/products");
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(productId) {
  'use server';
  
  try {
    // First check if the product has any associated orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id')
      .eq('productId', productId)
      .limit(1);

    if (ordersError) {
      throw new Error("Error checking orders: " + ordersError.message);
    }

    if (orders && orders.length > 0) {
      // If there are associated orders, perform a soft delete instead
      const { error: updateError } = await supabase
        .from('products')
        .update({ isActive: false })
        .eq('id', productId);

      if (updateError) {
        throw new Error("Error deactivating product: " + updateError.message);
      }
    } else {
      // If no orders exist, proceed with hard delete
      // Get the product to get the image URL
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('imageUrl')
        .eq('id', productId)
        .single();

      if (fetchError) {
        throw new Error("Error fetching product: " + fetchError.message);
      }

      // Delete image if it exists
      if (product.imageUrl) {
        const fileName = product.imageUrl.split('/').pop();
        
        const { error: storageError } = await supabase.storage
          .from('Images')
          .remove([fileName]);

        if (storageError) {
          console.error("Error deleting image:", storageError);
        }
      }

      // Delete the product from the database
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (deleteError) {
        throw new Error("Error deleting product: " + deleteError.message);
      }
    }

    revalidatePath('/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
