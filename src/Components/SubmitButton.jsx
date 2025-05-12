// components/SubmitButton.js
import { Button, CircularProgress } from "@mui/material";

const SubmitButton = ({ children, loading = false, ...props }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{ mt: 2, position: "relative" }}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress
            size={24}
            sx={{
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
          <span style={{ opacity: 0 }}>{children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
