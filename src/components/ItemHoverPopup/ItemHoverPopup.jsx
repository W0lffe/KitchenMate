import ItemInspectView from "../ItemInspectView/ItemInspectView";
import { createPortal } from "react-dom";

export default function ItemHoverPopup({ item, position, isMobile }) {
  if (!item) return null;

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute", // absolute relative to body
        top: position.y,
        left: position.x,
        width: "fit-content",
        maxHeight: "220px",
        overflowY: "auto",
        border: "1px solid #ddd",
        padding: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        borderRadius: "10px",
        zIndex: 200,
      }}
    >
     <ItemInspectView itemToInspect={{recipe: item}} onlyDetails={true}/>
    </div>,
    isMobile ? document.getElementById("content-wrapper") : document.body
   
  );
}