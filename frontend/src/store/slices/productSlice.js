// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import productService from "../../services/productService";

// /* =========================================================
//    FETCH ALL PRODUCTS
//    ========================================================= */

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await productService.getProducts();
//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to fetch products"
//       );
//     }
//   }
// );

// /* =========================================================
//    CREATE PRODUCT
//    ========================================================= */

// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const response = await productService.createProduct(productData);
//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to create product"
//       );
//     }
//   }
// );

// /* =========================================================
//    UPDATE PRODUCT
//    ========================================================= */

// export const updateProduct = createAsyncThunk(
//   "products/updateProduct",
//   async ({ id, productData }, { rejectWithValue }) => {
//     try {
//       const response = await productService.updateProduct(
//         id,
//         productData
//       );

//       return response?.data || response;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to update product"
//       );
//     }
//   }
// );

// /* =========================================================
//    DELETE PRODUCT
//    ========================================================= */

// export const deleteProduct = createAsyncThunk(
//   "products/deleteProduct",
//   async (id, { rejectWithValue }) => {
//     try {
//       await productService.deleteProduct(id);

//       return id;
//     } catch (error) {
//       return rejectWithValue(
//         error?.response?.data?.message ||
//           error?.response?.data ||
//           error?.message ||
//           "Failed to delete product"
//       );
//     }
//   }
// );

// /* =========================================================
//    INITIAL STATE
//    ========================================================= */

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// /* =========================================================
//    SLICE
//    ========================================================= */

// const productSlice = createSlice({
//   name: "products",
//   initialState,

//   reducers: {
//     clearProductError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     /* ---------------- FETCH PRODUCTS ---------------- */

//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         state.items = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.content || [];
//       })

//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch products";
//       });

//     /* ---------------- CREATE PRODUCT ---------------- */

//     builder
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         if (action.payload) {
//           state.items.push(action.payload);
//         }
//       })

//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to create product";
//       });

//     /* ---------------- UPDATE PRODUCT ---------------- */

//     builder
//       .addCase(updateProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(updateProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         const updatedProduct = action.payload;

//         if (!updatedProduct?.id) {
//           return;
//         }

//         const index = state.items.findIndex(
//           (product) => product.id === updatedProduct.id
//         );

//         if (index !== -1) {
//           state.items[index] = updatedProduct;
//         }
//       })

//       .addCase(updateProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to update product";
//       });

//     /* ---------------- DELETE PRODUCT ---------------- */

//     builder
//       .addCase(deleteProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;

//         state.items = state.items.filter(
//           (product) => product.id !== action.payload
//         );
//       })

//       .addCase(deleteProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to delete product";
//       });
//   },
// });

// export const { clearProductError } = productSlice.actions;

// export default productSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data, { rejectWithValue }) => {
    try {
      return await productService.createProduct(data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await productService.updateProduct(id, data);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete product');
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || [];
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;