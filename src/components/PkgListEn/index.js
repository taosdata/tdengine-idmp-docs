import { useEffect, useMemo, useState } from "react";
import Popup from "../PopupEn";
import styles from "./styles.module.css";

const REMOTE_URL = "https://tdengine.com/wp-content/themes/tdengine/js/product-data.json";
const PHP_ENDPOINT = "https://tdengine.com/assets/globalscripts/generatelink_v3_download_center.php";

export default function PkgList({
    productName,
    version: versionProp,
    platform
}) {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        fetch(REMOTE_URL)
            .then((r) => r.json())
            .then(setData)
            .catch((e) => {
                console.error(e);
                setData([]);
            });
    }, []);

    const pkgs = useMemo(() => {
        const product = data.find((p) => p?.name === productName);
        const pkgVersion = versionProp || product?.filters?.versions[0];
        const all = product?.versions || [];
        const matchedVersions = all.filter(
            (v) =>
                v?.version === pkgVersion &&
                v?.platform === platform
        );
        const seen = new Set();
        return matchedVersions.filter((v) => {
            const url = v?.["download-url"];
            if (seen.has(url)) return false;
            seen.add(url);
            return true;
        });
    }, [data, productName, versionProp, platform]);

    const openPopup = (pkg) => {
        setSelectedPackage({
            downloadLink: pkg["download-url"],
            productName: productName,
            version: pkg.version
        });
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setSelectedPackage(null);
    };

    const handlePopupSubmit = async (formValues) => {
        const fd = new FormData();
        Object.entries({
            email: formValues.email,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phone: formValues.phone || "",
            company: formValues.company,
            path: selectedPackage.downloadLink,
            pkg: selectedPackage.productName,
            version: selectedPackage.version
        }).forEach(([k, v]) => fd.append(k, v ?? ""));

        const res = await fetch(PHP_ENDPOINT, {
            method: "POST",
            body: fd,
        });

        const data = await res.json();

        if (data[0]?.status !== "Success") {
            throw new Error(data?.[0]?.message || "Submission failed");
        }

        return data;
    };

    return (
        <>
            <ul>
                {pkgs.map((p, idx) => (
                    <li key={p['download-url']} >
                        <button className={styles.packageItem} onClick={() => openPopup(p)}>{p.name} ({p.size})</button>
                    </li>
                ))}
            </ul>
            {isOpen && (<Popup onClose={closePopup} onSubmit={handlePopupSubmit} />)}
        </>
    );
}
