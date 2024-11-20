export const LoginSx = {
  loginForm: {
    p: 4,
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: 2,
  },
};

export const NavbarSx = {
  search_input: {
    width: 200,
    mr: 5,
    "& .MuiInputBase-input": {
      color: "white",
    },
    color: "white",
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white",
      opacity: 1,
    },
  },
};

export const GeneralModal = {
  modal_container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  },
};
