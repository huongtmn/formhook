const DEFAULT_STATE = {
    userList: [
        {
            id: 1,
            username: "man.nguyen",
            fullName: "Man Ng",
            password: "123",
            phoneNumber: "085512123123",
            email: "man.nguyen@gmail.com",
            type: "Client",
        },
        {
            id: 2,
            username: "khai.tran",
            fullName: "Khai Tran",
            password: "123",
            phoneNumber: "085512456456",
            email: "khai.tran@gmail.com",
            type: "Admin",
        },
    ],
    selectedUser: null,
};

export const userReducer = (state=DEFAULT_STATE, action) => {
    const {type, payload} = action;

    switch (type) {
        case "ADD_USER":{
            const data = [...state.userList];
            
            data.push({
                ...payload,
                id: Date.now(),
            });

            state.userList = data;
            
            break;
        }
        
        case "SET_SELECTED_USER":{
            state.selectedUser = payload;

            break;
        }

        case "UPDATE_USER":{
            state.selectedUser = null;

            state.userList = state.userList.map(ele => ele.id === payload.id ? payload : ele);

            break;
        }

        case "DELETE_USER":{
            state.userList = state.userList.filter((ele) => ele.id === payload.id ? false : true);
            
            break;
        }

        default:
            break;
    }

    return {...state};
}
