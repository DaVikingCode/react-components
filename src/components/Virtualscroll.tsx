import React, { FC, ReactNode, useEffect, useState } from "react";

export interface VirtualScrollerProps {
  loading: boolean;
  itemHeight: number;
  nbShown: number;
  tolerance: number;
  indexMin: number;
  nbItems: number;
  startIndex: number;
  LoadingSplash: ReactNode;
  NoResultSplash: ReactNode;
  data: any[];
  template: (...args: any[]) => {};
}

export const VirtualScroll: FC<VirtualScrollerProps> = ({
  loading,
  LoadingSplash,
  NoResultSplash,
  data,
  itemHeight,
  nbShown,
  tolerance,
  indexMin,
  nbItems,
  startIndex,
  template,
}) => {
  const viewportHeight = nbShown * itemHeight;
  const bufferedItems = nbShown + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - indexMin;
  const totalHeight = (nbItems - indexMin) * itemHeight;
  const [topPaddingHeight, setTopPaddingHeight] = useState(
    itemsAbove * itemHeight
  );
  const [bottomPaddingHeight, setBottomPaddingHeight] = useState(
    totalHeight - topPaddingHeight - bufferedItems * itemHeight
  );
  const [res, setRes] = useState<ReactNode[]>([]);

  const formateData = (data: any[]) => {
    const node = new Array<ReactNode>(data.length);
    for (let i = 0; i < data.length; i++) {
      node[i] = <li key={i}>{template(data[i])}</li>;
    }
    setRes(node);
  };

  const runScroller = (e: any) => {
    const scrollTop = e ? e.target.scrollTop : 0;
    const index = indexMin + Math.floor(scrollTop / itemHeight);
    setTopPaddingHeight(Math.max((index - indexMin) * itemHeight, 0));
    if (data) {
      // set the starting index to not slice too far on the data array
      let startIndex =
        index > data.length - Math.ceil(nbShown / 2)
          ? data.length - Math.ceil(nbShown / 2)
          : index;

      const newItems = data.slice(startIndex, startIndex + bufferedItems);
      setBottomPaddingHeight(
        Math.max(
          totalHeight - topPaddingHeight - newItems.length * itemHeight,
          0
        )
      );
      formateData(newItems);
    } else {
      setBottomPaddingHeight(totalHeight);
    }
  };

  useEffect(() => {
    if (data) {
      formateData(data.slice(0, bufferedItems));
      setBottomPaddingHeight(totalHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return <>{LoadingSplash}</>;
  }

  //@ts-ignore
  return res && res.length > 0 ? (
    <div
      onScroll={runScroller}
      style={{
        height: viewportHeight,
        overflowY: "auto",
        overflowAnchor: "none",
        listStyle: "none",
      }}
    >
      <div style={{ height: topPaddingHeight }} />
      {res}
      <div style={{ height: bottomPaddingHeight }} />
    </div>
  ) : (
    <>{NoResultSplash}</>
  );
};

export default VirtualScroll;
