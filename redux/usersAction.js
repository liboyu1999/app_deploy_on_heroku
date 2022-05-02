export const setUserRedux = userInfo => (

    {
      type: 'SET_USER',
      payload: userInfo,
    }
  );

  export const setUserID = userID => (
    {
      type: 'SET_USER_ID',
      payload: userID
    }
  )