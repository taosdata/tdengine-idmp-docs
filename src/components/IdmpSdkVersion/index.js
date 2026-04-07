import { useEffect, useMemo, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function IdmpSdkVersion() {
  const { i18n } = useDocusaurusContext();
  const REMOTE_URL =
    i18n.currentLocale === "en"
      ? "https://tdengine.com/wp-content/themes/tdengine/js/product-data.json"
      : "https://www.taosdata.com/wp-content/themes/tdengine/js/product-data.json";

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(REMOTE_URL)
      .then((r) => r.json())
      .then(setData)
      .catch((e) => {
        console.error(e);
        setData([]);
      });
  }, []);

  const version = useMemo(() => {
    const product = data.find((p) => p?.name === "TDengine IDMP-Enterprise SDK");
    return product?.filters?.versions?.[0] ?? "{{VERSION}}";
  }, [data]);

  return <>{version}</>;
}
