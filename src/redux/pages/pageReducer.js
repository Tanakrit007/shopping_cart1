const intialState = {
  home: true, //show home if false show mycart
};

const pageReducer = (state = intialState, action) => {
  switch (action.type) {
    case "HOME":
      return { home: true };

    case "CART":
      return { home: false };

    default:
      return state;
  }
};

export default pageReducer;
