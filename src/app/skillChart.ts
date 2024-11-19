import ApexCharts from 'apexcharts';
import { GraphQLService } from './dataFetching';
import { processUserSkillsData } from './helpers';

// Function to render both radar charts with the the required data
export async function renderSkillsCharts() {
    const graphQLService = new GraphQLService();

    const [userTechnologies, STerror] = await graphQLService.getUserTechnologies();
    if (STerror !== null) {
        console.error(STerror);
    }

    const [userTechnicalSkills, Serror] = await graphQLService.getUserTechnicalSkills();
    if (Serror !== null) {
        console.error(Serror);
    }

    let amountTECH: number[] | null = null;
    let labTECH: string[] | null = null;
    if (userTechnologies) {
        [amountTECH, labTECH] = processUserSkillsData(userTechnologies);
        renderChartCard(labTECH, amountTECH);
    }

    let amount: number[] | null = null;
    let lab: string[] | null = null;
    if (userTechnicalSkills) {
        [amount, lab] = processUserSkillsData(userTechnicalSkills);
        renderChartCard(lab, amount);
    }
}

// Function to generate the chart
export function renderChartCard(labelsGp: string[], DataGp: number[]) {
    const app = document.getElementById("lowDiv");
    if (!app) {
        console.error("Profile container not found!");
        return;
    }

    const card = document.createElement('div');
    card.className = 'cardSKG';

    const header = document.createElement('div');
    header.className = 'headerSKG';

    const title = document.createElement('h2');
    title.className = 'titleSKG';

    if (labelsGp.some((str) => str.includes("css"))) {
        title.textContent = 'Technologies Skills';
    } else {
        title.textContent = 'Technical Skills';
    }

    header.appendChild(title);

    const description = document.createElement('p');
    description.className = 'descriptionSKG';
    description.textContent = 'Here are your skills with the highest completion rate among all categories.';

    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-container-SKG';

    const chartDiv = document.createElement('div');
    chartDiv.id = 'radarChart';
    chartContainer.appendChild(chartDiv);

    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(chartContainer);

    app.append(card);

    const options = {
        chart: {
            toolbar: {
                show: false,
            },
            type: 'radar',
            height: '100%',
            width: '100%'
        },
        series: [{
            name: 'Skills',
            data: DataGp
        }],
        labels: labelsGp,
        plotOptions: {
            radar: {
                size: 130,
                polygons: {
                    strokeColor: '#2e3c4c',
                    fill: {
                        colors: ['rgba(128, 0, 128, 0.5)', 'rgba(128, 0, 128, 0.7)']
                    }
                },
                connectorColors: '#444',
                radialLines: {
                    show: true
                }
            }
        },
        yaxis: {
            show: true,
            tickAmount: 4,
            min: 0,
            max: 100,
            labels: {
                show: true,
                formatter: function () {
                    return "";
                },
            }
        },
        stroke: {
            show: false,
            width: 2,
            colors: ['rgba(128, 0, 128, 0.7)']
        },
        fill: {
            opacity: 0.6
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            marker: {
                fillColors: ['rgba(128, 0, 128, 0.7)']
            },
            style: {
                fontSize: '12px',
                colors: ['#FFFFFF']
            },
            y: {
                formatter: function (val: number) {
                    return val + "%";
                }
            }
        }
    };

    const chart = new ApexCharts(chartDiv, options);
    chart.render();
}
