---
title: Managing Connections
---

:::note
Connections are categorized into two types: TDengine and AI. TDengine connections are used for business data management, while AI connections are used for AI chat and question recommendation.
:::

In the Admin Console, click `Connections` to view the list of existing connections.

1. Click the Add Connection (+) icon to create a new connection.
2. After a connection is created, you can edit, disable/enable, or delete it. In the future, observability metrics related to connections will also be provided to facilitate issue diagnosis.
3. On the left tree-structured page, hover over a connection name, and three dots will appear on the right. Click them to reveal quick action buttons for the corresponding connection.

## TDengine Connection

TDengine connections are used for business data management. After creating a connection, you can import data from it into the IDMP platform for management. It supports two authentication methods: username/password or token. In the form, for the `Explorer Address` field, please enter the Explorer address corresponding to the current TDengine connection, which is usually `http://[host]:6060`.


## AI Connection

AI connections are used for AI chat and question recommendation. IDMP comes with a built-in connection that has a 3-day trial period. Please update the key or add other available connections before the expiration date to avoid affecting AI-related functionalities.

When editing a connection form and selecting the type as `AI`, you can refer to the following instructions:

1. Models: The dropdown lists several commonly used models. You can select one or enter directly. If entering manually, it is recommended to provide two models separated by English commas—the first for general chat and the second for deep thinking. If only one model is provided, the deep thinking feature in AI chat will not have an additional effect. If more than two are provided, only the first two will be used, and the rest will be discarded.
2. Url: The dropdown lists several commonly used AI service urls. You can select one or enter directly. When selecting, ensure the chosen url is compatible with the entered models. When entering manually, make sure the url follows the OpenAI API conventions.
3. Auth Type: By default, `API Key` is used. However, locally deployed AI services usually do not require a key, so you can select `None`.

If the `Models` does not use an item from the dropdown, or the `Url` does not use an item from the dropdown, or the `Models` and `Url` do not follow the recommended correspondence, the configuration may be incorrect. Please use the following Python code for validation, or use other similar code:

```python
from openai import OpenAI

if __name__ == "__main__":
  """
  Test the LLM interface
  
  base_url：Service url
  api_key：API key
  model：Model name
  """
  openai_client = OpenAI(
      base_url="[Service url]",
      api_key="[API key]",
  )
  messages = [
    {"role": "system", "content": "System prompt"},
    {"role": "user", "content": "User prompt"}
  ]
  response = openai_client.chat.completions.create(
      model="[Model name]",
      messages=messages,
      temperature=0,
      stream=False,
      timeout=300,
  )
  content = response.choices[0].message.content
  print(content)
```