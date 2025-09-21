/**
 * 树形视图数据和文章数据
 * 这个文件包含了所有用于显示树形视图和详细信息页面的数据
 */

// 树形视图数据
const treeData = {
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
                { 
                    id: 'c1a', 
                    title: 'CCTV', 
                    needShow: false, 
                    desc: '中国中央电视台', 
                    articleId: 'cctv'
                },
                { 
                    id: 'c1b', 
                    title: 'NHK', 
                    needShow: false, 
                    desc: '日本放送协会', 
                    articleId: 'nhk'
                },
                { 
                    id: 'c1c', 
                    title: 'The Times of India', 
                    needShow: true, 
                    desc: '印度时报', 
                    articleId: 'times-of-india'
                }
            ]
        },
        {
            id: 'c2',
            title: 'Europe',
            desc: '欧洲的媒体',
            url: '#',
            children: [
                { 
                    id: 'c2a', 
                    title: 'BBC', 
                    needShow: true, 
                    desc: '英国广播公司', 
                    articleId: 'bbc'
                },
                { 
                    id: 'c2b', 
                    title: 'Le Monde', 
                    needShow: false, 
                    desc: '法国《世界报》', 
                    articleId: 'le-monde'
                },
                { 
                    id: 'c2c', 
                    title: 'Der Spiegel', 
                    needShow: false, 
                    desc: '德国《明镜周刊》', 
                    articleId: 'der-spiegel'
                }
            ]
        },
        {
            id: 'c3',
            title: 'North America',
            desc: '北美的媒体',
            url: '#',
            children: [
                { 
                    id: 'c3a', 
                    title: 'The New York Times', 
                    needShow: false, 
                    desc: '美国《纽约时报》', 
                    articleId: 'nytimes'
                },
                { 
                    id: 'c3b', 
                    title: 'CNN', 
                    needShow: true, 
                    desc: '美国有线电视新闻网', 
                    articleId: 'cnn'
                },
                { 
                    id: 'c3c', 
                    title: 'The Washington Post', 
                    needShow: false, 
                    desc: '美国《华盛顿邮报》', 
                    articleId: 'washington-post'
                }
            ]
        },
        {
            id: 'c4',
            title: 'South America',
            desc: '南美的媒体',
            url: '#',
            children: [
                { 
                    id: 'c4a', 
                    title: 'O Globo', 
                    needShow: false, 
                    desc: '巴西《环球报》', 
                    articleId: 'o-globo'
                },
                { 
                    id: 'c4b', 
                    title: 'Folha de S.Paulo', 
                    needShow: true, 
                    desc: '巴西《圣保罗页报》', 
                    articleId: 'folha-sp'
                }
            ]
        },
        {
            id: 'c5',
            title: 'Africa',
            desc: '非洲的媒体',
            url: '#',
            children: [
                { 
                    id: 'c5a', 
                    title: 'Daily Nation', 
                    needShow: false, 
                    desc: '肯尼亚《国家日报》', 
                    articleId: 'daily-nation'
                },
                { 
                    id: 'c5b', 
                    title: 'News24', 
                    needShow: false, 
                    desc: '南非News24', 
                    articleId: 'news24'
                }
            ]
        },
        {
            id: 'c6',
            title: 'Australia/Oceania',
            desc: '澳洲/大洋洲的媒体',
            url: '#',
            children: [
                { 
                    id: 'c6a', 
                    title: 'ABC (Australia)', 
                    needShow: false, 
                    desc: '澳大利亚广播公司', 
                    articleId: 'abc-australia'
                },
                { 
                    id: 'c6b', 
                    title: 'The Sydney Morning Herald', 
                    needShow: false, 
                    desc: '悉尼先驱晨报', 
                    articleId: 'sydney-morning-herald'
                }
            ]
        },
        {
            id: 'c7',
            title: 'Antarctica',
            desc: '南极洲（科研/资料媒体）',
            url: '#',
            children: [
                { 
                    id: 'c7a', 
                    title: 'Polar Research Bulletin', 
                    needShow: false, 
                    desc: '极地研究公告', 
                    articleId: 'polar-research'
                }
            ]
        }
    ]
};

// 文章数据
const articlesData = {
    "cctv": {
        "title": "中国中央电视台 (CCTV)",
        "summary": "中国中央电视台是中华人民共和国国家广播电视总局直属的国家级电视台，是中国最重要的新闻媒体之一。",
        "content": "<h3>历史沿革</h3><p>中国中央电视台成立于1958年，原名北京电视台，1978年更名为中国中央电视台。作为中国最大的电视媒体，CCTV在国内外都具有重要影响力。</p><h3>主要频道</h3><p>CCTV拥有多个专业频道，包括新闻频道、财经频道、体育频道、电影频道等，覆盖了各个领域的新闻报道和娱乐内容。</p><h3>国际影响</h3><p>通过CCTV-4中文国际频道和CCTV-NEWS英语新闻频道，CCTV向全球观众传播中国声音，是了解中国的重要窗口。</p>",
        "website": "https://www.cctv.com",
        "founded": "1958年",
        "headquarters": "北京"
    },
    "nhk": {
        "title": "日本放送协会 (NHK)",
        "summary": "NHK是日本的公共广播机构，以高质量的新闻报道和纪录片制作而闻名世界。",
        "content": "<h3>机构性质</h3><p>NHK是日本唯一的公共广播机构，不依赖广告收入，主要依靠收视费维持运营，这保证了其新闻报道的独立性和客观性。</p><h3>节目特色</h3><p>NHK以其高质量的纪录片、新闻节目和教育内容著称，特别是其制作的科学纪录片在国际上享有盛誉。</p><h3>技术创新</h3><p>NHK在广播技术方面一直处于领先地位，是8K超高清电视技术的先驱，为全球广播技术的发展做出了重要贡献。</p>",
        "website": "https://www.nhk.or.jp",
        "founded": "1926年",
        "headquarters": "东京"
    },
    "times-of-india": {
        "title": "印度时报 (The Times of India)",
        "summary": "印度时报是印度发行量最大的英文日报，在印度媒体界具有重要地位。",
        "content": "<h3>媒体地位</h3><p>印度时报成立于1838年，是印度历史最悠久的英文报纸之一，也是目前印度发行量最大的英文日报。</p><h3>报道特色</h3><p>该报以其全面的新闻报道、深入的分析评论和多元化的内容而著称，涵盖了政治、经济、社会、文化等各个领域。</p><h3>数字化发展</h3><p>随着数字媒体的发展，印度时报积极拥抱新技术，其网站和移动应用在印度数字媒体领域占据重要地位。</p>",
        "website": "https://timesofindia.indiatimes.com",
        "founded": "1838年",
        "headquarters": "孟买"
    },
    "bbc": {
        "title": "英国广播公司 (BBC)",
        "summary": "BBC是英国最大的公共广播机构，以其公正、客观的新闻报道而享誉全球。",
        "content": "<h3>公共广播典范</h3><p>BBC成立于1922年，是世界上最著名的公共广播机构之一，以其高质量的新闻报道和节目制作而闻名。</p><h3>全球影响力</h3><p>通过BBC World Service，BBC的新闻和节目覆盖全球，是国际新闻的重要来源，在多个国家都有忠实听众。</p><h3>节目制作</h3><p>BBC不仅制作新闻节目，还以其优秀的纪录片、电视剧和娱乐节目而著称，如《地球脉动》、《神探夏洛克》等。</p>",
        "website": "https://www.bbc.com",
        "founded": "1922年",
        "headquarters": "伦敦"
    },
    "le-monde": {
        "title": "法国《世界报》 (Le Monde)",
        "summary": "《世界报》是法国最具影响力的日报之一，以其深度的政治分析和国际新闻报道而著称。",
        "content": "<h3>媒体传统</h3><p>《世界报》成立于1944年，是法国最具权威性的日报之一，以其深度的政治分析和国际新闻报道而著称。</p><h3>编辑方针</h3><p>该报坚持独立、客观的编辑方针，在法国政治和社会议题上具有重要影响力，是法国知识分子的重要读物。</p><h3>数字化转型</h3><p>面对数字媒体的挑战，《世界报》积极进行数字化转型，其网站和数字订阅服务在法国媒体市场占据重要地位。</p>",
        "website": "https://www.lemonde.fr",
        "founded": "1944年",
        "headquarters": "巴黎"
    },
    "der-spiegel": {
        "title": "德国《明镜周刊》 (Der Spiegel)",
        "summary": "《明镜周刊》是德国最重要的新闻杂志，以其深入的调查报道而闻名。",
        "content": "<h3>调查新闻</h3><p>《明镜周刊》以其深入的调查报道而闻名，经常揭露政治丑闻和社会问题，在德国媒体界具有重要地位。</p><h3>国际视野</h3><p>该杂志不仅关注德国国内新闻，还以其国际新闻报道和分析而著称，是了解德国和欧洲政治的重要窗口。</p><h3>媒体创新</h3><p>《明镜周刊》在数字媒体方面也走在前列，其在线平台和多媒体报道形式为传统媒体转型提供了范例。</p>",
        "website": "https://www.spiegel.de",
        "founded": "1947年",
        "headquarters": "汉堡"
    },
    "nytimes": {
        "title": "美国《纽约时报》 (The New York Times)",
        "summary": "《纽约时报》是美国最具影响力的报纸之一，以其高质量的新闻报道和深度分析而著称。",
        "content": "<h3>新闻权威</h3><p>《纽约时报》成立于1851年，是美国最具影响力的报纸之一，以其高质量的新闻报道和深度分析而著称。</p><h3>普利策奖</h3><p>该报获得了超过130个普利策奖，是获得该奖项最多的新闻机构，体现了其在新闻界的卓越地位。</p><h3>数字化转型</h3><p>《纽约时报》在数字化转型方面非常成功，其数字订阅模式为传统媒体转型提供了成功范例。</p>",
        "website": "https://www.nytimes.com",
        "founded": "1851年",
        "headquarters": "纽约"
    },
    "cnn": {
        "title": "美国有线电视新闻网 (CNN)",
        "summary": "CNN是全球第一个24小时新闻频道，开创了全天候新闻播报的先河。",
        "content": "<h3>新闻革命</h3><p>CNN成立于1980年，是全球第一个24小时新闻频道，开创了全天候新闻播报的先河，彻底改变了新闻传播方式。</p><h3>全球覆盖</h3><p>CNN通过卫星和有线电视网络覆盖全球，其新闻报道和现场直播在全球范围内具有重要影响力。</p><h3>技术创新</h3><p>CNN在新闻技术方面一直处于领先地位，从早期的卫星直播到现在的数字媒体平台，始终引领新闻传播技术的发展。</p>",
        "website": "https://www.cnn.com",
        "founded": "1980年",
        "headquarters": "亚特兰大"
    },
    "washington-post": {
        "title": "美国《华盛顿邮报》 (The Washington Post)",
        "summary": "《华盛顿邮报》是美国首都最重要的报纸，以其政治新闻报道而著称。",
        "content": "<h3>政治中心</h3><p>《华盛顿邮报》位于美国政治中心华盛顿特区，是美国首都最重要的报纸，以其政治新闻报道而著称。</p><h3>水门事件</h3><p>该报因报道水门事件而闻名，这一报道最终导致尼克松总统辞职，体现了新闻媒体的监督作用。</p><h3>数字发展</h3><p>在数字时代，《华盛顿邮报》积极拥抱新技术，其在线平台和数字订阅服务在政治新闻领域占据重要地位。</p>",
        "website": "https://www.washingtonpost.com",
        "founded": "1877年",
        "headquarters": "华盛顿特区"
    },
    "o-globo": {
        "title": "巴西《环球报》 (O Globo)",
        "summary": "《环球报》是巴西最大的报纸之一，在巴西媒体界具有重要地位。",
        "content": "<h3>巴西媒体巨头</h3><p>《环球报》是巴西最大的报纸之一，隶属于环球集团，在巴西媒体界具有重要地位和影响力。</p><h3>新闻报道</h3><p>该报以其全面的新闻报道而著称，涵盖了政治、经济、社会、体育等各个领域，是巴西人了解国内外新闻的重要来源。</p><h3>媒体集团</h3><p>作为环球集团的一部分，《环球报》与环球电视台等媒体形成了强大的媒体帝国，在巴西媒体市场占据主导地位。</p>",
        "website": "https://oglobo.globo.com",
        "founded": "1925年",
        "headquarters": "里约热内卢"
    },
    "folha-sp": {
        "title": "巴西《圣保罗页报》 (Folha de S.Paulo)",
        "summary": "《圣保罗页报》是巴西最重要的报纸之一，以其独立的新闻报道而著称。",
        "content": "<h3>独立媒体</h3><p>《圣保罗页报》是巴西最重要的报纸之一，以其独立的新闻报道和批判性分析而著称。</p><h3>社会监督</h3><p>该报在巴西政治和社会议题上发挥了重要的监督作用，经常揭露腐败和不当行为。</p><h3>数字创新</h3><p>在数字媒体时代，《圣保罗页报》积极进行创新，其网站和数字平台在巴西数字媒体领域占据重要地位。</p>",
        "website": "https://www.folha.uol.com.br",
        "founded": "1921年",
        "headquarters": "圣保罗"
    },
    "daily-nation": {
        "title": "肯尼亚《国家日报》 (Daily Nation)",
        "summary": "《国家日报》是肯尼亚最大的英文日报，在东非地区具有重要影响力。",
        "content": "<h3>东非媒体</h3><p>《国家日报》是肯尼亚最大的英文日报，在东非地区具有重要影响力，是了解东非政治、经济和社会的重要窗口。</p><h3>新闻报道</h3><p>该报以其全面的新闻报道而著称，不仅关注肯尼亚国内新闻，还报道东非地区和国际新闻。</p><h3>媒体发展</h3><p>随着肯尼亚经济的发展，《国家日报》也在不断壮大，其数字平台和移动应用在肯尼亚媒体市场占据重要地位。</p>",
        "website": "https://www.nation.co.ke",
        "founded": "1960年",
        "headquarters": "内罗毕"
    },
    "news24": {
        "title": "南非News24",
        "summary": "News24是南非最大的新闻网站，是南非数字媒体的重要代表。",
        "content": "<h3>数字媒体先锋</h3><p>News24是南非最大的新闻网站，是南非数字媒体的重要代表，在非洲数字媒体领域具有重要地位。</p><h3>实时新闻</h3><p>该网站以其快速的新闻更新和实时报道而著称，是南非人获取最新新闻的重要平台。</p><h3>多媒体内容</h3><p>News24不仅提供文字新闻，还制作视频、播客等多媒体内容，为读者提供丰富的新闻体验。</p>",
        "website": "https://www.news24.com",
        "founded": "1998年",
        "headquarters": "开普敦"
    },
    "abc-australia": {
        "title": "澳大利亚广播公司 (ABC Australia)",
        "summary": "ABC是澳大利亚的公共广播机构，以其高质量的新闻报道和节目制作而著称。",
        "content": "<h3>公共广播</h3><p>ABC是澳大利亚的公共广播机构，不依赖商业广告，主要依靠政府拨款维持运营，这保证了其新闻报道的独立性。</p><h3>节目质量</h3><p>ABC以其高质量的新闻报道、纪录片和娱乐节目而著称，是澳大利亚最重要的媒体机构之一。</p><h3>国际服务</h3><p>通过ABC Australia，ABC向亚太地区提供新闻和节目，是澳大利亚对外传播的重要平台。</p>",
        "website": "https://www.abc.net.au",
        "founded": "1932年",
        "headquarters": "悉尼"
    },
    "sydney-morning-herald": {
        "title": "悉尼先驱晨报 (The Sydney Morning Herald)",
        "summary": "《悉尼先驱晨报》是澳大利亚历史最悠久的报纸之一，在澳大利亚媒体界具有重要地位。",
        "content": "<h3>历史传统</h3><p>《悉尼先驱晨报》成立于1831年，是澳大利亚历史最悠久的报纸之一，在澳大利亚媒体界具有重要地位。</p><h3>新闻报道</h3><p>该报以其全面的新闻报道和深度分析而著称，是澳大利亚人了解国内外新闻的重要来源。</p><h3>数字化转型</h3><p>面对数字媒体的挑战，《悉尼先驱晨报》积极进行数字化转型，其网站和数字订阅服务在澳大利亚媒体市场占据重要地位。</p>",
        "website": "https://www.smh.com.au",
        "founded": "1831年",
        "headquarters": "悉尼"
    },
    "polar-research": {
        "title": "极地研究公告 (Polar Research Bulletin)",
        "summary": "极地研究公告是专注于极地科学研究的学术期刊，为极地科学研究提供重要平台。",
        "content": "<h3>学术期刊</h3><p>极地研究公告是专注于极地科学研究的学术期刊，为极地科学研究提供重要平台，发表最新的极地研究成果。</p><h3>科学研究</h3><p>该期刊涵盖了极地气候、生态、地质、海洋等各个科学领域的研究，是极地科学研究的重要参考。</p><h3>国际合作</h3><p>极地研究公告促进了国际极地科学研究的合作与交流，为全球极地科学研究的发展做出了重要贡献。</p>",
        "website": "https://polarresearch.net",
        "founded": "1982年",
        "headquarters": "奥斯陆"
    }
};
