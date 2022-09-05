import { useState, CSSProperties, useMemo } from "react";
import Container, {
  ContainerProps,
} from "../../../ScrollTrackingGroup/Container";
import LoremIpsum from "../Section/LoremIpsum";
import { WithoutContext } from "../Section/Section.stories";
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

  const sectStyle: CSSProperties = {
    flex: "1 0 auto",
  };
  const sectionsArray = useMemo(() => {
    let array: JSX.Element[] = [];
    for (let i = 0; i < sections; i++) {
      const content = (
        <>
          <h1>This is Section {i}</h1>
          {LoremIpsum}
        </>
      );
      const sect = (
        <WithoutContext id={`Section${i}`} style={sectStyle}>
          {content}
        </WithoutContext>
      );
      array.push(sect);
    }
    return array;
  }, [sections]);

  let stickyStyle: CSSProperties = {
    position: "fixed",
    backgroundColor: "whitesmoke",
    top: 0,
    padding: "4px",
    visibility: "visible",
  };
  let contStyle: CSSProperties = {
    minWidth: "100%",
    minHeight: "100%",
  };
  let innerStyle: CSSProperties = {
    minWidth: "100%",
    minHeight: "100%",
    width: "fit-content",
    height: "fit-content",
  };
  let sectContStyle: CSSProperties = {
    display: "flex",
    flexDirection: flexDirection,
    minWidth: "100%",
    minHeight: "100%",
  };

  return (
    <Container
      outerStyle={contStyle}
      style={innerStyle}
      onScrolledToChange={(id) => setScrolledTo(id)}
      {...args}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          visibility: "hidden",
        }}
      >
        <div style={stickyStyle}>
          Currently scrolled to Section: {scrolledTo}
        </div>
      </div>
      <InternalOutlined {...Outlined.args} />
      <div style={sectContStyle}>{sectionsArray}</div>
    </Container>
  );
};

export default ExampleContainer;
