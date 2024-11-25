"use client";

import { FC } from "react";

import clsx from "clsx";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

type ThemeChangerProps = {
  className?: string;
};

export const ThemeChanger: FC<ThemeChangerProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }

    setTheme("light");
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className={clsx("", className)}
      onClick={handleChangeTheme}
    >
      {theme === "light" && <MoonIcon />}
      {theme === "dark" && <SunIcon />}
    </Button>
  );
};
