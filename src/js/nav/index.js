import setupScroll from './scroll';
import setupNav from './nav';

export default function() {
  const scrollOffset = 30;
  setupScroll(scrollOffset);
  setupNav(scrollOffset);
}
