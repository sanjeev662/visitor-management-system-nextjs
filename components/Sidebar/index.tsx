import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, RootState } from "../../store";
import { tokens } from "../../src/theme";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";


interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: React.FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Link href={to} passHref style={{ textDecoration: "none" }}>
      <MenuItem
        active={selected === title}

        style={{
          backgroundColor: colors.primary[900],
          color: colors.grey[100],
          paddingLeft: "15px",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SideBar: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const dispatch = useAppDispatch();

  const {
    application: {
      bearerToken,
      user_name,
      user_type,
      user_pic,
      apiState: { status, isError, message },
      isLoginError,
    },
    employees: { employeeDetails },
  } = useAppSelector((state: RootState) => state);

  let role = user_type;

  if (role === "guard") {
    return null;
  }

  return (
    <Sidebar
      collapsed={isCollapsed}
      backgroundColor={colors.primary[900]}
      rootStyles={{
        height: "100vh",
        width: "210px",
        minWidth: "210px",
      }}
    >
      <Menu>
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.grey[100],
            backgroundColor: colors.primary[900],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="5px"
            >
              <Box display="flex" justifyContent="center" alignItems="center" mt="8px">
                <img
                  alt="ESSI"
                  width="100px"
                  height="35px"
                  src={"../../assets/elkosta_logo.png"}
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="User-Profile"
                width="100px"
                height="100px"
                src={
                  user_pic
                    ? `data:image/png;base64,${user_pic}`
                    : "../../assets/user.png"
                }
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {user_name}
              </Typography>
              <Typography variant="h5" color={colors.greenAccent[500]}>
                {user_type}
              </Typography>
            </Box>
          </Box>
        )}

        <Box>
          <SubMenu
            label="Dashboard"
            icon={<HomeOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display:
                role === "admin" || role === "receptionist" ? "" : "none",
            }}
          >
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>

          <SubMenu
            label="Dashboard"
            icon={<HomeOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display: role === "guard" ? "" : "none",
            }}
          >
            <Item
              title="Home"
              to="/guard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>

          <SubMenu
            label="Visitors"
            icon={<PeopleOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display:
                role === "admin" || role === "receptionist" ? "" : "none",
            }}
          >
            <Item
              title="Visitors"
              to="/visitor/visitors"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Passes"
              to="/passes/viewandcancelpass"
              icon={<ListOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>

          <SubMenu
            label="Appointments"
            icon={<CalendarTodayOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display:
                role === "admin" || role === "receptionist" ? "" : "none",
            }}
          >
            <Item
              title="appointments"
              to="/appointment/appointments"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="create appointment"
              to="/appointment/createappointment"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>

          <SubMenu
            label="Employee"
            icon={<BadgeOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display: role === "admin" ? "" : "none",
            }}
          >
            <Item
              title="Employees"
              to="/employee/employees"
              icon={<BadgeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add New Employee"
              to="/employee/addnewemployee"
              icon={<PersonAddAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>

          <SubMenu
            label="Reports"
            icon={<DescriptionOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display: role === "admin" ? "" : "none",
            }}
          >
            <Item
              title="Download Reports"
              to="/reports/downloadreports"
              icon={<DownloadOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>

          <SubMenu
            label="Authentication"
            icon={<SettingsOutlinedIcon />}
            color={colors.grey[300]}
            style={{
              backgroundColor: colors.primary[900],
              paddingLeft: "15px",
              display:
                role === "admin" || role === "receptionist" || role === "guard"
                  ? ""
                  : "none",
            }}
          >
            <Item
              title="Change Password"
              to="/auth/changepassword"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Help"
              to="/auth/help"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </SubMenu>
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
