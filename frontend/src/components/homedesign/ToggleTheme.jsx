import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ToggleTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme}>
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </Button>
    );
};

export default ToggleTheme;