import React, {
  useContext,
  useImperativeHandle,
  useEffect,
  useState,
  useId,
  CSSProperties,
} from "react";
import STGContextProvider, {
  STGContext,
  ISTGContext,
  SectionObj,
} from "./context";
import Section, { SectionProps } from "./Section";
import { useScrollPosition } from "./useScrollPosition";

export type ContainerProps = {
  children: React.ReactNode;
  /**
   * Fires when the currently 'scrolled to' Section changes elements,
   * providing the `Section`'s id and DOM Element.
   */
  onScrolledToChange?: (id: string, e: HTMLElement) => void;
  /**
   * Whether we are tracking vertical or horizontal scrolling.
   *
   * When vertical, `Window`'s offset is from the top. When horizontal, offset is from the left.
   *
   * @defaultValue `'vertical'`
   */
  orientation?: "vertical" | "horizontal";
  /**
   * If true, `Window`'s offset is from the opposite (bottom or right) side of the viewport.
   *
   * Normally, the element closest to the top of the Window is the currently 'scrolled to' element,
   *      however, if flipped, the element closest to the bottom is.
   *
   * @defaultValue `false`
   */
  flipped?: boolean;
  /**
   * If true, we track viewport from this component instead of document.
   * Should only be used if the component itself is scrolling locally.
   *
   * @defaultValue `false`
   */
  localScroll?: boolean;
  /**
   * React `key`
   */
  id?: string;
  /**
   * Styling passed to the Container's ___outer div___.
   *
   * "position" is set to "relative" in order for the `Window` to work,
   *    therefore this is omitted and should not be changed.
   *
   * In most cases, you should not have to change anything here except sizing.
   *
   * Everything else should be applied to the regular `style` prop, which controls
   *    the inner div where children are put.
   */
  outerStyle?: Omit<CSSProperties, "position">;
  /**
   * Styling passed to the Container's ___inner div___ where children are put.
   */
  style?: CSSProperties;
};

type Line = { start: number; end: number };
/**
 * Checks if `window` line overlaps with `object` line
 */
const doesOverlap = (window: Line, object: Line) =>
  window.start <= object.end && object.start <= window.end;

const SectionType = (<Section id="" />).type;
const STGComponent = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const {
      children,
      onScrolledToChange,
      orientation = "vertical",
      flipped = false,
      localScroll = false,
      id: _id,
      style,
      outerStyle,
    } = props;
    const uId = useId();
    const key = _id ?? uId;

    const {
      container,
      window: wind,
      sections,
      saveRef,
      lastUpdated,
    } = useContext(STGContext) as ISTGContext;

    /* ------------------------- Internal ref forwarding ------------------------ */
    useImperativeHandle(ref, () => container.current as HTMLDivElement);

    /* --------------------------- Children useEffect --------------------------- */
    /*useEffect(() => {
      const cObj = {} as { [k: string]: number | undefined | null };
      React.Children.forEach(children, (c) => {
        const child = c as React.ReactElement<SectionProps>;

        // Check if type is actually a Section component
        if (child.props.id) cObj[child.props.id] = 1;
      });

      // If child is removed, remove the ref
      const sObj = sections.current;
      if (sObj) {
        Object.keys(sObj).forEach((k) => {
          if (!cObj[k]) {
            saveRef(null, k);
          }
        });
      }
    }, [children]);*/

    /* -------------------------------------------------------------------------- */
    /*                          Scroll Tracking Behavior                          */
    /* -------------------------------------------------------------------------- */
    /* ---------------------- Currently Scrolled To Effect ---------------------- */
    const [scrolledTo, setScrolledTo] =
      useState<Parameters<NonNullable<typeof onScrolledToChange>>>();

    useEffect(() => {
      if (scrolledTo && onScrolledToChange) onScrolledToChange(...scrolledTo);
    }, [scrolledTo]);
    /* ----------------------------- On First Render ---------------------------- */
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
      // Is technically 'first' for us until refs are available
      if (isFirst) {
        if (
          container.current &&
          wind.current &&
          sections.current &&
          typeof document !== "undefined"
        ) {
          // Once refs are available, artificially trigger
          // scroll event to initialize scroll tracking
          window.dispatchEvent(new CustomEvent("scroll"));

          setIsFirst(false);
        }
      }
    });
    /* ----------------------------- Scroll Tracking ---------------------------- */
    useScrollPosition(
      ({ currPos }) => {
        if (sections.current && wind.current) {
          const axis = orientation === "vertical" ? "y" : "x";
          const axisEnd = orientation === "vertical" ? "bottom" : "right";
          const s = sections.current;
          let topMost: (SectionObj & { id: string }) | undefined;

          const wRect = currPos;
          const offset = {
            top: orientation === "vertical" ? wRect.top : wRect.left,
            btm: orientation === "vertical" ? wRect.bottom : wRect.right,
          };
          Object.entries(s).forEach(([id, section]) => {
            if (section) {
              const pos = section.position;

              if (
                doesOverlap(
                  { start: offset.top, end: offset.btm },
                  { start: pos[axis], end: pos[axisEnd] }
                )
              ) {
                // If this section's position is further up the page than current topMost section
                // or if topMost hasn't been set, set this section as topMost.
                if (
                  (topMost &&
                    (!flipped
                      ? pos[axis] < topMost.position[axis]
                      : pos[axis] > topMost.position[axis])) ||
                  !topMost
                ) {
                  topMost = { id, ...section };
                }
              }
            }
          });

          if (topMost) setScrolledTo([topMost.id, topMost.element]);
        }
      },
      [wind, flipped, orientation, lastUpdated],
      wind,
      undefined,
      undefined,
      localScroll ? container : undefined
    );
    /* ------------------------------------ * ----------------------------------- */
    /* --------------------------------- Render --------------------------------- */
    return (
      <div
        style={{ position: "relative", ...outerStyle }}
        key={`${key}.Container`}
      >
        <div key={key} ref={container} style={style}>
          {children}
        </div>
      </div>
    );
  }
);

// Wrap STG component in STGContextProvider
/**
 * The Container is what houses the `Window` and `Sections` of the ScrollTrackingGroup.
 * It's, well... the container.
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, ref) => {
    const { children, ...spread } = props;

    return (
      <STGContextProvider
        flipped={props.flipped}
        orientation={props.orientation}
        localScroll={props.localScroll}
      >
        <STGComponent ref={ref} {...spread}>
          {children}
        </STGComponent>
      </STGContextProvider>
    );
  }
);

export default Container;
