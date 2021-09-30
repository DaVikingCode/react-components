import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import VirtualScroll from "../components/Virtualscroll";

export default {
  title: "Components/Virtualscroll",
  component: VirtualScroll,
} as ComponentMeta<typeof VirtualScroll>;

const VirtualscrollTemplate: ComponentStory<typeof VirtualScroll> = (args) => (
  <VirtualScroll {...args} />
);

let tab = new Array(50);
for (let i = 0; i < 50; i++) {
  tab[i] = "element number" + i;
}

export const VirtualscrollDefault = VirtualscrollTemplate.bind({});
VirtualscrollDefault.args = {
  loading: false,
  LoadingSplash: null,
  NoResultSplash: null,
  data: tab,
  itemHeight: 25,
  nbShown: 5,
  tolerance: 3,
  indexMin: 0,
  nbItems: tab.length,
  startIndex: 1,
  template: (args) => {
    <div>{args}</div>;
  },
};
