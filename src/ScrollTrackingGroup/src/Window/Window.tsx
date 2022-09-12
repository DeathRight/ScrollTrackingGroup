import React from "react";
import { useId, useContext, useMemo, CSSProperties } from "react";
import STGContext, { ISTGContext } from "../STGContextProvider/STGContext";

export type WindowProps = {
  /**
   * `CSS position string` that the Window's position will be offset from the
   * orientation-based side of the STG Container.
   *
   * The side is `top/left` for `vertical/horizontal` orientation respectively,
   * and `bottom/right` respectively if `flipped`.
   *
   * @defaultValue `'15(vw/vh)'`
   */
  offset?: string;
  /**
   * `CSS size string` that the Window's axis will use.
   *
   * The axis is `height` if orientation is `vertical`,
   * or `width` if orientation is `horizontal`.
   *
   * Note: The cross-axis size will always be '100%'.
   *
   * @defaultValue `'15(vw/vh)'`
   */
  size?: string;
  id?: string;
  /**
   * Used to overwrite the initial style properties.
   *
   * __NOTE:__ You should not change sizing (width/height)!
   * Therefore, all sizing properties are omitted.
   *
   * ---
   *
   * By default Window has the following style:
   * ```
   * {
   *  position: "sticky",
   *  visibility: "hidden",
   * }
   * ```
   */
  style?: Omit<
    CSSProperties,
    "width" | "height" | "minWidth" | "minHeight" | "maxWidth" | "maxHeight"
  >;
};
type WindowSide = "top" | "bottom" | "left" | "right";

/**
 * The Window dictates the sweet spot in the viewport for `Sections` to overlap with in order to be set as
 *    the currently scrolled to Section and fire `onScrolledToChange`.
 */
const Window = (props: WindowProps) => {
  const { offset = "15vh", size, id, style: _style } = props;
  const uId = useId();
  const key = id ?? uId;
  //const innerRef = useRef<HTMLDivElement | undefined | null>(null);

  const { orientation, flipped, saveRef } = useContext(
    STGContext
  ) as ISTGContext;
  const side: WindowSide = useMemo(() => {
    let s: WindowSide = orientation === "vertical" ? "top" : "left";
    if (flipped) s = s === "top" ? "bottom" : "right";

    return s;
  }, [orientation, flipped]);

  const StickyWindow = useMemo(() => {
    const s: CSSProperties = {
      position: "sticky",
      visibility: "hidden",
    };
    s[side] = orientation === "vertical" ? offset : "15vw";

    if (side === "top" || side === "bottom") {
      // Vertical orientation
      s.width = "100%";
      s.height = size ?? "15vh";
    } else {
      // Horizontal orientation
      s.height = "100%";
      s.width = size ?? "15vw";
    }

    return (
      <div
        key={key}
        ref={(e) => {
          if (e) saveRef(e, "STG.Window");
        }}
        style={{ ...s, ..._style }}
      />
    );
  }, [side, size, _style]);

  const flexD = `${orientation === "vertical" ? "column" : "row"}${
    flipped ? "-reverse" : ""
  }`;

  return (
    <div
      key={`${key}.Container`}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        visibility: "hidden",
        display: "flex",
        flexDirection: flexD as any,
      }}
    >
      {StickyWindow}
    </div>
  );
};

export default Window;
