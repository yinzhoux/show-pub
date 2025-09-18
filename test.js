(function(){
    /**
     * demo tree 数据。约定：只到第二层（level-2）。
     */
    const data = {
        id: 'root',
        title: 'Continent',
        desc: '根节点（不交互）',
        children: [
          {
            id: 'c1',
            title: 'Asia',
            desc: '亚洲的媒体',
            url: '#',
            children: [
              { id: 'c1a', title: 'CCTV',                 needShow: false, desc: '中国中央电视台', url: './pages/asia1.html' },
              { id: 'c1b', title: 'NHK',                  needShow: false, desc: '日本放送协会',     url: './pages/asia2.html' },
              { id: 'c1c', title: 'The Times of India',   needShow: true,  desc: '印度时报',         url: './pages/asia3.html' }
            ]
          },
          {
            id: 'c2',
            title: 'Europe',
            desc: '欧洲的媒体',
            url: '#',
            children: [
              { id: 'c2a', title: 'BBC',             needShow: true,  desc: '英国广播公司',       url: './pages/europe1.html' },
              { id: 'c2b', title: 'Le Monde',        needShow: false, desc: '法国《世界报》',     url: './pages/europe2.html' },
              { id: 'c2c', title: 'Der Spiegel',     needShow: false, desc: '德国《明镜周刊》',   url: './pages/europe3.html' }
            ]
          },
          {
            id: 'c3',
            title: 'North America',
            desc: '北美的媒体',
            url: '#',
            children: [
              { id: 'c3a', title: 'The New York Times', needShow: false, desc: '美国《纽约时报》', url: './pages/na1.html' },
              { id: 'c3b', title: 'CNN',               needShow: true,  desc: '美国有线电视新闻网', url: './pages/na2.html' },
              { id: 'c3c', title: 'The Washington Post',needShow: false, desc: '美国《华盛顿邮报》', url: './pages/na3.html' }
            ]
          },
          {
            id: 'c4',
            title: 'South America',
            desc: '南美的媒体',
            url: '#',
            children: [
              { id: 'c4a', title: 'O Globo',       needShow: false, desc: '巴西《环球报》',     url: './pages/sa1.html' },
              { id: 'c4b', title: 'Folha de S.Paulo', needShow: true,  desc: '巴西《圣保罗页报》', url: './pages/sa2.html' }
            ]
          },
          {
            id: 'c5',
            title: 'Africa',
            desc: '非洲的媒体',
            url: '#',
            children: [
              { id: 'c5a', title: 'Daily Nation',  needShow: false, desc: '肯尼亚《国家日报》', url: './pages/af1.html' },
              { id: 'c5b', title: 'News24',        needShow: false, desc: '南非News24',        url: './pages/af2.html' }
            ]
          },
          {
            id: 'c6',
            title: 'Australia/Oceania',
            desc: '澳洲/大洋洲的媒体',
            url: '#',
            children: [
              { id: 'c6a', title: 'ABC (Australia)',           needShow: false, desc: '澳大利亚广播公司',   url: './pages/oc1.html' },
              { id: 'c6b', title: 'The Sydney Morning Herald', needShow: false, desc: '悉尼先驱晨报',       url: './pages/oc2.html' }
            ]
          },
          {
            id: 'c7',
            title: 'Antarctica',
            desc: '南极洲（科研/资料媒体）',
            url: '#',
            children: [
              { id: 'c7a', title: 'Polar Research Bulletin', needShow: false, desc: '极地研究公告', url: './pages/an1.html' }
            ]
          }
        ]
      };
      
      

    // 计算每个节点的显示坐标（三列布局）
    /**
     * 计算节点布局。
     * 布局规则：三列分布，列 x 坐标由容器宽度按比例得出，y 坐标按层内序号均分。
     * - colX[0]: 根节点列
     * - colX[1]: 一级列
     * - colX[2]: 二级列
     * @param {HTMLElement} container tree 容器
     */
    function layout(container){
        const rect = container.getBoundingClientRect();
        const padding = 24;                 // 画布内边距
        const width = rect.width - padding*2;   // 可用宽度
        const height = rect.height - padding*2; // 可用高度
        const colX = [
            padding+368,           // 根节点列 x
            padding + width*0.48,   // 一级列 x（靠左侧 32%）
            padding + width*0.85    // 二级列 x（靠右侧 95%）
        ];

        /**
         * Map: nodeId → { x, y, level, node }
         * - x, y: 渲染坐标（相对于 tree-view 容器左上角）
         * - level: 0/1/2（根/一级/二级）
         * - node: 原始数据对象
         */
        const pos = new Map();
        const rootY = padding + 690; // 根节点纵坐标（固定在顶部附近）
        pos.set(data.id, { x: colX[0], y: rootY, level: 0, node: data });

        // 一级节点纵向间隔（根据可用高度平均分配）
        // 一级节点纵向间隔（最小间距限制，避免重叠）
        const minGap = 72;
        const l1Gap = Math.max(minGap, (height - 200) / Math.max(1, (data.children.length - 1)));
        // 初步布局
        const l1Ys = [];
        data.children.forEach((n,i)=>{
            const y = padding + 90 + i*l1Gap;  // 当前一级的 y（初步）
            l1Ys.push(y);
            pos.set(n.id, { x: colX[1], y, level: 1, node: n });
            const gap2Base = 21; // 二级节点围绕一级节点的上下偏移间距（基础值）
            const gap2 = Math.max(28, gap2Base - Math.max(0, (n.children.length-3))*4); // 子数越多，间距略缩小但保留下限
            // 为二级节点引入最小间距并做简单的避让
            const childYs = [];
            n.children.forEach((m,j)=>{
                const base = y + (j - (n.children.length-1)/2)*gap2;
                let cy = base;
                // 与前一个子节点保持至少 28px 的间距
                if (childYs.length>0 && cy - childYs[childYs.length-1] < 28) {
                    cy = childYs[childYs.length-1] + 28;
                }
                childYs.push(cy);
                pos.set(m.id, { x: colX[2], y: cy, level: 2, node: m });
            });
        });
        // 简单的全局避让：保证相邻一级 y 差值不小于 minGap
        for (let i=1;i<l1Ys.length;i++){
            if (l1Ys[i] - l1Ys[i-1] < minGap) {
                const delta = minGap - (l1Ys[i] - l1Ys[i-1]);
                // 向下推后续所有一级节点
                for (let k=i;k<l1Ys.length;k++) l1Ys[k] += delta;
            }
        }
        // 应用修正后的 y 回 pos（一级及其子）
        data.children.forEach((n,i)=>{
            const newY = l1Ys[i];
            const prev = pos.get(n.id);
            if (prev) pos.set(n.id, { ...prev, y: newY });
            n.children.forEach((m)=>{
                const c = pos.get(m.id);
                if (c) pos.set(m.id, { ...c, y: c.y + (newY - prev.y) });
            });
        });
        return pos;
    }

    // 渲染整棵树：连线 → 节点 → 标签
    function render(){
        const host = document.getElementById('tree-view');
        const nodesHost = document.getElementById('tree-nodes');
        const svg = document.getElementById('tree-links');
        if(!host || !nodesHost || !svg) return;

        const pos = layout(host);
        const { width, height } = host.getBoundingClientRect(); // 用于设置 SVG viewBox
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.innerHTML = '';

        // 画从 a → b 的直线
        function link(a,b){
            const p1 = pos.get(a); const p2 = pos.get(b);
            const line = document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute('class','link');
            line.setAttribute('x1', p1.x);
            line.setAttribute('y1', p1.y);
            line.setAttribute('x2', p2.x);
            line.setAttribute('y2', p2.y);
            svg.appendChild(line);
        }

        data.children.forEach(l1=>{
            link(data.id, l1.id);
            l1.children.forEach(l2=> link(l1.id, l2.id));
        });

        // 根据 needShow 在节点附近绘制 desc 连线与标签
        function renderDescFor(nodeId, labelX, labelY, text){
            const offsetX = 60; // 说明文字起点与节点的横向距离
            const offsetY = -18; // 说明文字相对节点的纵向偏移
            const start = pos.get(nodeId);
            if(!start) return;
            const x1 = start.x + 7; // 从节点右侧出发
            const y1 = start.y;
            const x2 = labelX + 4;  // 连接到文字左侧稍微内一点
            const y2 = labelY - 2;
            const line = document.createElementNS('http://www.w3.org/2000/svg','line');
            line.setAttribute('class','desc-link');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            svg.appendChild(line);

            const tag = document.createElement('div');
            tag.className = 'label';
            tag.textContent = text;
            tag.style.left = (labelX) + 'px';
            tag.style.top = (labelY) + 'px';
            nodesHost.appendChild(tag);
        }

        // 节点与标签（标签位于节点右侧 14px）
        nodesHost.innerHTML='';
        pos.forEach(({x,y,level,node})=>{
            const el = document.createElement('div');
            el.className = 'node' + (level===0? ' root' : level===1? ' level-1':' level-2'); // 根节点不可交互
            el.style.left = x+'px'; el.style.top = y+'px';
            if(level>0){
                // 悬浮：显示并更新 tooltip 位置
                el.addEventListener('mouseenter', (e)=> showTip(e,node));
                el.addEventListener('mousemove', positionTip);
                el.addEventListener('mouseleave', hideTip);
                // 点击：仅二级节点跳转（新标签）
                if (level === 2) {
                    el.addEventListener('click', ()=> node.url && window.open(node.url,'_blank'));
                }
            }
            nodesHost.appendChild(el);

            if(level === 1){
                const label = document.createElement('div');
                label.className = 'label';
                label.textContent = node.title;
                label.style.left = (x + 14) + 'px';
                label.style.top = y + 'px';
                nodesHost.appendChild(label);
            }

            if (level === 2 && node.needShow) {
                const dx = 100;
                const dy = -26;
                renderDescFor(node.id, x + dx, y + dy, node.desc || '');
            }
        });
    }

    // Tooltip 状态缓存
    /**
     * Tooltip DOM 引用缓存
     * - el: 外层容器
     * - title/desc: 文本节点
     * - arrow: 箭头方块（旋转 45°）
     */
    const tip = { el:null, title:null, desc:null, arrow:null };
    function ensureTip(){ if(tip.el) return; tip.el = document.getElementById('tooltip'); tip.title = document.getElementById('tooltip-title'); tip.desc = document.getElementById('tooltip-desc'); tip.arrow = tip.el.querySelector('.tooltip-arrow'); }
    function showTip(e,node){ ensureTip(); tip.title.textContent = node.title; tip.desc.textContent = node.desc||''; tip.el.hidden=false; positionTip(e, node); }
    function hideTip(){ ensureTip(); tip.el.hidden = true; }
    // 根据鼠标位置摆放 tooltip
    // 水平：左右贴边；垂直：优先下方，不够则上方
    function positionTip(e, node){
        ensureTip();
        const dx = 16, dy = 16; // 相对于鼠标的偏移（避免遮住指针）
        const vw = document.documentElement.clientWidth;  // 视口宽度
        const vh = document.documentElement.clientHeight; // 视口高度

        // 预估尺寸（先显示后测量，避免 0 宽高）
        tip.el.style.left = '-9999px';
        tip.el.style.top = '-9999px';
        tip.el.hidden = false;
        const rect = tip.el.getBoundingClientRect();
        const tw = rect.width;  // tooltip 实际宽度
        const th = rect.height; // tooltip 实际高度

        // 固定放在鼠标右侧稍偏下方，不与鼠标左对齐
        let x = e.clientX + dx; // 初步的水平位置（鼠标右侧）
        // 优先在鼠标下方；若不够则放上方
        let placeAbove = false;
        let y = e.clientY + dy;           // 初步的垂直位置（鼠标下方）
        const belowFits = (e.clientY + dy + th) <= vh; // 判断下方是否放得下
        if (!belowFits) { placeAbove = true; y = e.clientY - th - dy; }
        // 仅左右贴边；上下由“在上/下方”来避免溢出
        if (x + tw > vw) x = vw - tw - 8; // 右侧贴边
        if (x < 8) x = 8;                 // 左侧贴边

        tip.el.style.left = x + 'px';
        tip.el.style.top = y + 'px';
        tip.arrow.style.left = '-6px';
        tip.arrow.style.right = 'auto';
        if (placeAbove) {
            tip.arrow.style.top = 'auto';
            tip.arrow.style.bottom = '8px';
        } else {
            tip.arrow.style.bottom = 'auto';
            tip.arrow.style.top = '8px';
        }
    }

    // 初始渲染 + 窗口尺寸变化时重算
    function onResize(){ render(); }

    window.initTreeView = function(){ render(); window.addEventListener('resize', onResize); };
})();

