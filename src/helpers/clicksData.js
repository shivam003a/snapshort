import moment from "moment";

export function getBrowserTypes(clicks) {
    const browserArray = clicks?.map((click) => {
        return click?.browser
    })
    const browserSetArray = [...new Set(browserArray)]
    return browserSetArray;
}

export function getOsTypes(clicks) {
    const osArray = clicks?.map((click) => {
        return click?.os
    })
    const osSetArray = [...new Set(osArray)]
    return osSetArray;
}

export function getDeviceTypes(clicks) {
    const deviceArray = clicks?.map((click) => {
        return click?.device
    })
    const deviceSetArray = [...new Set(deviceArray)]
    return deviceSetArray;
}

export function getDeviceChartData(clicks) {
    const deviceCounts = clicks.reduce((acc, click) => {
        const deviceType = click.device || "Unknown";
        acc[deviceType] = (acc[deviceType] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(deviceCounts);
    const values = Object.values(deviceCounts);

    const pieData = {
        labels: labels || [''],
        datasets: [
            {
                label: 'Device Usage',
                data: values || [0],
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                borderWidth: 1,
            },
        ],
    };
    return pieData
}

export function getOsChartData(clicks) {
    const osCounts = clicks.reduce((acc, click) => {
        const osType = click.os || "Unknown";
        acc[osType] = (acc[osType] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(osCounts);
    const values = Object.values(osCounts);

    const pieData = {
        labels: labels || [''],
        datasets: [
            {
                label: 'Os Types',
                data: values || [0],
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                borderWidth: 1,
            },
        ],
    };
    return pieData
}

export function getBrowserChartData(clicks) {
    const bsCounts = clicks.reduce((acc, click) => {
        const bsType = click.browser || "Unknown";
        acc[bsType] = (acc[bsType] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(bsCounts);
    const values = Object.values(bsCounts);

    const pieData = {
        labels: labels || [''],
        datasets: [
            {
                label: 'Browser Usage',
                data: values || [0],
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                borderWidth: 1,
            },
        ],
    };
    return pieData
}

export function getTodayVisitData(clicks, type) {
    let startDate, endDate, format;

    if (type === 'month') {
        startDate = moment().startOf('month');
        endDate = moment().endOf('month');
        format = 'YYYY-MM-DD';
    } else if (type === 'week') {
        startDate = moment().startOf('isoWeek');
        endDate = moment().endOf('isoWeek');
        format = 'YYYY-MM-DD';
    } else {
        startDate = moment().startOf("day");
        endDate = moment().add(1, "day");
        format = 'HH:00';
    }

    const totalClicks = clicks.filter(click =>
        moment(click.timestamp).isBetween(startDate, endDate, null, '[]')
    );

    const grouped = {};
    totalClicks.forEach(click => {
        const key = moment(click.timestamp).format(format);
        grouped[key] = (grouped[key] || 0) + 1;
    });

    let labels = [];

    if (type === 'day') {
        labels = Array.from({ length: 24 }, (_, i) =>
            String(i).padStart(2, "0") + ":00"
        );
    } else {
        const days = endDate.diff(startDate, 'days') + 1;
        labels = Array.from({ length: days }, (_, i) =>
            moment(startDate).add(i, 'days').format('YYYY-MM-DD')
        );
    }

    const data = labels.map(label => grouped[label] || 0);

    return {
        labels,
        datasets: [
            {
                label: `Visits This ${type}`,
                data,
                backgroundColor: "#10B981",
            },
        ],
    };
}
