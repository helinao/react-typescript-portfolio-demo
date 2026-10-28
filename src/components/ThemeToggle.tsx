import { useContext } from 'react';
import AppContext from "../contexts/AppContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(AppContext);
 
    return (
        <button onClick={toggleTheme} className='py-2 px-4 text-2xl'>
            {theme === 'dark' ? '🔆' : '🌙'}
        </button>
    );
};

export default ThemeToggle;
