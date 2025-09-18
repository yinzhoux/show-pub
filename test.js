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
            desc: '亚洲的出版社',
            url: '#',
            children: [
              { id: 'c1a', title: 'China Publishing Group', desc: '中国出版集团', url: './pages/asia1.html' },
              { id: 'c1b', title: 'Kodansha', desc: '日本讲谈社', url: './pages/asia2.html' },
              { id: 'c1c', title: 'Penguin Random House India', desc: '企鹅印度', url: './pages/asia3.html' }
            ]
          },
          {
            id: 'c2',
            title: 'Europe',
            desc: '欧洲的出版社',
            url: '#',
            children: [
              { id: 'c2a', title: 'Hachette Livre', desc: '法国阿歇特出版社', url: './pages/europe1.html' },
              { id: 'c2b', title: 'Springer Nature', desc: '德国施普林格·自然', url: './pages/europe2.html' },
              { id: 'c2c', title: 'Bloomsbury', desc: '英国布卢姆斯伯里', url: './pages/europe3.html' }
            ]
          },
          {
            id: 'c3',
            title: 'North America',
            desc: '北美的出版社',
            url: '#',
            children: [
              { id: 'c3a', title: 'HarperCollins', desc: '美国哈珀柯林斯', url: './pages/na1.html' },
              { id: 'c3b', title: 'Simon & Schuster', desc: '美国西蒙与舒斯特', url: './pages/na2.html' },
              { id: 'c3c', title: 'Scholastic', desc: '美国学乐出版社', url: './pages/na3.html' }
            ]
          },
          {
            id: 'c4',
            title: 'South America',
            desc: '南美的出版社',
            url: '#',
            children: [
              { id: 'c4a', title: 'Editora Abril', desc: '巴西阿布里尔出版社', url: './pages/sa1.html' },
              { id: 'c4b', title: 'Planeta do Brasil', desc: '巴西行星出版社', url: './pages/sa2.html' }
            ]
          },
          {
            id: 'c5',
            title: 'Africa',
            desc: '非洲的出版社',
            url: '#',
            children: [
              { id: 'c5a', title: 'Heinemann Kenya', desc: '海尼曼肯尼亚', url: './pages/af1.html' },
              { id: 'c5b', title: 'NB Publishers', desc: '南非NB出版商', url: './pages/af2.html' }
            ]
          },
          {
            id: 'c6',
            title: 'Australia/Oceania',
            desc: '澳洲/大洋洲的出版社',
            url: '#',
            children: [
              { id: 'c6a', title: 'Allen & Unwin', desc: '澳大利亚艾伦与昂温', url: './pages/oc1.html' },
              { id: 'c6b', title: 'University of Queensland Press', desc: '昆士兰大学出版社', url: './pages/oc2.html' }
            ]
          },
          {
            id: 'c7',
            title: 'Antarctica',
            desc: '南极洲（科研/资料出版）',
            url: '#',
            children: [
              { id: 'c7a', title: 'Polar Research Institute Press', desc: '极地研究院出版', url: './pages/an1.html' }
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
        const l1Gap = (height - 200) / (data.children.length - 1);
        data.children.forEach((n,i)=>{
            const y = padding + 90 + i*l1Gap;  // 当前一级的 y
            pos.set(n.id, { x: colX[1], y, level: 1, node: n });
            const gap2 = 48; // 二级节点围绕一级节点的上下偏移间距
            n.children.forEach((m,j)=>{
                pos.set(m.id, { x: colX[2], y: y + (j - (n.children.length-1)/2)*gap2, level: 2, node: m });
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

        data.children.forEach(l1=>{ link(data.id, l1.id); l1.children.forEach(l2=> link(l1.id, l2.id)); });

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

            if(level>0){
                const label = document.createElement('div');
                label.className = 'label';
                label.textContent = node.title;
                label.style.left = (x + 14) + 'px';
                label.style.top = y + 'px';
                nodesHost.appendChild(label);
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
    function showTip(e,node){ ensureTip(); tip.title.textContent = node.title; tip.desc.textContent = node.desc||''; tip.el.hidden=false; positionTip(e); }
    function hideTip(){ ensureTip(); tip.el.hidden = true; }
    // 根据鼠标位置摆放 tooltip
    // 水平：左右贴边；垂直：优先下方，不够则上方
    function positionTip(e){
        ensureTip();
        const dx = 14, dy = 14; // 相对于鼠标的偏移（避免遮住指针）
        const vw = document.documentElement.clientWidth;  // 视口宽度
        const vh = document.documentElement.clientHeight; // 视口高度

        // 预估尺寸（先显示后测量，避免 0 宽高）
        tip.el.style.left = '-9999px';
        tip.el.style.top = '-9999px';
        tip.el.hidden = false;
        const rect = tip.el.getBoundingClientRect();
        const tw = rect.width;  // tooltip 实际宽度
        const th = rect.height; // tooltip 实际高度

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

