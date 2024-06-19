import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import './style.css';
import Content from 'src/components/Content';
import Sider from 'src/components/Sider';
import { INIT_SIDER_W } from 'src/config/config';


export default function () {
  const [siderWidth, setSiderWidth] = useState(
    parseInt(localStorage.getItem('siderWidth')) || INIT_SIDER_W,
  );
  const [dragging, setDragging] = useState(false);
  const [siderMouseIsOver, setSiderMouseIsOver] = useState(false);
  const [startPageX, setStartPageX] = useState(0);

  const pxWidth = `${siderWidth}px`;

  const handleMouseDown = (event: MouseEvent) => {
    setStartPageX(event.pageX);
    setDragging(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    let currentSiderWidth = siderWidth + event.pageX - startPageX;
    currentSiderWidth <= INIT_SIDER_W ? currentSiderWidth = INIT_SIDER_W : currentSiderWidth = currentSiderWidth
    setSiderWidth(currentSiderWidth);
    setStartPageX(event.pageX);
  };

  const handleMouseUp = () => {
    setDragging(false);
    localStorage.setItem('siderWidth', siderWidth.toString());
  };

  const siderMouseOver = (e: MouseEvent) => {
    setSiderMouseIsOver(true)
  }

  const siderMouseOut = (e: MouseEvent) => {
    setSiderMouseIsOver(false)
  }

  return (
    <div className="layout" style={{ paddingLeft: pxWidth }}>
      <div
        className="sider"
        style={{ width: pxWidth }}
        onMouseOver={(e) => siderMouseOver(e)}
        onMouseOut={(e) => siderMouseOut(e)}
      >
        <Sider siderMouseIsOver={siderMouseIsOver} />
      </div>
      <div className="content">
        <Content />
      </div>
      <div
        className="sider-resizer"
        style={{ left: pxWidth }}
        onMouseDown={(e) => handleMouseDown(e)}
      >
        {dragging && (
          <div
            className="resize-mask"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={() => handleMouseUp()}
          />
        )}
      </div>
    </div>
  );
}
