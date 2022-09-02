import { useMemo } from "@storybook/addons";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import { CSSProperties, useState } from "react";
import Container, {
  ContainerProps,
} from "../../../ScrollTrackingGroup/Container";
import Section from "../../../ScrollTrackingGroup/Section";
import Window from "../../../ScrollTrackingGroup/Window";
import LoremIpsum from "../Section/LoremIpsum";
import { WithoutContext } from "../Section/Section.stories";
import { InternalOutlined, Outlined } from "../Window/Window.stories";
import ExampleContainer from "./ExampleContainer";

export default {
  component: ExampleContainer,
  argTypes: {
    orientation: {
      defaultValue: "vertical",
      table: { defaultValue: { summary: "vertical" } },
    },
    flipped: {
      defaultValue: false,
      table: { defaultValue: { summary: false } },
    },
    localScroll: {
      defaultValue: false,
      table: { defaultValue: { summary: false } },
    },
    id: { table: { defaultValue: { summary: "From `React.useId()`" } } },
    flexDirection: {
      options: ["column", "column-reverse", "row", "row-reverse"],
      defaultValue: "column",
    },
    sections: {
      defaultValue: 1,
    },
  },
} as ComponentMeta<typeof ExampleContainer>;

const Template: ComponentStory<typeof ExampleContainer> = (args) => (
  <ExampleContainer {...args} />
);
export const Base = Template.bind({});

export const Vertical = Template.bind({});
Vertical.args = { sections: 6 };
