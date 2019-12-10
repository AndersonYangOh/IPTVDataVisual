var mapContainer = document.getElementById("map");
mapContainer.style.width = window.innerWidth+'px';
mapContainer.style.height = window.innerHeight+'px';
var myChart = echarts.init(document.getElementById("map"));
var geoCoordMap = {
    '上海': [121.4648,31.2891],
    '新疆': [87.9236,43.5883],
    '甘肃': [103.5901,36.3043],
    '北京': [116.4551,40.2539],
    '江苏': [118.8062,31.9208],
    '广西': [108.479,23.1152],
    '江西': [116.0046,28.6633],
    '安徽': [117.29,32.0581],
    '内蒙古': [111.4124,40.4901],
    '黑龙江': [127.9688,45.368],
    '天津': [117.4219,39.4189],
    '山西': [112.3352,37.9413],
    '广州': [113.5107,23.2196],
    '西藏': [91.1865,30.1465],
    '湖北': [114.3896,30.6628],
    '辽宁': [123.1238,42.1216],
    '山东': [117.1582,36.8701],
    '河北': [114.4995,38.1006],
    '福建': [119.4543,25.9222],
    '陕西': [109.1162,34.2004],
    '河南': [113.4668,34.6234],
    '吉林': [125.8154,44.2584],
    '重庆': [107.7539,30.1904],
    '广西': [101.4038,36.8207],
    '湖南': [113.0823,28.2568],
    '浙江': [119.5313,29.8773],
    '云南': [102.9199,25.4663],
    '海南': [110.3893,19.8516],
    '四川': [103.9526,30.7617],
    '贵州': [106.6992,26.7682],
    '宁夏': [106.3586,38.1775],
};

/*对取到的json文件进行unicode解码*/
function deunicodeData(data){
    for (var i = 0; i < data.length; i++) {
        var str = data[i].name;
        data[i].name = unescape(str.replace(/\\u/g, '%u'));
        };
    return data;
};
function convertData (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

myChart.setOption({
    title: {
        text: '中 国 联 通 研 究 院\n云 计 算 研 究 中 心 创 新 工 作',
        subtext: 'IPTV增值业务中心',
        sublink: '',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#fff',
            fontFamily: 'Microsoft YaHei',
            fontWeight: 400,
            fontSize: 26,
            /*lineHeight有效的前提是存在rich:{}，即使rich:{}为空*/
            lineHeight: 30,
            rich: {},
        },
        subtextStyle: {
            color: '#fff',
            fontFamily: 'Microsoft YaHei',
            fontSize: 18,
        },
        itemGap: 35,
    },
    tooltip : {
        trigger: 'item',
        /*alwaysShowContent: true,*/
        //formatter: '{a}<br />{b}: {c}'
        formatter: function(params){
            return params.name+':'+params.value[2];
        }    
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['iptv登陆'],
        textStyle: {
            color: '#fff'
        }
    },
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: false,
        mapStyle: {
            styleJson: [
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": {
    
                            "color": "#044061"
                        }
                    },
                    {
                        "featureType": "land",
                        "elementType": "all",
                        "stylers": {
                            "color": "#081634"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry",
                        "stylers": {
                            "visibility": "on"
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.stroke",
                        "stylers": {
                            "color": "#cccccc",
                            "lightness": 20
                        }
                    },
                    {
                        "featureType": "boundary",
                        "elementType": "geometry.fill",
                        "stylers": {
                            "color": "#444444"
                        }
                    },
                    {
                        "featureType": "poilabel",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "green",
                        "elementType": "all",
                        "stylers": {
                            "color": "#056197",
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "manmade",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "building",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "city",
                        "elementType": "labels.text.fill",
                        "stylers": {
                                  "color": "#eeeeeeff",
                                  "visibility": "off",
                        }
                    },
                    {
                        "featureType": "city",
                        "elementType": "labels.icon",
                        "stylers": {
                                  "visibility": "off"
                        }
                    },
                    {
                        "featureType": "continent",
                        "elementType": "all",
                        "stylers": {
                              "visibility": "off"
                        }
                    },
                    {
                        "featureType": "country",
                        "elementType": "all",
                        "stylers": {
                              "visibility": "off"
                        }
                    },
                    {
                        "featureType": "district",
                        "elementType": "all",
                        "stylers": {
                              "visibility": "off"
                        }
                    },
                    {
                        "featureType": "town",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },
                    {
                        "featureType": "districtlabel",
                        "elementType": "all",
                        "stylers": {
                            "visibility": "off"
                        }
                    },

            ],
        },
    },
    series : [
        {
            type: 'scatter',
            name: 'iptv-num',            
            coordinateSystem: 'bmap',
            legendHoverLink: false,
            data: [],
            symbol: 'circle',
            symbolSize: function (val) {
                return val[2] / 3;
            },
            label: {
                normal: {
                    //formatter: '{b}',
                    formatter: function(val){
                        return  val.name;   //+':'+val.value[2];
                    },
                    position: 'right',
                    show: true,
                    color: '#FFFF44'
                },
                emphasis: {
                    show: false,
                    color: '#FFFF38'
                }
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                        { offset: 0, color: 'transparent'}, // 0% 处的颜色
                        { offset: 1, color: '#F2B705'} // 100% 处的颜色
                        ],
                        globalCoord: false
                    }
                }
            },
            animationDurationUpdate: 500,
        },
    ],
});



/*setInterval(function (){
    var rancitynum = parseInt(Math.random() * 30);
    condata[rancitynum].value[2] = condata[rancitynum].value[2] + 100;
    myChart.setOption(option);
    setTimeout(function(){
        condata[rancitynum].value[2] = 0;
        myChart.setOption(option);
    },800);      
},3000);*/


var id = 0 ;
setInterval(function (){
    $.get('data.json').done(function(data){
        var data1 = JSON.parse(data); 
        var dataf = convertData(deunicodeData(data1));
        for(var i = 0; i < dataf.length; i++){
            dataf[i].value[2] = dataf[i].value[2] +10;
        };
        id = id + 1;
        myChart.setOption({
            series: [
                {
                    data: dataf,
                },
            ],
        });
        setTimeout(function(){
            dataf = [];
            myChart.setOption({
                series: [
                    {
                        data: dataf,
                    },
                ],
            });
        },500);
    });
},1000);


