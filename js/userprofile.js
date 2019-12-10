var user1wordChart = echarts.init(document.getElementById("user1word"));
/*var user1radarChart = echarts.init(document.getElementById("user1radar"));*/

var usernameToId = {
    "user1":'25550022415',
    "user2":'085200759123',
    "user3":'24018226394',
    "user4":'1014781901',
    "user5":'057601028353',
    "user6":'25535135416',
    "user7":'5710205',
    "user8":'1120478512',
    "user9":'25550017590',
};

/*对取到的json文件进行unicode解码*/
function deunicodeData(data){
    for (var i = 0; i < data.length; i++) {
        var str = data[i].name;
        data[i].name = decodeURI(str.replace(/\\u/g, '%u'));
        data[i].value = parseInt(data[i].value);
    }
    return data;
}
function deunicodeData2(data){
    for (var i = 0; i < data.length; i++) {
        var str = data[i].name;
        data[i].name = decodeURI(str.replace(/\\u/g, '%u'));
    }
    return data;
}

/*对取到的数据转换为雷达图表所需数据进行处理*/
function convertRadardata(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        res.push(data[i].value);
    }
    return res;
}
function converRadarindicator(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        res.push({
            name: data[i].name,
            max: 30
        });
    }
    return res;
}

var humanImage = new Image();

var userwordOption = {
    title: {
        text: '用户已观看',
        textStyle: {
            color: 'rgb(51, 122, 183)',
            fontFamily: 'Microsoft YaHei',
            fontSize: 18
        },
        left: 'center'
    },
    series: [{
        type: 'wordCloud',
        width: '90%',
        height: '90%',
        sizeRange: [6, 35],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 2,
        shape: 'pentagon',
        /*maskImage: maskImage,*/
        textStyle: {
            normal: {
                fontFamily: 'Microsoft YaHei',
                fontWeight: 'bold',
                // Color can be a callback function or a color string
                color: function () {
                    return 'rgb(' + [
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256),
                        Math.floor(Math.random() * 256)/*,
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)*/
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 5,
                shadowColor: '#333'
            }
        },
        data: [
            {name: '恋爱回旋',value: 120},
            {name: '约瑟夫之子',value: 80},
            {name: '伯德小姐 ',value: 100},
            {name: '芳华',value: 130},
            {name: '红海行动',value: 300},
            {name: '至暗时刻',value: 500},
            {name: '水形物语',value: 600},
            {name: '教父',value: 1000},
            {name: '龙猫',value: 500},
            {name: '无间道',value: 400}
        ]
    }]
};
var userradarOption = {
    title: {
        text: '推荐用户观看',
        textStyle: {
            color: 'rgb(51, 122, 183)',
            fontFamily: 'Microsoft YaHei',
            fontSize: 20
        },
        left: 'center'
    },
    tooltip: {
        textStyle: {
            align: 'left'
        }
    },
    legend: {
        bottom: 20,
        itemWidth: 12,
        itemHeight: 12,
        data: [{
            name: 'User Recommend TOP Value',
            icon: 'roundRect'
        }],
        textStyle: {
            color: '#fff'
        }
    },
    radar: {
        radius: '60%',
        splitNumber: 6,
        name:{
            fontFamily: 'Microsoft YaHei',
            fontSize: 16
        },
        axisLine: {
            lineStyle: {
                color: '#fff',
                opacity: .2
            }
        },
        splitLine: {
            lineStyle: {
                color: '#fff',
                opacity: .2
            }
        },
        splitArea: {
            show: true,
            areaStyle:{
                color: 'rgba(102,102,102,0.2)'
            }
        },
        indicator:[
            { name: '肖申克的救赎', max: 6500 },
            { name: '霸王别姬', max: 6500 },
            { name: '这个杀手不太冷', max: 6500 },
            { name: '阿甘正传', max: 6500 },
            { name: '美丽人生', max: 6500 },
            { name: '千里千寻', max: 6500 }
        ]
    },
    series: [{
        name: 'User Recommend TOP Value',
        type: 'radar',
        symbolSize: 0,
        itemStyle: {
            color: 'rgb(215,0,15)'
        },
        lineStyle: {
            color: 'rgb(215,0,15)',
            width: 1,
            type: 'solid'
        },
        areaStyle: {
            color: 'rgb(215,0,15)',
            shadowBlur: 13,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1
        },
        data: [{
              value: [5000, 3000, 1000, 1000, 5000, 4000]
        }]
    }]
};


humanImage.onload = function () {
    userwordOption.series[0].maskImage = humanImage;
    user1wordChart.setOption(userwordOption);
};
humanImage.src = './image/person.png';
/*user1radarChart.setOption(userradarOption);*/

window.onresize = function(){
    /*user1radarChart.resize();*/
    user1wordChart.resize(); 
};

function getUserprofile() {
    var userselected = $("option:selected").text();
    var userID = usernameToId[userselected];
    $.get(userselected + '.json').done(function(data){
        userwordOption.series[0].data = deunicodeData(data);
        user1wordChart.setOption(userwordOption);
    });
    $.get('http://10.1.104.132/tv_center/get_recommend.php?id=' + userID).done(function(data){
        var posterdata = deunicodeData2(JSON.parse(data));
	console.log(posterdata);
        $(".img-poster").each(function (index) {
           $(this).attr("src", posterdata[index].value);
        });
	$(".caption h4").each(function (index) {
            $(this).text(posterdata[index].name);
        })
    });
}



/*词云接口：http://10.0.112.19/tv_center/get_ciyun.php?id=userid
推荐接口：http://10.0.112.19/tv_center/get_recommend.php?id=userid*/
