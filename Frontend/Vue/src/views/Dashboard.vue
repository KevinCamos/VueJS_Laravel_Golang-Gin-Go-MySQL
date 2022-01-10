<template>
    <div class="d-flex flex-row justify-content-center">
        <div class="col-4 m-2 p-2 bg-light border border-danger rounded">
            <h3 class="text-center">Productos por categorias</h3>
            <vue3-chart-js
                :id="doughnutChart.id"
                ref="chartRef"
                :type="doughnutChart.type"
                :data="doughnutChart.data"
            ></vue3-chart-js>
        </div>
        <div class="col-8 m-2 p-2 bg-light border border-danger rounded">
            <h3 class="text-center">Productos mas pedidos</h3>
            <vue3-chart-js v-bind="{ ...barChart }" />
        </div>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
    name: 'App',
    components: {
        Vue3ChartJs,
    },
    setup () {
        const store = useStore();

        store.dispatch("chart/getProductsChart");
        store.dispatch("chart/getProductsOrderChart");

        const state = reactive({
            labels_doughnutChart: computed(() => store.getters["chart/getDoughnutChartLabels"]),
            data_doughnutChart: computed(() => store.getters["chart/getDoughnutChartData"]),
            labels_barChart: computed(() => store.getters["chart/getBarChartLabels"]),
            data_barChart: computed(() => store.getters["chart/getBarChartData"]),
        });

        const doughnutChart = {
            id: 'doughnut',
            type: 'doughnut',
            data: {
                labels: state.labels_doughnutChart,
                datasets: [
                    {
                        backgroundColor: [
                        '#41B883',
                        '#E46651',
                        '#00D8FF',
                        '#A46621',
                        '#B116E6',
                        '#E6DF16'
                        ],
                        data: state.data_doughnutChart
                    }
                ]
            }
        }

        const barChart = {
            type: "bar",
            options: {
                min: 0,
                max: 100,
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
                scales: {
                    y: {
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: function (value) {
                                return `${value}`;
                            },
                        },
                    },
                },
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true,
                            },
                            mode: "x",
                        },
                    },
                },
            },
            data: {
                labels: state.labels_barChart,
                datasets: [
                    {
                        backgroundColor: ["#1abc9c", "#f1c40f", "#2980b9", "#34495e"],
                        data: state.data_barChart,
                    },
                ],
            },
        };

        return { doughnutChart, barChart }
    },
}
</script>