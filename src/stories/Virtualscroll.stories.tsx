import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NoResultIcon from "../assets/no_result.svg";
import DataLoadingIcon from "../assets/data_loading.svg";
import VirtualScroll from "../components/Virtualscroll";
import { SplashHint } from "../components";

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
  LoadingSplash: (
    <SplashHint
      Img={<img src={DataLoadingIcon} />}
      headline="Les données arrivent..."
      subline="Soyez patient :)"
    />
  ),
  NoResultSplash: (
    <SplashHint
      Img={<img src={NoResultIcon} />}
      headline="Aucun résultat..."
      subline="Peut être avec d'autre mot clef ?"
    />
  ),
  data: tab,
  itemHeight: 50,
  nbShown: 5,
  tolerance: 3,
  indexMin: 0,
  nbItems: tab.length,
  startIndex: 1,
  template: (args) => {
    return <div>{args}</div>;
  },
};
