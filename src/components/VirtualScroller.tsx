import { debounce } from "lodash";
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface VirtualScrollerProps {
  data: (...arg: any) => [];
  loading: boolean;
  itemHeight: number;
  amount: number;
  tolerance: number;
  minIndex: number;
  nbItems: number;
  startIndex: number;
  LoadingSplash: ReactNode;
  NoResultSplash: ReactNode;
  Skeleton: ReactNode;
}

export const VirtualScroll: FC<VirtualScrollerProps> = ({
  loading,
  LoadingSplash,
  NoResultSplash,
  Skeleton,
  data,
  itemHeight,
  amount,
  tolerance,
  minIndex,
  nbItems,
  startIndex,
}) => {
  const numberItem = useRef(0);
  numberItem.current = nbItems;

  //@ts-ignore
  const fctData = useRef((...args: any[]) => {});
  fctData.current = data;

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
  const [res, setRes]: any[] = useState([]);

  const setMargin = (index: number) => {
    setTopPaddingHeight(Math.max((index - minIndex) * itemHeight, 0));
    setBottomPaddingHeight(
      Math.max(totalHeight - topPaddingHeight - res.length * itemHeight, 0)
    );
  };

  const genData = async (index: number) => {
    if (numberItem.current !== 0) {
      setRes(
        await fctData.current(
          index,
          bufferedItems,
          minIndex,
          numberItem.current
        )
      );
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGenData = useCallback(debounce(genData, 666), []);

  const runScroller = (e: any) => {
    const scrollTop = e ? e.target.scrollTop : 0;
    const index =
      minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    setMargin(index);

    var nbSkeleton = amount;
    if (amount > nbItems) {
      nbSkeleton = nbItems;
    }

    const res = new Array(nbSkeleton);
    for (let i = 0; i < nbSkeleton; i++) {
      res[i] = Skeleton;
    }
    setRes(res);

    debounceGenData(index);
  };

  useEffect(() => {
    if (!initialPosition) {
      genData(0);
    } else {
      var scrollPos = initialPosition;
      if (initialPosition > nbItems * 65) {
        scrollPos = 0;
      }
      $(".scroller").scrollTop(scrollPos);
    }
  }, [data]);

  if (loading) {
    return <>{LoadingSplash}</>;
  }
  return res && res.length > 0 ? (
    <div
      onScroll={runScroller}
      style={{
        height: viewportHeight,
        overflowY: "auto",
        overflowAnchor: "none",
      }}
      className="scroller"
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
