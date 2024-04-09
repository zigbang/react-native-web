/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import canUseDOM from '../../modules/canUseDom';

export type ModalPortalProps = {|
  children: any
|};

function ModalPortal(props: ModalPortalProps): React.Node {
  console.log("dddd portal called")
  const { children } = props;
  const elementRef = React.useRef(null);

  console.log("dddd1", children, elementRef)

  if (canUseDOM && !elementRef.current) {
    console.log("dddd2", canUseDOM, elementRef.current)
    const element = document.createElement('div');

    if (element && document.body) {
      console.log("dddd3", element, document.body)
      document.body.appendChild(element);
      elementRef.current = element;
    }
  }

  React.useEffect(() => {
    if (canUseDOM) {
      return () => {
        console.log("dddd4", document.body, elementRef.current)
        if (document.body && elementRef.current) {
          document.body.removeChild(elementRef.current);
          elementRef.current = null;
        }
      };
    }
  }, []);

  return elementRef.current && canUseDOM
    ? ReactDOM.createPortal(children, elementRef.current)
    : null;
}

export default ModalPortal;
