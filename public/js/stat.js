fetch('/api/visitor')
    .then(response => response.json())
    .then(data => {
        const labels = data.labels;
        const values = data.values;

        const ctx = document.getElementById('visitorChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Количество посетителей',
                    data: values,
                    backgroundColor: 'rgba(77,197,78,0.2)',
                    borderColor: 'rgb(52,183,78)',
                    borderWidth: 1,
                    font: {
                        size: 20
                    }
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 16
                            }
                        },
                        max: 500
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 16
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });


// График 2


fetch('/api/movies/randomized')
    .then(response => response.json())
    .then(data => {
        const dates = data.map(item => item.date);
        const counts = data.map(item => item.count);

        const ctx = document.getElementById('moviesChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Зарандомлено фильмов',
                    data: counts,
                    fill: false,
                    borderColor: 'blue',
                    borderWidth: 2
                }]
            },
            options: {
                layout: {
                    padding: 20
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 16
                            }
                        },
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 16
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });

// График 3

fetch('/api/movies/top')
    .then(response => response.json())
    .then(data => {
        const topMoviesData = Object.values(data);
        const labels = ['IMDb', 'Кинопоиск'];

        const ctx = document.getElementById('topMoviesChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Посещений топов',
                    data: topMoviesData,
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });



//График 4

fetch('/api/movies/help')
    .then(response => response.json())
    .then(data => {
        const dates = data.map(item => item.date);
        const counts = data.map(item => item.count);

        const ctx = document.getElementById('helpChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Людям оказана помощь в выборе фильма',
                    data: counts,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 16
                            }
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 16
                            }
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                },
                indexAxis: 'y'
            }
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });


// График 5

fetch('/api/people/confusion')
    .then(response => response.json())
    .then(data => {
        const dates = data.map(item => item.date);
        const counts = data.map(item => item.count);

        const ctx = document.getElementById('confusionChart').getContext('2d');
        const confusionChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Люди, не знающие, чего хотят',
                    data: counts,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)', 
                    borderColor: 'rgba(255, 99, 132, 1)', 
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Количество людей'
                        },
                        ticks: {
                            font: {
                                size: 14
                            }
                        },
                        pointLabels: {
                            font: {
                                size: 18,
                            },
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                size: 20
                            }
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Ошибка загрузки данных:', error);
    });