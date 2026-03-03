import ItemInspectView from "../ItemInspectView/ItemInspectView";
import {popupStyle }from "./ItemHoverPopupStyles.js"
import { createPortal } from "react-dom";


/**
 * ItemHoverPopup component renders a popup displaying detailed information
 * about a recipe item next to a given position on the screen.
 * The popup uses React Portals to render either into the mobile dialog
 * or into the body for desktop.
 *
 * @param {Object} props - Component props
 * @param {Object} props.item - The recipe item to display; if null, the popup is not rendered
 * @param {Object} props.position - The { x, y } coordinates to position the popup
 * @param {boolean} props.isMobile - Whether the device is mobile; determines the portal target
 *
 * @returns {React.ReactPortal|null} A portal containing the popup, or null if no item
 */
export default function ItemHoverPopup({ item, position, isMobile }) {
  if (!item) return null;

  //console.log("Popup position:", position);

  return createPortal(
    <div
      onClick={(e) => e.stopPropagation()}
      className={popupStyle}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
     <ItemInspectView itemToInspect={{recipe: item}} onlyDetails={true}/>
    </div>,
    isMobile ? document.getElementById("active-dialog") : document.body
   
  );
}