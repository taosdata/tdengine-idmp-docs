import { useEffect, useMemo, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from '@theme-original/CodeBlock';

//const REMOTE_URL = "https://www.taosdata.com/wp-content/themes/tdengine/js/product-data.json";
const PRODUCT_MAP = {
  "idmp-ee": "TDengine IDMP-Enterprise",
  "idmp-ee-sdk": "TDengine IDMP-Enterprise SDK",
  "tsdb-ee": "TDengine TSDB-Enterprise",
  "tsdb-ee-client": "TDengine TSDB-Enterprise Client",
  "tsdb-ee-lite": "TDengine TSDB-Enterprise Lite",
  "tsdb-ee-lite-client": "TDengine TSDB-Enterprise Lite Client",
  "tsdb": "TDengine TSDB-OSS",
  "tsdb-client": "TDengine TSDB-OSS Client",
  "tdgpt-ee": "TDengine TDgpt-Enterprise",
  "tdgpt": "TDengine TDgpt-OSS",
  "explorer-ee": "TDengine TSDB Explorer-Enterprise",
  "explorer": "TDengine TSDB Explorer-OSS",
  "taosx-agent": "TDengine taosX-Agent",
  "grafana": "TDengine TSDB Grafana-Plugin"
};

export default function CodeBlockWrapper(props) {
  const { i18n } = useDocusaurusContext();
  const REMOTE_URL = i18n.currentLocale === 'en' ? "https://tdengine.com/wp-content/themes/tdengine/js/product-data.json" : "https://www.taosdata.com/wp-content/themes/tdengine/js/product-data.json";

  const [data, setData] = useState([]);

  const meta = props.metastring;
  if (!meta) {
    return <CodeBlock {...props} />;
  }

  const tokens = meta.split(/\s+/);
  const productKey = tokens.find((token) => PRODUCT_MAP[token]);
  if (!productKey) {
    return <CodeBlock {...props} />;
  }

  const productName = PRODUCT_MAP[productKey];

  useEffect(() => {
    fetch(REMOTE_URL)
      .then((r) => r.json())
      .then(setData)
      .catch((e) => {
        console.error(e);
        setData([]);
      });
  }, []);

  const matchedVersion = useMemo(() => {
    const product = data.find((p) => p?.name === productName);
    return product?.filters?.versions?.[0] ?? [];
  }, [data, productName]);

  let code = props.children;

  if (typeof code === "string" && matchedVersion) {
    code = code.replaceAll("{{VERSION}}", matchedVersion);
  }

  return (
    <>
      <CodeBlock {...props}>{code}</CodeBlock>
    </>
  );
}
