import React from "react";
import { NavLink } from "react-router-dom";
import logoIcon from "../assets/icons/menu/logo.png"
import homeIcon from "../assets/icons/menu/home.png"
import teamWorkIcon from "../assets/icons/menu/team-work.png"
import tasksManagerIcon from "../assets/icons/menu/mange-tasks.png"
import chatsIcon from "../assets/icons/menu/chats.png"
import categoriesIcon from "../assets/icons/menu/categories.png"
import socialIcon from "../assets/icons/menu/social-media.png"
import seetingsIcon from "../assets/icons/menu/settings.png"

function MenuComponent(props) {
  const hoverFunction = ({ isActive, isPending }) => {
    return {
      background: isActive ? "#32C7C233" : "",
    };
  };
  return (
    <div
      className={
        "menu bg-[#F3F6F6] opacity-70 text-black min-w-[100px] rounded-lg flex justify-center items-center overflow-auto max-h-screen min-h-screen"
      }
    >
      <ul
        className={"list-menu flex flex-col items-center justify-start gap-2"}
      >
        <li className={"menu-item"}>
          <NavLink to={"/"} style={hoverFunction}>
            <img
              className={"logo"}
              src={logoIcon}
              alt={"Logo"}
              style={{ marginBottom: "20px" }}
            />
          </NavLink>
        </li>
        <li className={"w-full"}>
          <NavLink
            to={"/"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              className={"icon-item-menu"}
              src={homeIcon}
              alt={"img"}
            />
            <p className={"text-item-menu"}>الرئيسية</p>
          </NavLink>
        </li>
        <li className={"w-full"}>
          <NavLink
            to={"/teamwork"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              className={"icon-item-menu"}
              src={teamWorkIcon}
              alt={"img"}
            />
            <p className={"text-item-menu"}>فريق العمل</p>
          </NavLink>
        </li>
        <li className={"w-full"}>
          <NavLink
            to={"/Chats"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              className={"icon-item-menu"}
              src={chatsIcon}
              alt={"img"}
            />
            <p className={"text-item-menu"}>المحادثات</p>
          </NavLink>
        </li>
        <li className={"w-full"}>
          <NavLink
            to={"/categories"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              className={"icon-item-menu"}
              src={categoriesIcon}
              alt={"img"}
            />
            <p className={"text-item-menu"}>تصنيفات</p>
          </NavLink>
        </li>
        <li className={"w-full"}>
          <NavLink
            to={"/social-media"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              src={socialIcon}
              alt={"img"}
              className={"icon-item-menu"}
            />
            <p className={"text-item-menu"}>تواصل اجتماعي</p>
          </NavLink>
        </li>
        {/* <li className={"w-full"}>
          <NavLink
            to={"/social-media"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              className={"icon-item-menu"}
              src="https://s3-alpha-sig.figma.com/img/a2e1/1d57/fa51a1bdfd5c3fed0d200bc24a30dab2?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E-wOxkWEx3-EYKjzcUPveO1ds~-W5cR2V4UtBhxsfxqRx0vLsGrSxnjqaOKGfegVKPUT-Pbhh4KuFTeQp5PmFpOQzO5UZLqnx2d1yG~Inu3CkdD23ANNOPWTf89wyP8WSyPBk0iA4rIkfMvoMN6XNfzCvE2~OtFpQHcXSOuoL4RTW8ZFweyM6LDaNrjIknSKMPk4I4sZT70xqId6sjxnFjt~TVgqtCZHuOdEzpJqw6l6fdcC4WkIjVsHYP44K8x-bjIVwdR9A9PrCzD3NmLHU0-x-RtUc6NuJDfdYq6WUKQk6Zg-cR7b1uwIdlV4BC4kG~lIkGN2IQZ~ACLvxHFqcA__"
              alt={"img"}
            />
            <p className={"text-item-menu"}>تواصل اجتماعي</p>
          </NavLink>
        </li> */}

        <li className={"w-full"}>
          <NavLink
            to={"/settings"}
            style={hoverFunction}
            className="item-menu font-bold text-black flex flex-col items-center justify-center py-2"
          >
            <img
              className={"icon-item-menu"}
              src={seetingsIcon}
              alt={"img"}
            />
            <p className={"text-item-menu"}>اعدادات</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default MenuComponent;
