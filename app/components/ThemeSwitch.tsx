import { Switch, useThemeContext } from "@radix-ui/themes";

const ThemeSwitch = () => {
  const { onAppearanceChange } = useThemeContext();

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      onAppearanceChange("light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      onAppearanceChange("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
    <>
      <Switch onClick={toggleTheme} size="3" />
    </>
  );
};

export default ThemeSwitch;
