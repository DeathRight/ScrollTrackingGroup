import Container from "../Container";
import Section from "../Section";
import Window from "../Window";

// Mimic React's subcomponent architecture for exporting
// so we can use both <ScrollTrackingGroup>
// and <ScrollTrackingGroup.Section>
type ScrollTrackingGroupHOC = typeof Container & {
  Section: typeof Section;
  Window: typeof Window;
};

/**
 * Tracks a group of `Sections` (divs) so that when a Section is scrolled into the `Window`
 *      it is seen as the current Section and fires `onScrolledToChange`.
 *---
 * **This is the subcomponent architecture:** Container as main component, and Section/Window as subcomponents
 * ```
 * <ScrollTrackingGroupHOC>
 *    <ScrollTrackingGroupHOC.Window />
 *    <ScrollTrackingGroupHOC.Section>
 *      {...}
 *    <ScrollTrackingGroupHOC.Section />
 * <ScrollTrackingGroupHOC />
 * ```
 */
export default {
  ...Container,
  Section,
  Window,
} as ScrollTrackingGroupHOC;
