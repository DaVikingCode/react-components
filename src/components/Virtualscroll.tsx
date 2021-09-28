import { debounce } from "lodash";
import React, {
  FC,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useEffect,
  useState,
} from "react";

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
  data: ReactNodeArray;
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
}) => {
  const viewportHeight = nbShown * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferedItems = nbShown + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - indexMin;
  const totalHeight = (nbItems - indexMin) * itemHeight;
  const [topPaddingHeight, setTopPaddingHeight] = useState(
    itemsAbove * itemHeight
  );
  const [bottomPaddingHeight, setBottomPaddingHeight] = useState(
    totalHeight - topPaddingHeight - bufferedItems * itemHeight
  );
  const initialPosition = topPaddingHeight + toleranceHeight;
  const [res, setRes] = useState<ReactNode[]>([]);

  const runScroller = (e: any) => {
    const scrollTop = e ? e.target.scrollTop : 0;
    const index = indexMin + Math.floor(scrollTop / itemHeight);
    setTopPaddingHeight(Math.max((index - indexMin) * itemHeight, 0));
    if (data) {
      setBottomPaddingHeight(
        Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)
      );
      const newItems = data.slice(index, index + bufferedItems);
      setRes(newItems);
    } else {
      setBottomPaddingHeight(totalHeight);
    }
  };

  useEffect(() => {
    if (!initialPosition && data) {
      setRes(data.slice(0, bufferedItems));
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
