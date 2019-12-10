var mapContainer = document.getElementById("map");
mapContainer.style.width = window.innerWidth+'px';
mapContainer.style.height = window.innerHeight+'px';
var myChart = echarts.init(document.getElementById("map"));
var geoCoordMap = {
    '上海': [121.4648,31.2891],
    '新疆': [87.9236,43.5883],
    '甘肃': [103.5901,36.3043],
    '北京': [116.4551,40.2539],
    '江苏': [118.8062,33.9208],/*[118.8062,31.9208],*/
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
    '河北': [115.4995,38.1006],/*[114.4995,38.1006],*/
    '福建': [119.4543,25.9222],
    '陕西': [109.1162,34.2004],
    '河南': [113.4668,34.6234],
    '吉林': [125.8154,44.2584],
    '重庆': [107.7539,30.1904],
    '青海': [99.4038,36.8207],/*[101.4038,36.8207],*/
    '湖南': [113.0823,28.2568],
    '浙江': [119.5313,29.8773],
    '云南': [102.9199,25.4663],
    '海南': [110.3893,19.8516],
    '四川': [103.9526,30.7617],
    '贵州': [106.6992,26.7682],
    '宁夏': [106.3586,38.1775],
};

var datatotal = {
    '上海': 0,
    '新疆': 0,
    '甘肃': 0,
    '北京': 0,
    '江苏': 0,
    '广西': 0,
    '江西': 0,
    '安徽': 0,
    '天津': 0,
    '山西': 0,
    '广州': 0,
    '西藏': 0,
    '湖北': 0,
    '辽宁': 0,
    '山东': 0,
    '河北': 0,
    '福建': 0,
    '陕西': 0,
    '河南': 0,
    '吉林': 0,
    '重庆': 0,
    '青海': 0,
    '湖南': 0,
    '浙江': 0,
    '云南': 0,
    '海南': 0,
    '四川': 0,
    '贵州': 0,
    '宁夏': 0,
    '内蒙古': 0,
    '黑龙江': 0,
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
function convertDatatotal (data) {
    var res = [];
    for (var i = 0; i < data.length; i++){
        var province = data[i].name;
        datatotal[province] += parseInt(data[i].value);
    };
    var keys = Object.keys(datatotal);
    for (var i = 0; i < keys.length; i++){
        var geoCoord = geoCoordMap[keys[i]];
        res.push({
                name: keys[i],
                value: geoCoord.concat(datatotal[keys[i]])
            });

    } ;
    return res;
};

myChart.setOption ({
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
            /*lineHeight有效的前提是存在rich:{}，即使rich:{},为空*/
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
        show: false,
        trigger: 'item',
        formatter: function(params){
            return params.name+':'+params.value[2];
        }    
    },
    legend: {
        orient: 'vertical',
        y: 'bottom',
        x:'right',
        data:['iptv-login','login-total'],
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
            name: 'iptv-login',            
            coordinateSystem: 'bmap',
            legendHoverLink: false,
            data: [],
            symbol: 'circle',
            symbolSize: 40,
            /*symbolSize: function (val) {
                return val[2] / 3;
            },*/
            label: {
                normal: {
                    //formatter: '{b}',
                    formatter: function(val){
                        return  val.name;  /*+':'+val.value[2]*/
                    },
                    position: 'right',
                    show: false,
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
            animationDuration: 700,
        },
        {
            type: 'scatter',
            name: 'login-total',            
            coordinateSystem: 'bmap',
            data: [], 
            symbol: 'circle',
            symbolSize: 1,
            label: {
                show: true,
                position: 'top',
                formatter: function(val){
                    return  val.name + ':' + val.value[2];  
                },             
                color: '#FFFF44',
                fontFamily: 'Microsoft YaHei',
                fontSize: 13,

            },
            emphasis: {
                label: {
                    show: false,
                    position: 'left',
                    formatter: function(val){
                        return  val.name + ':' + val.value[2];  
                    },             
                    color: '#FFFF44',
                    fontFamily: 'Microsoft YaHei',
                    fontSize: 20,
                },
            },

        },
    ],
});

var id = 0 ;
setInterval(function (){
    $.get('data.json').done(function(data){ 
        var data1 = JSON.parse(data);
        var datade = deunicodeData(data1);
        var datalogin = convertData(datade);
        var datat = convertDatatotal(datade);
        console.log(datat);
        console.log(datalogin);
        /*for(var i = 0; i < datalogin.length; i++){
            datalogin[i].value[2] = datalogin[i].value[2] + 10;
        };*/
        id = id + 1;
        myChart.setOption({
            series: [
                {
                    name: 'iptv-login',
                    data: datalogin,
                },
                {
                    name: 'login-total',
                    data: datat,
                }
            ],
        });
        setTimeout(function(){
            datalogin = [];
            myChart.setOption({
                series: [
                    {
                        name: 'iptv-login',
                        data: datalogin,
                    },
                ],
            });
        },700);
        
    });
},1000);


/*'http://10.0.112.34/tv_center/get_login_log.php?id=' + id*/