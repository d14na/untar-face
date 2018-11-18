class ZeroApp extends ZeroApi {
    setSiteInfo(_siteInfo) {
        /* Set Zer0net summary details. */
        App.ziteAddress = _siteInfo.address
        App.zitePeers = _siteInfo.peers
        App.ziteSize = _siteInfo.settings.size
    }

    onOpen() {
        /* Call super. */
        super.onOpen()

        this.cmd('siteInfo', [], function (_siteInfo) {
            Zero.setSiteInfo(_siteInfo)
        })
    }

    onEvent(_event, _message) {
        if (_event === 'setSiteInfo') {
            this.setSiteInfo(_message.params)
        } else {
            this._log('Unknown event:', _event)
        }
    }
}

/**
 * Vue Application Manager (Configuration)
 */
const vueAppManager = {
    el: '#app',
    data: () => ({
        /* ZeroApp / ZeroApi Manager */
        zero: null,

        /* App Summary */
        appTitle: 'Untar',
        appDesc: 'Zer0net Archives',

        /* Zite Summary */
        ziteAddress: 'n/a',
        zitePeers: 0,
        ziteSize: 0,

        /* Search Results */
        shares: []
    }),
    mounted: function () {
        /* Initialize application. */
        this._init()
    },
    computed: {
        // TODO
    },
    methods: {
        _init: function () {
            /* Initialize new Zer0net app manager. */
            // NOTE Globally accessible (e.g. Zero.cmd(...))
            window.Zero = new ZeroApp()

            console.info('App.() & Zero.() have loaded successfully!')

            this.shares.push({
                filename: 'Zeronet-Meta-20181118.tar.gz',
                dateCreated: '11/18/2018',
                fileSize: '523.28 MiB',
                flag: 'badge-success',
                status: 'Now Available',
                counts: '4 | 18 | 51'
            })

            this.shares.push({
                filename: 'Zeronet-Meta-20181117.tar.gz',
                dateCreated: '11/17/2018',
                fileSize: '521.66 MiB',
                flag: 'badge-success',
                status: 'Now Available',
                counts: '4 | 18 | 51'
            })

            this.shares.push({
                filename: 'Zeronet-Meta-20181116.tar.gz',
                dateCreated: '11/16/2018',
                fileSize: '521.18 MiB',
                flag: 'badge-success',
                status: 'Now Available',
                counts: '4 | 18 | 51'
            })

            this.shares.push({
                filename: 'Zeronet-Meta-20181115.tar.gz',
                dateCreated: '11/15/2018',
                fileSize: '516.93 MiB',
                flag: 'badge-danger',
                status: 'No Seeds',
                counts: '0 | 0 | 0'
            })

        }
    }
}

/* Initialize the Vue app manager. */
const App = new Vue(vueAppManager)


/**
* Theme: Adminto Admin Template
* Author: Coderthemes
* Dashboard
*/

!function($) {
    'use strict';

    var Dashboard1 = function() {
    	this.$realData = []
    };

    //creates area chart with dotted
    Dashboard1.prototype.createAreaChartDotted = function(element, pointSize, lineWidth, data, xkey, ykeys, labels, Pfillcolor, Pstockcolor, lineColors) {
        Morris.Area({
            element: element,
            pointSize: 3,
            lineWidth: 1,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            hideHover: 'auto',
            pointFillColors: Pfillcolor,
            pointStrokeColors: Pstockcolor,
            resize: true,
            gridLineColor: '#2f3e47',
            gridTextColor: '#98a6ad',
            lineColors: lineColors,
            parseTime: false,
            postUnits: 'K'
        });
    },

    //creates Stacked chart
    Dashboard1.prototype.createStackedChart = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: true,
            labels: labels,
            hideHover: 'auto',
            resize: true, //defaulted to true
            gridLineColor: '#2f3e47',
            gridTextColor: '#98a6ad',
            barColors: lineColors,
            parseTime: false,
            postUnits: ' MiB'
        });
    },

    //creates Donut chart
    Dashboard1.prototype.createDonutChart = function (element, data, colors) {
        return Morris.Donut({
            element: element,
            data: data,
            resize: true, //defaulted to true
            colors: colors,
            backgroundColor: '#2f3e47',
            labelColor: '#fff'
        });
    },


    Dashboard1.prototype.init = function() {
        var $areaDotData = [
            { y: 'Jul', a: 5,  b: 4 },
            { y: 'Aug', a: 7.5,  b: 6.5 },
            { y: 'Sep', a: 5,  b: 4 },
            { y: 'Oct', a: 7.5,  b: 6.5 },
            { y: 'Nov', a: 9, b: 6 }
        ];
        this.createAreaChartDotted('morris-area-with-dotted', 0, 0, $areaDotData, 'y', ['a', 'b'], ['Leechers', 'Seeders'],['#ffffff'],['#999999'], ['#5b69bc', "#35b8e0"]);

        //creating Stacked chart
        var $stckedData  = [
            { y: 'May', a: 35.1, v: 100.5, i: 65, o: 20.4 },
            { y: 'Jun', a: 45.4,  v: 165.2, i: 75, o: 30.2 },
            { y: 'Jul', a: 50.6,  v: 140.9, i: 65, o: 35.6 },
            { y: 'Aug', a: 35.2,  v: 165.5, i: 85, o: 40.0 },
            { y: 'Sep', a: 50.6,  v: 140.8, i: 95, o: 40.2 },
            { y: 'Oct', a: 65.8,  v: 165.5, i: 115, o: 40.6 },
            { y: 'Nov', a: 70.4, v: 190.1, i: 125, o: 45.1 }
        ];
        this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'v', 'i', 'o'], ['Audio', 'Video', 'Images', 'Other'], ['#71b6f9', '#be2ffe', '#71f9b6', '#ebeff2']);

        //creating donut chart
        var $donutData = [
            { label: 'Zites', value: 77 },
            { label: '', value: 23 }
        ];
        var ret = this.createDonutChart('morris-peer-updates', $donutData, ['#5b69bc', '#ffcc8a'])
        ret.select(0)

        //creating donut chart
        var $donutData = [
            { label: 'Zites', value: 11 },
            { label: '', value: 89 }
        ];
        var ret = this.createDonutChart('morris-crypto-txs', $donutData, ['#5b69bc', '#ffcc8a'])
        ret.select(0)

        //creating donut chart
        var $donutData = [
            { label: 'Zites', value: 39 },
            { label: '', value: 61 }
        ];
        var ret = this.createDonutChart('morris-new-users', $donutData, ['#5b69bc', '#ffcc8a'])
        ret.select(0)

        //creating donut chart
        var $donutData = [
            { label: 'Zite Updates', value: 12 },
            { label: 'Live Social', value: 30 },
            { label: 'Blog Posts', value: 20 }
        ];
        this.createDonutChart('morris-donut-example', $donutData, ['#ff8acc', '#5b69bc', "#ffcc8a"])
    },
    //init
    $.Dashboard1 = new Dashboard1, $.Dashboard1.Constructor = Dashboard1
}(window.jQuery),

//initializing
function ($) {
    'use strict'

    $.Dashboard1.init()
}(window.jQuery)
