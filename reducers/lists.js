import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setList: (state, action) => {
      if (!state.value.find((e)=> e.menuId === action.payload.menuId))
     {
            state.value.push(action.payload) 
     }
    },
    updateList: (state, action) => {
      const index=state.value.findIndex((e)=> e.menuId === action.payload.menuId)
      if(index > 0)
      {
        console.log('dispatched')
        state.value[index]=action.payload
      }
      else
      {
        state.value.push(action.payload)
      }
    },
    updateOneElementOfList: (state, action) => {
      // const list=state.value.find((element) => element.find((e) => e.name === action.payload.name))
      // const index=state.value.findIndex((e)=> e.menuId === action.payload.menuId && e.ingredients.find((element) => element.name == action.payload.name))
      
      console.log('here',list)
      // {menuId:menuid ,id:id ,isbuyed:!isBuyed}
 
    },
    

  },
});

export const {setList,updateList,updateOneElementOfList } = listsSlice.actions;
export default listsSlice.reducer;
