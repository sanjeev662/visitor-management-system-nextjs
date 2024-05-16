import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../src/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/application/actions";

const Topbar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const {
    application: {
      bearerToken,
      user_type,
      apiState: { status, isError, message },
    },
    allAppointments: { allAppointmentDetails },
  } = useAppSelector((state) => state);

  const handleLogOut = async () => {
    dispatch(
      logout({
        headers: { Authorization: `bearer ${bearerToken}` },
      })
    );
    handleClose();
    router.push("/auth/login");
  };

  const handleResetPassword = async () => {
    router.push("/auth/changepassword");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{ boxShadow: 1 }}
    >
      {user_type === "guard" && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="8px"
        >
          <img
            alt="ESSI"
            width="100px"
            height="35px"
            src={"../../assets/elkosta_logo.png"}
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}

      <Box width="100%" textAlign="center">
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mt: 2 }}
        >
          DELHI SACHIVALAYA - VISITOR MANAGEMENT SYSTEM
        </Typography>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
