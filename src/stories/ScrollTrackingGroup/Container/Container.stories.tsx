import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import ExampleContainer from "./ExampleContainer";
import ExampleContainerCode from "./ExampleContainer.code";

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

export const Introduction = Template.bind({});
Introduction.parameters = {
  docs: {
    source: {
      code: `${ExampleContainerCode}`,
      language: "ts",
    },
    description: {
      story:
        "The ***source code*** for this story shows you the wrapper `ExampleContainer` component built for the next stories. \nThe `ExampleComponent` is a good example of a normal flexbox use case for the `ScrollTrackingGroup` as a whole, and features a couple of *Storybook specific* properties.",
    },
  },
};

export const Vertical = Template.bind({});
Vertical.args = { sections: 6 };
Vertical.parameters = {
  docs: {
    description: {
      story:
        "Here, we have a default, simple vertical `Container` with 6 `Sections` loaded. \nThis is standard behavior that would work without the `ExampleContainer` boilerplate from `Introduction`'s source code.",
    },
  },
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  sections: 6,
  flexDirection: "row",
  orientation: "horizontal",
};
Horizontal.parameters = {
  docs: {
    description: {
      story:
        "This time, we have a bit more complex ***horizontal*** `Container` with 6 `Sections` loaded. \nThis does require a bit of boilerplate, so make sure to check out the `Introduction` story's **source code**!",
    },
  },
};
