import { debounce } from "lodash";
import React, {
  FC,
  ReactNode,
  ReactNodeArray,
  useEffect,
  useState,
} from "react";

export interface VirtualScrollerProps {
  data: ReactNodeArray;
  loading: boolean;
  itemHeight: number;
  amount: number;
  tolerance: number;
  minIndex: number;
  nbItems: number;
  startIndex: number;
  LoadingSplash: ReactNode;
  NoResultSplash: ReactNode;
}

export const VirtualScroll: FC<VirtualScrollerProps> = ({
  loading,
  LoadingSplash,
  NoResultSplash,
  data,
  itemHeight,
  amount,
  tolerance,
  minIndex,
  nbItems,
  startIndex,
}) => {
  const viewportHeight = amount * itemHeight;
  const totalHeight = (nbItems - minIndex + 1) * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferedItems = amount + 2 * tolerance;
  const itemsAbove = startIndex - tolerance - minIndex;
  const [topPaddingHeight, setTopPaddingHeight] = useState(
    itemsAbove * itemHeight
  );
  const [bottomPaddingHeight, setBottomPaddingHeight] = useState(
    totalHeight - topPaddingHeight
  );
  const initialPosition = topPaddingHeight + toleranceHeight;
  const [res, setRes] = useState([]);

  //@ts-ignore
  const genData = (e) => {
    const scrollTop = e ? e.target.scrollTop : 0;
    console.log(scrollTop);
    if (nbItems !== 0) {
      const index =
        minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
      //@ts-ignore
      setRes(data(index, bufferedItems, minIndex, nbItems));
      setTopPaddingHeight(Math.max((index - minIndex) * itemHeight, 0));
      setBottomPaddingHeight(
        Math.max(totalHeight - topPaddingHeight - res.length * itemHeight, 0)
      );
    }
  };

  const runScroller = debounce(genData, 50);

  useEffect(() => {
    if (!initialPosition) {
      genData(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return <>{LoadingSplash}</>;
  }
  return res && res.length > 0 ? (
    <div
      onScroll={runScroller}
      style={{
        height: viewportHeight,
        overflowY: "scroll",
        overflowAnchor: "none",
      }}
    >
      <div style={{ height: topPaddingHeight }} id="becaglacon" />
      {res}
      <div style={{ height: bottomPaddingHeight }} />
    </div>
  ) : (
    <>{NoResultSplash}</>
  );
};

export default VirtualScroll;
