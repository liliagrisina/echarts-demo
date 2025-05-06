import * as echarts from 'echarts/core'
import {GaugeChart, type GaugeSeriesOption} from 'echarts/charts';
import {PieChart, type PieSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

export function renderGauge(el: HTMLElement) {
    echarts.use([GaugeChart, PieChart, CanvasRenderer]);

    type EChartsOption = echarts.ComposeOption<GaugeSeriesOption|PieSeriesOption>;
    const myChart = echarts.init(el);
    let option: EChartsOption;

    const baseGaugeConfig: GaugeSeriesOption = {
        type: 'gauge',
        center: ['50%', '99%'],
        radius: '80%',
        min: 0,
        max: 100,
        startAngle: 180,
        endAngle: 0,
        splitNumber: 6
    };

    const axisLineWidth = 25;

    const axisTickDistance = 40;

    option = {
        series: [
            // 数据轨道刻度层
            {
                z: 1,
                ...baseGaugeConfig,
                axisLine: {
                    lineStyle: {
                        color: [[1, '#e8e8e8']],
                        width: axisLineWidth
                    }
                },
                splitLine: {show: false},
                axisTick: {
                    distance: -axisTickDistance,
                    length: 4,
                    lineStyle: {
                        color: '#e8e8e8',
                        width: 2
                    }
                },
                axisLabel: {show: false},
                progress: {
                    show: true,
                    width: axisLineWidth,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                {offset: 1, color: '#ffd776'},
                                {offset: 0, color: '#76bdff'}
                            ],
                            global: false
                        }
                    }
                },
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 12,
                    icon: 'circle',
                    keepAspect: false,
                    itemStyle: {color: '#43a0f7'}
                },
                pointer: {
                    offsetCenter: [0, 0],
                    icon: 'path://M3.905,-0.000 L3.905,-0.000 L6.903,36.1000 L4.904,48.1000 L4.904,48.1000 L2.906,48.1000 L2.906,48.1000 L0.907,36.1000 L3.905,-0.000 Z',
                    width: 6,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {offset: 0, color: '#69b2f590'},
                                {offset: 1, color: '#69b2f5'}
                            ],
                            global: false
                        }
                    }
                },
                detail: {show: false},
                data: [
                    {value: 50}
                ]
            },
            // 分割线层
            {
                z: 2,
                ...baseGaugeConfig,
                axisLine: {
                    lineStyle: {
                        color: [[1, 'transparent']],
                        width: axisLineWidth
                    }
                },
                splitLine: {
                    distance: -axisLineWidth,
                    length: axisLineWidth,
                    lineStyle: {
                        color: '#fff',
                        width: 4
                    }
                },
                axisTick: {show: false},
                axisLabel: {show: false},
                progress: {show: false}
            },
            // 高亮刻度层
            {
                z: 3,
                ...baseGaugeConfig,
                axisLine: {
                    lineStyle: {
                        color: [[1, 'transparent']],
                        width: axisLineWidth
                    }
                },
                splitLine: {
                    distance: -axisTickDistance - 3,
                    length: 8,
                    lineStyle: {
                        color: '#ffbe4d',
                        width: 2
                    }
                },
                axisTick: {show: false},
                axisLabel: {show: false},
                progress: {show: false}
            },
            // 外部曲线层
            {
                z: 4,
                type: 'pie',
                center: ['50%', '98%'],
                radius: '105%',
                animation: false,
                itemStyle: {
                    borderColor: '#edeffd',
                    borderWidth: 1
                },
                data: [
                    {value: 100, itemStyle: {color: 'transparent'}}
                ]
            },
            // 内部曲线层
            {
                z: 5,
                type: 'pie',
                center: ['50%', '100%'],
                radius: '50%',
                animation: false,
                itemStyle: {
                    borderColor: '#edeffd',
                    borderWidth: 1
                },
                data: [
                    {value: 100, itemStyle: {color: 'transparent'}}
                ]
            }
        ]
    };

    option && myChart.setOption(option);
}