import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { tap, withLatestFrom } from 'rxjs';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-vaccination-statistics',
    templateUrl: './vaccination-statistics.component.html',
    styleUrls: ['./vaccination-statistics.component.scss']
})
export class VaccinationStatisticsComponent implements OnInit {

    constructor(
        private examinationsService: ExaminationService
    ) { }

    vaccines = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: []
    }

    vaccinesOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef',
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef',
                }
            },
        }
    }

    countOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    }

    countData = {
        labels: [],
        datasets: []
    };

    private COLORS_BY_INDEX = {
        0: '#6366F1',
        1: '#64748B',
        2: '#22C55E',
        3: '#f163c5',
        4: '#F59E0B',
        5: '#A855F7',
        6: '#EF4444',
        7: '#705849',
        8: '#2ccbbc',
    }

    totalPatients: number = 0;
    totalVaccinated: number = 0;
    totalUnvaccinated: number = 0;

    ngOnInit(): void {
        this.examinationsService.getAllCovidExaminations()
            .pipe(
                withLatestFrom(this.examinationsService.getVaccines()),
                tap(data => {
                    const [examinations, vaccines] = data;
                    let vaccineCounter: { [key: string]: number } = {}

                    const dataSets = vaccines.map((vaccine, index) => {
                        console.log(this.COLORS_BY_INDEX[index])
                        return {
                            label: vaccine.name,
                            backgroundColor: `${this.COLORS_BY_INDEX[index]}`,
                            data: examinations.reduce((acc, curr, ind, arr) => {
                                curr.Vaccinations.forEach(vac => {
                                    if (vaccine.name === vac.name) {
                                        const month = moment(curr.ExaminationDate.seconds * 1000).month();

                                        acc[month]++;
                                    }
                                })

                                return acc;
                            }, new Array(12).fill(0))
                        }
                    });

                    examinations.forEach(ex => {
                        ex.Vaccinations.forEach(vac => {
                            if (!vaccineCounter[vac.name]) vaccineCounter[vac.name] = 0;

                            vaccineCounter[vac.name]++;
                        })
                    })

                    this.countData.labels = Object.keys(vaccineCounter);
                    this.countData.datasets = [
                        {
                            data: Object.entries(vaccineCounter).map(entry => entry[1]),
                            backgroundColor: Object.entries(this.COLORS_BY_INDEX).map(entry => entry[1]),
                            hoverBackgroundColor: Object.entries(this.COLORS_BY_INDEX).map(entry => entry[1])
                        }
                    ]

                    this.vaccines.datasets = dataSets
                }),
                tap(data => {
                    const [examinations, vaccines] = data;

                    const patients = examinations.reduce((acc, curr) => {
                        if (!acc[curr.PatientId]) acc[curr.PatientId] = 0;

                        acc[curr.PatientId]++;

                        return acc;
                    }, {})

                    const vaccinatedPatients = examinations.reduce((acc, curr) => {
                        if (curr.Vaccinations.length) {
                            if (!acc[curr.PatientId]) acc[curr.PatientId] = 1;
                        }

                        return acc;
                    }, {})

                    for (const patientId in patients) {
                        this.totalPatients += patients[patientId]
                    }

                    for (const patientId in vaccinatedPatients) {
                        this.totalVaccinated += vaccinatedPatients[patientId]
                    }
                })
            )
            .subscribe()
    }

}
