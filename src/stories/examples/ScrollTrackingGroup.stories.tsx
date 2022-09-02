import { ComponentMeta } from "@storybook/react";
import {
  ScrollTrackingGroup,
  ScrollTrackingGroupHOC,
} from "../../ScrollTrackingGroup";
import Container from "../../ScrollTrackingGroup/Container";
import Section from "../../ScrollTrackingGroup/Section";
import Window from "../../ScrollTrackingGroup/Window";

export default {
  title: "Example/ScrollTrackingGroup",
  component: ScrollTrackingGroupHOC,
  subcomponents: { Container, Window, Section },
} as ComponentMeta<typeof ScrollTrackingGroup.Container>;
