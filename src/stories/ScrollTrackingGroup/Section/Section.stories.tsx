import { ComponentMeta, ComponentStory } from "@storybook/react";
import Container from "../../../ScrollTrackingGroup/Container";
import Section from "../../../ScrollTrackingGroup/Section";
import LoremIpsum from "./LoremIpsum";

export default {
  component: Section,
  excludeStories: ["WithoutContext"],
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => {
  const { children, ...props } = args;
  return <Section {...props}>{children}</Section>;
};

export const WithLoremIpsum = Template.bind({});
WithLoremIpsum.decorators = [(Story) => <Container>{Story()}</Container>];
WithLoremIpsum.args = {
  id: "WithLoremIpsum",
  children: LoremIpsum,
};

export const WithoutContext = Template.bind({
  id: "WithLoremIpsumWithoutContext",
  children: WithLoremIpsum.args.children,
});
