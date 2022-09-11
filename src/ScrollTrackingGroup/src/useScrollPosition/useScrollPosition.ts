import { useRef, DependencyList, MutableRefObject } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/*
  DeathRight: Updated mainly to include full DOMRect positions.
*/
export interface IPosition extends Omit<DOMRect, 'toJSON' | 'width' | 'height'> {
  toJSON?: any;
  width?: number;
  height?: number;
}

export interface IScrollProps {
  prevPos: IPosition;
  currPos: IPosition;
}

export type ElementRef = MutableRefObject<HTMLElement | undefined | null>;

const isBrowser = typeof window !== 'undefined';
const zeroPosition: IPosition = {
  x: 0,
  left: 0,
  y: 0,
  top: 0,
  bottom: 0,
  right: 0,
};

const getClientRect = (element?: HTMLElement) => element?.getBoundingClientRect();

const getScrollPosition = ({
  element,
  useWindow,
  boundingElement,
}: {
  element?: ElementRef;
  boundingElement?: ElementRef;
  useWindow?: boolean;
}) => {
  if (!isBrowser) {
    return zeroPosition;
  }

  if (useWindow) {
    return {
      x: window.scrollX,
      y: window.scrollY,
      left: window.scrollX,
      top: window.scrollY,
      right: window.scrollX,
      bottom: window.scrollY,
    };
  }

  const targetPosition = getClientRect(element?.current || document.body);
  const containerPosition = getClientRect(boundingElement?.current ?? undefined);

  if (!targetPosition) {
    return zeroPosition;
  }

  // Final returns
  if (containerPosition) {
    const ret = {
      x: (containerPosition.x || 0) - (targetPosition.x || 0),
      y: (containerPosition.y || 0) - (targetPosition.y || 0),
      bottom: (containerPosition.bottom || 0) - (targetPosition.bottom || 0),
      right: (containerPosition.right || 0) - (targetPosition.right || 0),
    };
    // Reduce calculations, as left/top should be equal to x/y
    return {
      ...ret,
      left: ret.x,
      top: ret.y,
    };
  }
  // Else
  const p = targetPosition;
  return {
    x: p.x,
    left: p.left,
    y: p.y,
    top: p.top,
    right: p.right,
    bottom: p.bottom,
  };
};

export const useScrollPosition = (
  effect: (props: IScrollProps) => void,
  deps?: DependencyList,
  element?: ElementRef,
  useWindow?: boolean,
  wait?: number,
  boundingElement?: ElementRef
): void => {
  const position = useRef(getScrollPosition({ useWindow, boundingElement }));

  let throttleTimeout: number | null = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow, boundingElement });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = window.setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    if (boundingElement) {
      boundingElement.current?.addEventListener('scroll', handleScroll, { passive: true });
      boundingElement.current?.addEventListener('resize', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
    }

    return () => {
      if (boundingElement) {
        boundingElement.current?.removeEventListener('scroll', handleScroll);
        boundingElement.current?.removeEventListener('resize', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      }

      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, deps);
};

useScrollPosition.defaultProps = {
  deps: [],
  element: false,
  useWindow: false,
  wait: null,
  boundingElement: false,
};
