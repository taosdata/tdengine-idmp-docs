---
title: 浏览事件
sidebar_label: 浏览事件
---

# 6.2 浏览事件

事件可从两处浏览：主导航中的**全局事件视图**（显示整个系统的所有事件），以及每个元素上的**事件标签页**（仅显示该元素及其子元素的事件）。两个视图共享相同的布局、控件和过滤选项。

## 6.2.1 全局事件视图

全局事件视图提供系统级的事件管理界面，支持搜索、筛选、导出等操作，便于全局监控和管理所有元素的事件。点击顶部导航栏中的**事件**，打开系统级事件列表。此视图显示当前用户有权访问的所有元素的全部事件。

### 6.2.1.1 工具栏

工具栏提供事件列表的搜索、筛选和数据导出功能。

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>控件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>搜索</strong></td><td>按名称或其他文本搜索事件</td></tr>
<tr><td><strong>列选择器</strong></td><td>显示或隐藏可选列。<strong>路径</strong>列（元素层次路径）默认隐藏</td></tr>
<tr><td><strong>刷新</strong></td><td>重新加载事件列表</td></tr>
<tr><td><strong>导出 CSV</strong></td><td>将当前过滤后的事件列表导出为 CSV 文件</td></tr>
<tr><td><strong>保存为面板</strong></td><td>将当前事件列表保存为面板，可添加到仪表板中</td></tr>
</tbody>
</table>

### 6.2.1.2 过滤器

以下过滤控件支持按确认状态、类别和模板缩小事件列表的显示范围。

- **仅显示未确认**：切换开关，仅显示尚未确认的事件
- **类别**：按事件类别标签过滤
- **模板**：按事件模板过滤

### 6.2.1.3 左侧边栏

左侧边栏提供收藏事件和已保存事件过滤器的快速访问入口。

- **收藏事件**：已标记为收藏的单个事件，支持快速访问。任何事件均可添加到收藏。
- **事件过滤器**：已保存的过滤配置（见下方[已保存事件过滤器](#623-已保存事件过滤器)）

### 6.2.1.4 事件列表列

事件列表以表格形式展示各事件的关键信息，各列含义如下。

<table>
<colgroup><col style="width:7em"/><col/></colgroup>
<thead><tr><th>列</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>S</strong></td><td>严重程度指示图标</td></tr>
<tr><td><strong>A</strong></td><td>确认状态图标</td></tr>
<tr><td><strong>名称</strong></td><td>事件名称——点击可打开事件详情页</td></tr>
<tr><td><strong>持续时长</strong></td><td>从开始到结束的时间间隔</td></tr>
<tr><td><strong>开始时间</strong></td><td>事件开始时间戳</td></tr>
<tr><td><strong>结束时间</strong></td><td>事件结束时间戳（事件仍处于活动中则为空）</td></tr>
<tr><td><strong>类别</strong></td><td>类别标签</td></tr>
<tr><td><strong>模板</strong></td><td>事件模板名称</td></tr>
<tr><td><strong>严重程度</strong></td><td>严重等级标签</td></tr>
<tr><td><strong>原因代码</strong></td><td>原因代码（如已设置）</td></tr>
<tr><td><strong>描述</strong></td><td>描述文本</td></tr>
</tbody>
</table>

### 6.2.1.5 行操作

每个事件行提供上下文操作菜单，支持查看详情、发送通知、确认事件、趋势图分析和删除等操作。将鼠标悬停在任意事件行上，右侧会显示 **⋮**（更多）菜单。点击展开以下选项：

<table>
<colgroup><col style="width:8em"/><col/></colgroup>
<thead><tr><th>操作</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>查看</strong></td><td>打开事件详情页</td></tr>
<tr><td><strong>发送通知</strong></td><td>手动为此事件向已配置的联系途径触发通知</td></tr>
<tr><td><strong>确认</strong></td><td>确认事件</td></tr>
<tr><td><strong>趋势图分析</strong></td><td>打开关联元素在事件时间范围内的趋势图</td></tr>
<tr><td><strong>删除</strong></td><td>删除事件记录</td></tr>
</tbody>
</table>

## 6.2.2 元素级事件

元素级事件视图聚焦于单个元素及其子元素的事件，适用于针对特定设备或产线的事件监控场景。每个元素都有自己的**事件**标签页，仅显示与该元素关联的事件。在资产树中导航到任意元素并点击**事件**标签页。

范围切换控件用于控制显示哪些事件：

- **仅此元素**：显示在此元素上配置的分析所生成的事件
- **包含子元素**：扩展列表，包含层次结构中所有下级元素的事件

包含子元素选项便于查看整条产线或站点的所有运营事件——仅需导航到资产树中合适的层级即可。

元素级事件标签页的过滤器、列和行操作与全局事件视图相同。工具栏包含所有相同控件，外加三个特定于此场景的额外控件：

<table>
<colgroup><col style="width:11em"/><col/></colgroup>
<thead><tr><th>控件</th><th>说明</th></tr></thead>
<tbody>
<tr><td><strong>包含子元素</strong></td><td>切换开关，位于<strong>仅显示未确认</strong>右侧。启用后，事件列表将扩展显示当前元素所有下级子元素的事件，便于全面查看整条产线或站点的事件</td></tr>
<tr><td><strong>生成测试事件数据</strong></td><td>在此元素上创建测试事件，用于开发和验证</td></tr>
<tr><td><strong>通知规则</strong></td><td>打开此元素的通知规则配置——参见<a href="./04-alerts-and-notifications.md">告警与通知</a></td></tr>
</tbody>
</table>

## 6.2.3 已保存事件过滤器

已保存事件过滤器支持将常用的搜索条件持久化，便于快速重复执行相同的事件查询。**事件过滤器**通过执行事件搜索并以名称保存搜索结果来创建。使用任意可用过滤控件的组合运行搜索后，将当前搜索结果保存为命名过滤器。保存的过滤器随即出现在左侧边栏的**事件过滤器**部分。点击即可重新运行相同搜索并立即还原该结果。
