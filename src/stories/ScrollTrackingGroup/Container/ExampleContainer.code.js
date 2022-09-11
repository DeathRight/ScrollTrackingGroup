export default 'import { useState, CSSProperties, useMemo } from "react";\n' +
  'import { ScrollTrackingGroup as STG } from "../../../ScrollTrackingGroup";\n' +
  'import { ContainerProps } from "../../../ScrollTrackingGroup/Container";\n' +
  'import LoremIpsum from "../Section/LoremIpsum";\n' +
  'import { InternalOutlined, Outlined } from "../Window/Window.stories";\n' +
  "\n" +
  "export interface ExampleContainerProps extends ContainerProps {\n" +
  "  /**\n" +
  "   * (Storybook Specific)\n" +
  "   *\n" +
  "   * Changes the amount of `Sections` rendered within the `Container`\n" +
  "   */\n" +
  "  sections?: number;\n" +
  "  /**\n" +
  "   * (Storybook Specific)\n" +
  "   *\n" +
  "   * Changes the flex-direction of the `Container`'s div\n" +
  "   */\n" +
  '  flexDirection?: CSSProperties["flexDirection"];\n' +
  "}\n" +
  "\n" +
  "/**\n" +
  " * The Container is what houses the `Window` and `Sections` of the ScrollTrackingGroup.\n" +
  " * It's, well... the container.\n" +
  " */\n" +
  "const ExampleContainer = (props: ExampleContainerProps) => {\n" +
  "  const {\n" +
  "    sections = 1,\n" +
  '    flexDirection = "column",\n' +
  "    style,\n" +
  "    children,\n" +
  "    onScrolledToChange: _onSTC,\n" +
  "    ...args\n" +
  "  } = props;\n" +
  "\n" +
  '  const [scrolledTo, setScrolledTo] = useState("");\n' +
  "\n" +
  "  /* ------------------------- Styling for STG Section ------------------------ */\n" +
  "  const sectStyle: CSSProperties = {\n" +
  '    minWidth: "80vw",\n' +
  "  };\n" +
  "  /* ---------------------------- Sections Builder ---------------------------- */\n" +
  "  const sectionsArray = useMemo(() => {\n" +
  "    let array: JSX.Element[] = [];\n" +
  "    for (let i = 0; i < sections; i++) {\n" +
  "      const content = (\n" +
  "        <>\n" +
  "          <h1>This is Section {i}</h1>\n" +
  "          {/* `LoremIpsum` is the huge block of example text */}\n" +
  "          {LoremIpsum}\n" +
  "        </>\n" +
  "      );\n" +
  "\n" +
  "      const sect = (\n" +
  "        <STG.Section id={`Section${i}`} style={sectStyle}>\n" +
  "          {content}\n" +
  "        </STG.Section>\n" +
  "      );\n" +
  "\n" +
  "      array.push(sect);\n" +
  "    }\n" +
  "    return array;\n" +
  "  }, [sections]);\n" +
  "\n" +
  "  /* --------------- Styling for currently scrolled to indicator -------------- */\n" +
  "  let stickyStyle: CSSProperties = {\n" +
  '    position: "sticky",\n' +
  '    backgroundColor: "whitesmoke",\n' +
  "    top: 0,\n" +
  "    left: 0,\n" +
  '    padding: "4px",\n' +
  '    width: "fit-content",\n' +
  '    zIndex: "999",\n' +
  "  };\n" +
  "  /* ------------------------ Styling for STG Container ----------------------- */\n" +
  "  let contStyle: CSSProperties = {\n" +
  "    // inline-flex necessary for `flex-direction: row` to work properly\n" +
  '    display: "inline-flex",\n' +
  "    flexDirection: flexDirection,\n" +
  '    minWidth: "100%",\n' +
  '    minHeight: "100%",\n' +
  '    marginTop: "2rem",\n' +
  "  };\n" +
  "\n" +
  "  return (\n" +
  "    <>\n" +
  "      <div style={stickyStyle}>Currently scrolled to Section: {scrolledTo}</div>\n" +
  "      <STG.Container\n" +
  "        style={contStyle}\n" +
  "        onScrolledToChange={(id) => setScrolledTo(id)}\n" +
  "        {...args}\n" +
  "      >\n" +
  "        {/* `InternalOutlined` is the `Window/Outlined` story component */}\n" +
  "        <InternalOutlined {...Outlined.args} />\n" +
  "        {sectionsArray}\n" +
  "      </STG.Container>\n" +
  "    </>\n" +
  "  );\n" +
  "};\n" +
  "\n" +
  "export default ExampleContainer;\n" +
  "\n";
