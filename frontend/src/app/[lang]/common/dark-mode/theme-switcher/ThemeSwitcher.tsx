'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@nextui-org/react';

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  let labelBtn = "light"

  if (theme === 'light') {
    labelBtn = 'Dark'
  } else {
    labelBtn = 'Light'
  }

  return (
    <Button
      className={`w-fit absolute right-5 top-2 p-2 rounded-md hover:scale-110 active:scale-100 duration-200 bg-slate-200 dark:bg-[#212933]`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {labelBtn}
      {/* {theme === 'light' ? 'Dark' : 'Light'} */}
    </Button>
  );
};
