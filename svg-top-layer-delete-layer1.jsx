#target illustrator

(function () {
    if (app.documents.length === 0) {
        alert("请先在 Illustrator 中打开需要整理的 SVG 文件，然后再次运行此脚本。");
        return;
    }

    var doc = app.activeDocument;
    var source = doc.activeLayer;

    // Illustrator 打开 SVG 时通常会自动建立“图层 1 / Layer 1”。
    for (var li = 0; li < doc.layers.length; li++) {
        if (doc.layers[li].name === "图层 1" || doc.layers[li].name === "Layer 1") {
            source = doc.layers[li];
            break;
        }
    }

    var groups = [];
    for (var i = 0; i < source.groupItems.length; i++) {
        if (source.groupItems[i].parent === source) groups.push(source.groupItems[i]);
    }

    if (groups.length === 0) {
        alert("未找到默认根图层中的顶级 SVG 分组。文件可能已经处理过。");
        return;
    }

    // 先记录根图层内未被分组的直接对象，避免丢失。
    var loose = [];
    for (var q = 0; q < source.pageItems.length; q++) {
        var pi = source.pageItems[q];
        if (pi.parent === source && pi.typename !== "GroupItem") loose.push(pi);
    }

    // 从后向前提升，尽量保持原来的上下顺序。
    for (var j = groups.length - 1; j >= 0; j--) {
        var grp = groups[j];
        var layerName = grp.name;
        if (!layerName || layerName === "Group" || layerName === "<Group>") {
            layerName = "SVG图层_" + (j + 1);
        }

        var newLayer = doc.layers.add();
        newLayer.name = layerName;
        grp.move(newLayer, ElementPlacement.PLACEATBEGINNING);

        // 只解除 SVG 最外层这一层组，使对象直接位于新图层；
        // 组内本来就存在的必要子组会保留。
        doc.selection = null;
        grp.selected = true;
        try { app.executeMenuCommand('ungroup'); } catch (e) {}
    }

    if (loose.length > 0) {
        var looseLayer = doc.layers.add();
        looseLayer.name = "00_未分组对象";
        for (var k = loose.length - 1; k >= 0; k--) {
            try { loose[k].move(looseLayer, ElementPlacement.PLACEATBEGINNING); } catch (e) {}
        }
    }

    doc.selection = null;

    // 当默认根图层已空时删除它。此时文档已有多个新建顶级图层，因此可以删除。
    try {
        if (source.pageItems.length === 0 && source.layers.length === 0) source.remove();
    } catch (e) {}

    alert("完成：各 SVG 分组已提升为 Illustrator 顶级图层，默认“图层 1”已在清空后删除。\n建议现在另存为 .AI 作为后续编辑母版。");
})();
