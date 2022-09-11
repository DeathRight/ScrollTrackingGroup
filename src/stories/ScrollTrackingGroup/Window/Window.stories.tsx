import { ComponentMeta, ComponentStory } from "@storybook/react";
import Container from "../../../ScrollTrackingGroup/src/Container";
import Window from "../../../ScrollTrackingGroup/src/Window";
import { WithLoremIpsum, WithoutContext } from "../Section/Section.stories";

export default {
  component: Window,
  excludeStories: ["InternalOutlined"],
  argTypes: {
    offset: {
      defaultValue: "15vh",
      table: {
        defaultValue: {
          summary: "15(vw/vh)",
          detail:
            "15vh if `orientation` is vertical or 15vw if `orientation` is horizontal",
        },
      },
    },
    size: {
      defaultValue: "15vh",
      table: {
        defaultValue: {
          summary: "15(vw/vh)",
          detail:
            "15vh if `orientation` is vertical or 15vw if `orientation` is horizontal",
        },
      },
    },
  },
} as ComponentMeta<typeof Window>;

const Template: ComponentStory<typeof Window> = (args) => (
  <Container>
    <Window {...args} />
    <WithoutContext
      id={WithLoremIpsum.args!.id!}
      children={WithLoremIpsum.args!.children!}
    />
  </Container>
);

export const Base = Template.bind({});

export const Outlined = Template.bind({});
Outlined.args = {
  style: { visibility: "visible", outline: "limegreen solid 2px" },
};
Outlined.parameters = {
  docs: {
    description: {
      story:
        "The Window has been set to visible and with an outline so you can see where it is. Open this Story's `Canvas` in a new tab and resize until it scrolls to see the default behavior.",
    },
  },
};

const InternalTemplate: ComponentStory<typeof Window> = (args) => (
  <Window {...args} />
);
export const InternalOutlined = InternalTemplate.bind(Outlined.args);
