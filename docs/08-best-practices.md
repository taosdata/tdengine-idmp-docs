# 最佳实践

IDMP 提供了一强大的数据建模能力，让数据标准化、情景化，从而可以更好地利用 AI 技术，从数据中挖掘出业务价值，但数据建模本身是一个很难用 AI 完成的事情。

为最大程度减少建模的成本，TDengine 推荐在数据源侧做好最基础的数据治理工作。有几条建议：

1. 每个采集量的名字要规范命名，全局统一
2. 对于同时采集的物理量，因为共享时间戳，尽可能采用多列模型
3. 对于每一个数据采集点，无论是单列还是多列，配置好层次结构，作为元数据，发送给 TDengine TSDB-Enterprise。比如：`工厂-1.产线-A.设备-X`

TDengine TSDB-Enterprise 里的 taosX 模块，在读取这些采集的数据时，能自动创建超级表和子表，做数据的转换，并可以添加更多的标签，把设备的层次结构信息保存起来。IDMP 就能依据 TSDB 里的元数据，自动构建出树状层次结构，自动创建出元素模版和元素。

对于 PLC 采集的数据，因为是单列模型，而一个设备往往拥有多个采集量，需要将多个采集量组装到一个设备下面，这个组装只能在 IDMP 里完成，可以参考[超级表映射为元素](/operation/asset-model-from-tsdb#超级表映射为元素map-stable-to-element)章节进行。

一旦树状层次结构模型在 IDMP 里建立起来，您可以通过元素、属性等模版补充更多的描述信息和业务语义，提供更好的数据情景，让整个数据平台 AI-Ready，这样便于更好的发挥 AI 的作用。

下面我们选取了不同行业的典型应用场景，来说明如何使用 TDengine IDMP, 供您参考：

1. [TDengine IDMP 应用场景：微电网监控](https://www.taosdata.com/sparkplug-microgrid-autonomous)
1. [TDengine IDMP 应用场景：烟草制丝](https://www.taosdata.com/tobacco-autonomous-monitoring)
1. [TDengine IDMP 应用场景：工业锅炉监控](https://www.taosdata.com/industrial-boiler-autopilot)
1. [TDengine IDMP 应用场景：IT 系统监控](https://www.taosdata.com/telegraf-tdengine-idmp-monitoring)
1. [TDengine IDMP 应用场景：电动汽车](https://www.taosdata.com/ev-autonomous-monitoring)
