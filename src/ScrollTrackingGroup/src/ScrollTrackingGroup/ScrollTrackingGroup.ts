import Container from "../Container";
import Section from "../Section";
import Window from "../Window";

/**
 * Tracks a group of `Sections` (divs) so that when a Section is scrolled into the `Window`
 *      it is seen as the current Section and fires `onScrolledToChange`.
 * ---
 * **This is the subcomponent object:** It is not a component itself, but a group of the STG components.
 * ```
 * <ScrollTrackingGroup.Container>
 *    <ScrollTrackingGroup.Window />
 *    <ScrollTrackingGroup.Section>
 *      {...}
 *    <ScrollTrackingGroup.Section />
 * <ScrollTrackingGroup.Container />
 * ```
 */
export default { Container, Section, Window };
