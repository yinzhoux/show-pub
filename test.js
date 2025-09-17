// tree-view 的最小可交互框架：三层树、悬浮卡片、点击跳转
(function(){
    const data = {
        id: 'root', title: 'Category', desc: '根节点（不交互）', children: [
            { id: 'g1', title: 'Government', desc: '一级分组 1', url: '#', children: [
                { id: 'g1a', title: 'Policy 1', desc: '示例说明 1', url: 'https://example.com/1' },
                { id: 'g1b', title: 'Policy 2', desc: '示例说明 2', url: 'https://example.com/2' },
                { id: 'g1c', title: 'Policy 3', desc: '示例说明 3', url: 'https://example.com/3' },
            ]},
            { id: 'g2', title: 'Economy & Trade', desc: '一级分组 2', url: '#', children: [
                { id: 'g2a', title: 'Tariff', desc: '示例说明 A', url: 'https://example.com/a' },
                { id: 'g2b', title: 'Export', desc: '示例说明 B', url: 'https://example.com/b' }
            ]},
            { id: 'g3', title: 'Technology', desc: '一级分组 3', url: '#', children: [
                { id: 'g3a', title: 'AI', desc: '示例说明 X', url: 'https://example.com/x' },
                { id: 'g3b', title: 'Cyber', desc: '示例说明 Y', url: 'https://example.com/y' },
                { id: 'g3c', title: 'Chips', desc: '示例说明 Z', url: 'https://example.com/z' }
            ]}
        ]
    };

    function layout(container){
        const rect = container.getBoundingClientRect();
        const padding = 24;
        const width = rect.width - padding*2;
        const height = rect.height - padding*2;
        const colX = [padding + 24, padding + width*0.32, padding + width*0.95];

        const pos = new Map();
        const rootY = padding + 32;
        pos.set(data.id, { x: colX[0], y: rootY, level: 0, node: data });

        const l1Gap = (height - 100) / (data.children.length - 1);
        data.children.forEach((n,i)=>{
            const y = padding + 80 + i*l1Gap;
            pos.set(n.id, { x: colX[1], y, level: 1, node: n });
            const gap2 = 48;
            n.children.forEach((m,j)=>{
                pos.set(m.id, { x: colX[2], y: y + (j - (n.children.length-1)/2)*gap2, level: 2, node: m });
            });
        });
        return pos;
    }

    function render(){
        const host = document.getElementById('tree-view');
        const nodesHost = document.getElementById('tree-nodes');
        const svg = document.getElementById('tree-links');
        if(!host || !nodesHost || !svg) return;

        const pos = layout(host);
        const { width, height } = host.getBoundingClientRect();
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.innerHTML = '';

        function link(a,b){
            const p1 = pos.get(a); const p2 = pos.get(b);
            const mx = (p1.x + p2.x)/2;
            const path = document.createElementNS('http://www.w3.org/2000/svg','path');
            path.setAttribute('class','link');
            path.setAttribute('d', `M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`);
            svg.appendChild(path);
        }

        data.children.forEach(l1=>{ link(data.id, l1.id); l1.children.forEach(l2=> link(l1.id, l2.id)); });

        nodesHost.innerHTML='';
        pos.forEach(({x,y,level,node})=>{
            const el = document.createElement('div');
            el.className = 'node' + (level===0? ' root' : level===1? ' level-1':' level-2');
            el.style.left = x+'px'; el.style.top = y+'px';
            if(level>0){
                el.addEventListener('mouseenter', (e)=> showTip(e,node));
                el.addEventListener('mousemove', positionTip);
                el.addEventListener('mouseleave', hideTip);
                el.addEventListener('click', ()=> node.url && window.open(node.url,'_blank'));
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

    const tip = { el:null, title:null, desc:null, arrow:null };
    function ensureTip(){ if(tip.el) return; tip.el = document.getElementById('tooltip'); tip.title = document.getElementById('tooltip-title'); tip.desc = document.getElementById('tooltip-desc'); tip.arrow = tip.el.querySelector('.tooltip-arrow'); }
    function showTip(e,node){ ensureTip(); tip.title.textContent = node.title; tip.desc.textContent = node.desc||''; tip.el.hidden=false; positionTip(e); }
    function hideTip(){ ensureTip(); tip.el.hidden = true; }
    function positionTip(e){ ensureTip(); const dx=14, dy=14; tip.el.style.left=(e.clientX+dx)+'px'; tip.el.style.top=(e.clientY+dy)+'px'; tip.arrow.style.left='-6px'; tip.arrow.style.top='8px'; }

    function onResize(){ render(); }

    window.initTreeView = function(){ render(); window.addEventListener('resize', onResize); };
})();

