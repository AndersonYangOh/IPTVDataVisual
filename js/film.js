var ratiochart = echarts.init(document.getElementById("filmratio"));
var dischart = echarts.init(document.getElementById("filmdis"));

var daydata = [
    {
        name: '比得兔 第二季1',
        value: 87364
    },
    {
        name: '择天记 TV版 1',
        value: 40980
    },
    {
        name: '超级飞侠大百科 第一季1',
        value: 38278
    },
    {
        name: '海绵宝宝',
        value: 36745
    },
    {
        name: '图腾领域1',
        value: 35902
    }
];

var nightdata = [
    {
        name: '比得兔 第二季1',
        value: 41184
    },
    {
        name: '择天记 TV版 1',
        value: 23664
    },
    {
        name: '海绵宝宝',
        value: 18413
    },
    {
        name: '秦时丽人明月心 1',
        value: 18357
    },
    {
        name: '战狼',
        value: 17071
    }
];
function convertDNdata(data) {
    var sum = 0;
    var res = [];
    for(var i =0; i < data.length; i++){
        sum = sum + data[i].value;
    }
    for(var j =0; j < data.length; j++){
        res.push({
            name: data[j].name,
            value: data[j].value/sum
        })
    }
    return res.sort(function (a, b) {
        return a.value - b.value;
    })
}

var ratiodata = {
    '比得兔 第二季1': [74598,53950,506248],
    '择天记 TV版 1': [15609,49035,570152],
    '超级飞侠大百科 第一季1': [40364,14447,579985],
    '海绵宝宝': [5278,49880,579638],
    '图腾领域1': [805,50617,583374],
    '秦时丽人明月心 1': [676,45771,588349],
    '战狼': [4735,34488,595573]
};

function convertRatiodata(data) {
    var colors = ['#6699CC', '#aaaaaa', '#888888'];
    var rationanme = ['完整观看','观看不完整','未观看'];
    var res =[];
    for(var i = 0; i < data.length; i++){
        res.push({
            name: rationanme[i],
            value: data[i],
            itemStyle: {color: colors[i]}
        });
    }
    res[0].selected = true;
    return res;
}

var bb = convertDNdata(daydata);
var cc = convertDNdata(nightdata);

var ratiooption = {
    title: {
        text: '节目观看完整度',
        left: 'center',
        textStyle: {
            color: 'rgb(51, 122, 183)',
            fontFamily: 'Microsoft YaHei',
            fontSize: 18
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {d}%"
    },
    legend: {
        bottom: 10,
        textStyle: {
            color: '#fff'
        },
        data:['完整观看','观看不完整','未观看']
    },
    series : [
        {
            name:'节目观看完整度',
            type:'pie',
            radius : [0, '70%'],
            center : ['50%', '50%'],
            selectedOffset: 15,
            label: {
                show: true,
                formatter: "{b}",
                color: '#FFF',
                fontFamily: 'Microsoft YaHei'
            },
            labelLine: {
                show: true,
                length: 5,
                length2: 10
            },
            data: [
                {
                    name:'完整观看',
                    value:50,
                    itemStyle: {
                        color: '#6699CC'
                    }
                },
                {
                    name:'观看不完整',
                    value:20,
                    itemStyle: {
                        color: '#aaaaaa'
                    }
                },
                {
                    name:'未观看',
                    value:10,
                    itemStyle: {
                        color: '#888888'
                    }
                }
            ]
        }]
};

var disoption = {
    title: {
        text: '节目观看时间分布',
        left: 'center',
        textStyle: {
            color: 'rgb(51, 122, 183)',
            fontFamily: 'Microsoft YaHei',
            fontSize: 18
        }
    },
    series: [{
        type: 'sunburst',
        center: ['50%', '50%'],
        radius: [0, '95%'],
        sort: null,
        nodeClick: false,
        data: [
            {
                name: '白天',
                children: bb
            },
            {
                name: '晚上',
                children: cc
            }
        ],
        itemStyle: {
            borderColor: '#333333',
            borderWidth: 5
        },
        highlight: {
            itemStyle: {
                color: '#FF9900'
            }
        },
        downplay: {
            itemStyle: {
                color: '#666666'
            }

        },
        levels: [
            {},
            {
                r0: 0,
                r: 120,
                label: {
                    fontSize: 20,
                    rotate: 0,
                    textBorderColor: 'transparent'
                }
            },
            {
                r0: 120,
                r: 140,
                label: {
                    position: 'outside',
                    textBorderColor: 'transparent',
                    clickable: true
                }
            }
        ]
    }]
};
ratiochart.setOption(ratiooption);
dischart.setOption(disoption);

dischart.on('click',function (item) {
    var aa = convertRatiodata(ratiodata[item.name]);
    ratiochart.setOption({
        series: [{
            data: aa
        }]
    })
});

function getratio() {
    var filmselected = $("option:selected").text();
    var aa = convertRatiodata(ratiodata[filmselected]);
    ratiochart.setOption({
        series: [{
            data: aa
        }]
    })
}