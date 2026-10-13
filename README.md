# Illustrator SVG 脚本 · illustrator-scripts

> 一个把 SVG 分组批量处理成规范图层的 Illustrator 自动化脚本。

## 问题

处理 SVG 矢量图时，分组层级混乱、存在冗余图层，需要手动逐个把分组提升为顶级图层、删除多余图层，重复操作繁琐且容易遗漏。

## 解决方案

编写 Illustrator JSX 脚本 `svg-top-layer-delete-layer1.jsx`，一键完成「分组提升为顶级图层 + 删除指定图层」两步操作，脚本适配 Illustrator 脚本引擎。

## 结果

矢量图批量处理从手动逐层操作变为一键完成，效率提升且不易出错，脚本可复用、可二次修改。

## 文件清单

- `svg-top-layer-delete-layer1.jsx` — SVG 分组提升为顶级图层、删除图层 1

## 使用方式

Illustrator → 文件 → 脚本 → 其他脚本 → 选择 `.jsx` 运行。
