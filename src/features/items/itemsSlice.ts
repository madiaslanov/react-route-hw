import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, getItemById } from '../../services/itemsService';
import type { Product, ApiResponse } from '../../types/product';

interface ItemsState {
  list: Product[];
  selectedItem: Product | null;
  loadingList: boolean;
  loadingItem: boolean;
  errorList: string | null;
  errorItem: string | null;
  query: string;
}

const initialState: ItemsState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
};

export const fetchItems = createAsyncThunk<
  { products: Product[]; query: string },
  string,
  { rejectValue: string }
>('items/fetchItems', async (query, { rejectWithValue }) => {
  try {
    const data: ApiResponse = await getItems(query);
    return { products: data.products, query };
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const fetchItemById = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>('items/fetchItemById', async (id, { rejectWithValue }) => {
  try {
    const data = await getItemById(id);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      state.errorItem = null;
    },
  },
  extraReducers: (builder) => {
    // fetchItems
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.products;
        state.query = action.payload.query;
        state.errorList = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload || 'Failed to fetch items';
        state.list = [];
      });

    // fetchItemById
    builder
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
        state.errorItem = null;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.payload || 'Failed to fetch item';
        state.selectedItem = null;
      });
  },
});

export const { clearSelectedItem } = itemsSlice.actions;
export default itemsSlice.reducer;

