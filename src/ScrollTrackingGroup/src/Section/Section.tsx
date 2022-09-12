import React from "react";
import { CSSProperties, useContext, useEffect, useMemo, useRef } from "react";
import STGContext, { ISTGContext } from "../STGContextProvider/STGContext";
import { useScrollPosition } from "../useScrollPosition";

export type SectionProps = {
  children?: React.ReactNode;
  /**
   * Used to identify the Section's `ref` in the ScrollTrackingGroup's `Context`.
   *
   * Also used as the React `key`.
   */
  id: string;
  /**
   * Styling passed to the Section's div
   */
  style?: CSSProperties;
  /**
   * The ref for the element containing `Sections`, if it is not the innerDiv of the `Container`
   */
  containerRef?: React.MutableRefObject<HTMLElement | undefined | null>;
};

/**
 * A Section is a block of content in the ScrollTrackingGroup.
 * They are placed inside the `Container` along with `Window`.
 *
 * Each Section's `scroll position` is tracked so that when it overlaps with the Window it can be set as
 *    the currently scrolled to Section (fire `onScrolledToChange`).
 *
 * ---
 *
 * Unlike `Window`, `Sections` can be placed within other elements and the STG will still function.
 */
const Section = (props: SectionProps) => {
  const { children, id, style, containerRef } = props;

  const { saveRef, container, sections, lastUpdated, localScroll } = useContext(
    STGContext
  ) as ISTGContext;
  const innerRef = useRef<HTMLElement | undefined>();
  const contRef = containerRef ?? container;
  /* ---------------------------- Position Tracking --------------------------- */
  useScrollPosition(
    ({ currPos }) => {
      if (sections.current[id]) sections.current[id]!.position = currPos;
    },
    [lastUpdated],
    innerRef,
    undefined,
    undefined,
    localScroll ? contRef : undefined
  );
  /* ------------------------------- On unmount ------------------------------- */
  useEffect(() => () => saveRef(null, id), []);
  /* --------------------------------- Render --------------------------------- */
  const section = useMemo(
    () => (
      <div
        ref={(e) => {
          innerRef.current = e ?? undefined;
          if (e) saveRef(e, id);
        }}
        key={id}
        style={style}
      >
        {children}
      </div>
    ),
    [children, innerRef]
  );
  return <>{section}</>;
};

export default Section;
