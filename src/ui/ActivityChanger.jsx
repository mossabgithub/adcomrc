import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";

import { MARKETSOPTIONS } from "../data/centers";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useAppContext } from "../context/AppContext";
import NestedMenuItem from "material-ui-nested-menu-item";
import { PiArrowSquareInFill } from "react-icons/pi";

export default function ActivityChanger() {
  const { market, activity, setActivity } = useAppContext();
  const ref = React.useRef(null);

  const buttonStyle = {
    padding: "0.7rem 1.6rem 0.7rem 2rem",
    color: "#444",
    backgroundColor: "#f7f7f7",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    gap: "0.5rem",
    alignItems: "center",
    display: "flex",
    textTransform: "inherit",
    fontFamily: "inherit",
    fontWeight: "meduim",
    fontSize: "1.25rem",
    cursor: !activity ? "not-allowed" : "pointer",
    pointerEvents: !activity ? "none" : "auto",

    "&:hover": { backgroundColor: "#eae8e8" },
  };

  const menuStyle = {
    style: {
      padding: "0",
      minWidth: "150px",
      transform: "translate(-15px,10px)",
      borderRadius: "3px",
      boxShadow: "0px 2px 6px 6px rgb(0 0 0 / 0.04)",
      backgroundColor: "#f9fafb",
      fontSize: "1.2rem",
    },
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickEvent(e, activity) {
    handleClose();
    setActivity(activity);
    localStorage.setItem("activity", activity);
  }

  React.useEffect(() => {
    ref.current.querySelector("button").classList.remove("MuiButtonBase-root");
  }, []);

  return (
    <div
      ref={ref}
      className={`relative z-100 ${activity ? "" : "cursor-not-allowed"}`}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={buttonStyle}
      >
        {
          <>
            {!activity && (
              <>
                <span>No activity yet ...</span>
                <span className="text-xl">
                  <RiArrowDropDownLine />
                </span>
              </>
            )}
            {activity && (
              <>
                <span className="uppercase">{activity}</span>
                <span className="text-xl">
                  <RiArrowDropDownLine />
                </span>
              </>
            )}
          </>
        }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClose(e, null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={menuStyle}
      >
        {MARKETSOPTIONS[market].activities.map((act) => {
          if (act.brands) {
            return (
              <NestedMenuItem
                label={act.activity.toUpperCase()}
                parentMenuOpen={anchorEl}
                style={{
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  alignItems: "center",
                }}
                key={act.activity}
                PaperProps={menuStyle}
              >
                <div className="flex flex-col gap-1 text-[1.2rem]">
                  {act.brands.map((brand) => {
                    return (
                      <MenuItem
                        disabled={activity === brand}
                        style={{
                          fontSize: "inherit",
                          fontFamily: "inherit",
                          paddingRight: "16px",
                          paddingLeft: "16px",
                          gap: "0.5rem",
                        }}
                        onClick={(e) => handleClickEvent(e, brand)}
                        key={brand}
                      >
                        <span>
                          <PiArrowSquareInFill />
                        </span>
                        <span className="uppercase">{brand}</span>
                      </MenuItem>
                    );
                  })}
                </div>
              </NestedMenuItem>
            );
          }
          return (
            <MenuItem
              disabled={activity === act.activity}
              style={{
                fontSize: "inherit",
                fontFamily: "inherit",
                paddingRight: "16px",
                paddingLeft: "16px",
                gap: "1rem",
              }}
              onClick={(e) => handleClickEvent(e, act.activity)}
              key={act.activity}
            >
              <span className="uppercase">{act.activity}</span>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}