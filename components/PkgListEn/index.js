import React, { useState, useEffect } from "react";
import Popupv37 from "./Popup/";
import { fetchPackagesFromProduct } from "../data/productAdapter";

export default function PkgListV37(props) {
  const { productName, version, platform, arch, pkgType, jsonPath } = props;
  const [pkgs, setPkgs] = useState([]);
  const [popState, setPopState] = useState({ hidden: true, selectedPkg: null });
  const [pkgValue, setPkgValue] = useState({ pkgId: "", productName: "", pkgUrl: "" });

  useEffect(() => {
    (async () => {
      console.log("[PkgListV37] fetch params", { productName, version, platform, arch, pkgType, jsonPath });
      const list = await fetchPackagesFromProduct({ productName, version, platform, arch, pkgType, jsonPath });
      console.log("[PkgListV37] adapter returned", list?.length, list?.slice?.(0, 5));
      setPkgs(list || []);
    })();
  }, [productName, version, platform, arch, pkgType, jsonPath]);

  function openPopupFor(pkg) {
    console.log("[PkgListV37] clicked pkg", pkg);
    setPopState({ hidden: false, selectedPkg: pkg });
    setPkgValue({
      pkgId: pkg.id,
      productName: productName,
      pkgUrl: pkg.url || pkg['download-url'] || pkg['download_url'] || ""
    });
  }

  function closePopup() {
    setPopState({ hidden: true, selectedPkg: null });
    setPkgValue({ pkgId: "", productName: "", pkgUrl: "" });
  }

  console.log('[PkgListV37] popState=', popState, 'pkgValue=', pkgValue);

  return (
    <div id="server-packageList" className="package-list">
      <Popupv37
        hidden={popState.hidden}
        productName={productName}
        path={popState.selectedPkg ? (popState.selectedPkg.url || popState.selectedPkg['download-url'] || popState.selectedPkg['download_url']) : pkgValue.pkgUrl}
        lang={(typeof navigator !== 'undefined' && navigator.language) ? navigator.language.split('-')[0] : 'en'}
        pfn={closePopup}
      />
      <ul>
        {pkgs.map((pkg) => (
          <li key={pkg.id || pkg.url}>
            <a
              href={pkg.url || "#!"}
              onClick={(e) => { e.preventDefault(); openPopupFor(pkg); }}
            >
              {pkg.name} {pkg.size ? `(${pkg.size})` : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}