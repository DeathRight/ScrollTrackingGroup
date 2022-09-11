import { useState, CSSProperties, useMemo } from "react";
import { ScrollTrackingGroup as STG } from "../../../ScrollTrackingGroup";
import { ContainerProps } from "../../../ScrollTrackingGroup/Container";
import LoremIpsum from "../Section/LoremIpsum";
import { InternalOutlined, Outlined } from "../Window/Window.stories";

export interface ExampleContainerProps extends ContainerProps {
  /**
   * (Storybook Specific)
   *
   * Changes the amount of `Sections` rendered within the `Container`
   */
  sections?: number;
  /**
   * (Storybook Specific)
   *
   * Changes the flex-direction of the `Container`'s div
   */
  flexDirection?: CSSProperties["flexDirection"];
}

/**
 * The Container is what houses the `Window` and `Sections` of the ScrollTrackingGroup.
 * It's, well... the container.
 */
const ExampleContainer = (props: ExampleContainerProps) => {
  const {
    sections = 1,
    flexDirection = "column",
    style,
    children,
    onScrolledToChange: _onSTC,
    ...args
  } = props;

  const [scrolledTo, setScrolledTo] = useState("");

  /* ------------------------- Styling for STG Section ------------------------ */
  const sectStyle: CSSProperties = {
    minWidth: "80vw",
  };
  /* ---------------------------- Sections Builder ---------------------------- */
  const sectionsArray = useMemo(() => {
    let array: JSX.Element[] = [];
    for (let i = 0; i < sections; i++) {
      const content = (
        <>
          <h1>This is Section {i}</h1>
          {/* `LoremIpsum` is the huge block of example text */}
          {LoremIpsum}
        </>
      );

      const sect = (
        <STG.Section id={`Section${i}`} style={sectStyle}>
          {content}
        </STG.Section>
      );

      array.push(sect);
    }
    return array;
  }, [sections]);

  /* --------------- Styling for currently scrolled to indicator -------------- */
  let stickyStyle: CSSProperties = {
    position: "sticky",
    backgroundColor: "whitesmoke",
    top: 0,
    left: 0,
    padding: "4px",
    width: "fit-content",
    zIndex: "999",
  };
  /* ------------------------ Styling for STG Container ----------------------- */
  let contStyle: CSSProperties = {
    // inline-flex necessary for `flex-direction: row` to work properly
    display: "inline-flex",
    flexDirection: flexDirection,
    minWidth: "100%",
    minHeight: "100%",
    marginTop: "2rem",
  };

  return (
    <>
      <div style={stickyStyle}>Currently scrolled to Section: {scrolledTo}</div>
      <STG.Container
        style={contStyle}
        onScrolledToChange={(id) => setScrolledTo(id)}
        {...args}
      >
        {/* `InternalOutlined` is the `Window/Outlined` story component */}
        <InternalOutlined {...Outlined.args} />
        {sectionsArray}
      </STG.Container>
    </>
  );
};

export default ExampleContainer;
