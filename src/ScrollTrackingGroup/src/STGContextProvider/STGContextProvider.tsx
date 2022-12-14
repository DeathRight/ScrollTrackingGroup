import React, { useCallback, useRef, useState } from "react";
import STGContext, { Orientation, SectionObj, SectionsObj } from "./STGContext";

const STGContextProvider = (props: {
  children: React.ReactNode;
  flipped?: boolean;
  orientation?: Orientation;
  localScroll?: boolean;
}) => {
  const {
    children,
    flipped = false,
    orientation = "vertical",
    localScroll = false,
  } = props;

  const container = useRef<HTMLDivElement | null>(null);
  const window = useRef<HTMLDivElement | undefined>();
  const sections = useRef<SectionsObj>({});
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const saveRef = useCallback(
    (e: HTMLDivElement | null, key: string) => {
      if (e) {
        const coords = e.getBoundingClientRect();

        const section: SectionObj = {
          element: e,
          position: {
            x: coords.x,
            left: coords.left,
            y: coords.y,
            top: coords.top,
            right: coords.right,
            bottom: coords.right,
          },
        };
        if (key === "STG.Window") window.current = e;
        else sections.current[key] = section;
      } else if (!e && sections.current[key]) delete sections.current[key];
      setLastUpdated(Date.now());
    },
    [sections]
  );

  return (
    <STGContext.Provider
      value={{
        container,
        window,
        sections,
        saveRef,
        lastUpdated,
        setLastUpdated,
        flipped,
        orientation,
        localScroll,
      }}
    >
      {children}
    </STGContext.Provider>
  );
};

export default STGContextProvider;
