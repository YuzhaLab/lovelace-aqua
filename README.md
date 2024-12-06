# Aqua Cards

<div align="right">
    <a href="#chinese">中文</a> | <a href="#english">English</a>
</div>

<div id="chinese">

# Aqua Cards (中文)

Aqua Cards 是一个基于 [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) 的 Home Assistant 水族箱控制卡片集合。

## 关于此项目

这是一个专门为水族箱控制系统定制的卡片集合，主要修改包括:
- 将风扇卡片改造为水泵控制卡片
- 添加流量监控功能
- 优化水族相关的UI展示

## 前置要求

由于本项目是基于 Mushroom 开发的扩展卡片，使用前请确保:

1. 已安装 [HACS](https://hacs.xyz)
2. 已通过 HACS 安装 [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom)

## 安装

### HACS 安装

1. 确保已安装 HACS
2. 点击下方按钮
<!-- 2. 在 HACS 中添加自定义存储库:
   - 点击 HACS 侧边栏中的 "Frontend"
   - 点击右上角的菜单按钮
   - 选择 "Custom repositories"
   - 添加 URL: `https://github.com/YuzhaLab/aqua-cards`
   - 类别选择: "Lovelace"
3. 点击 "Download" 安装 -->
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=https%3A%2F%2Fgithub.com%2FYuzhaLab%2Flovelace-aqua&owner=YuzhaLab)

### 手动安装

1. 下载最新版本的 `aqua.js`
2. 将文件复制到 `config/www/` 目录
3. 在 Dashboard 资源中添加引用或者使用下面这个将一下代码添加到lovelace部分
    ```yaml
    resources:
        - url: /local/aqua.js
          type: module
    ```

## 使用方法

### 水泵控制卡片

1. 编辑仪表板
2. 添加卡片
3. 搜索 "Aqua Pump Card"
4. 配置实体和选项

### 配置示例

```yaml
type: custom:aqua-pump-card
entity: fan.aquarium_pump
show_percentage_control: true
show_oscillate_control: false
```

## 版权和许可

- 原始代码版权 2022-2024 piitaya
- 修改部分版权 2024 YuzhaLab
- 基于 Apache License 2.0 授权

## 贡献

欢迎提交 Issue 和 Pull Request!

</div>

<div id="english">

# Aqua Cards (English)

Aqua Cards is a collection of Home Assistant aquarium control cards based on [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom).

## About

This is a customized card collection for aquarium control systems. Main modifications include:
- Converting fan card to pump control card
- Adding flow monitoring functionality
- Optimizing aquarium-related UI display

## Prerequisites

As this project is an extension of Mushroom Cards, please ensure:

1. [HACS](https://hacs.xyz) is installed
2. [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) is installed via HACS

## Installation

### HACS Installation

1. Make sure HACS is installed
[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?repository=https%3A%2F%2Fgithub.com%2FYuzhaLab%2Flovelace-aqua&owner=YuzhaLab)

### Manual Installation

1. Download the latest version of `aqua.js`
2. Copy the file to `config/www/` directory
3. Add reference in Dashboard resources:
    ```yaml
    resources:
        - url: /local/aqua-cards.js
          type: module
    ```

## Usage

### Pump Control Card

1. Edit dashboard
2. Add card
3. Search for "Aqua Pump Card"
4. Configure entity and options

### Configuration Example

```yaml
type: custom:aqua-pump-card
entity: fan.aquarium_pump
show_percentage_control: true
show_oscillate_control: false
```

## Copyright and License

- Original code copyright 2022-2024 piitaya
- Modified code copyright 2024 YuzhaLab
- Licensed under Apache License 2.0

## Contributing

Issues and Pull Requests are welcome!

</div>
