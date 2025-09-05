import { createContext, useContext, useEffect, useState } from "react";

export type Color = "default" | "prod" | "test";

type ColorProviderProps = {
  children: React.ReactNode;
  defaultColor?: Color;
}

type ColorProviderState = {
  color: Color;
  setColor: (color: Color) => void;
}

const initialState: ColorProviderState = {
  color: "default",
  setColor: () => null,
}

const ColorProviderContext = createContext<ColorProviderState>(initialState);

export function ColorProvider({ children, defaultColor = "default", ...props }: ColorProviderProps) {
  const [color, setColor] = useState<Color>(defaultColor);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = window.document.body;
    body.dataset.color = color;
  }, [color]);
  
  const value = {
    color,
    setColor: (color: Color) => setColor(color),
  }
  return (
    <ColorProviderContext.Provider {...props} value={value}>
      {children}
    </ColorProviderContext.Provider>
  );
}

export const useColor = () => {
  const context = useContext(ColorProviderContext);
  if (context === undefined) throw new Error("useColor must be used within a ColorProvider");
  return context;
};
