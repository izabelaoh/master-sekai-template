import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

import * as moment from 'moment';
import { IDiagnose } from 'src/app/shared/models/examinations/examinations.model';
import { PatientService } from 'src/app/shared/services/patient/patient.service';

@Component({
    selector: 'app-covid-statistics',
    templateUrl: './covid-statistics.component.html',
    styleUrls: ['./covid-statistics.component.scss']
})
export class CovidStatisticsComponent implements OnInit {

    constructor(
        private examinationsService: ExaminationService,
        private patientService: PatientService
    ) { }

    covidVsGeneralOptions = {
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
    };

    covidVsGenralData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: []
    };

    covidDiagnosesData = {
        labels: [],
        datasets: []
    };

    covidDiagnosesOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    patientStatusOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            r: {
                grid: {
                    color: '#ebedef'
                }
            }
        }
    }

    patientStatusData = {
        labels: ['Active', 'Recovered', 'Deceased'],
        datasets: []
    }

    ngOnInit(): void {
        this.examinationsService.getAllExaminations()
            .pipe(
                first(),
                tap(examinations => {
                    // general examinations
                    const generalExaminations = examinations
                        .filter(ex => !ex.IsCovidExamination)
                        .reduce((acc, curr, ind, arr) => {
                            const month = moment(curr.ExaminationDate.seconds * 1000).month();

                            acc[month]++;

                            return acc;
                        }, new Array(12).fill(0));

                    // covid examinations
                    const covidExaminations = examinations
                        .filter(ex => ex.IsCovidExamination)
                        .reduce((acc, curr, ind, arr) => {
                            const month = moment(curr.ExaminationDate.seconds * 1000).month();

                            acc[month]++;

                            return acc;
                        }, new Array(12).fill(0));

                    this.covidVsGenralData.datasets = [{
                        label: 'COVID Examinations',
                        data: covidExaminations,
                        fill: false,
                        backgroundColor: '#00bb7e',
                        borderColor: '#00bb7e',
                        tension: .4
                    },
                    {
                        label: 'General Examinations',
                        data: generalExaminations,
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: .4
                    }]

                    // covid diagnoses chart
                    const covidDiagnoses: { [key: string]: number } = {};

                    examinations.filter(ex => ex.IsCovidExamination)
                        .forEach(ex => {
                            ex.Diagnoses.forEach(diagnose => {
                                // if (diagnose.name.toLowerCase().includes('covid')) {
                                if (!covidDiagnoses[diagnose.name]) {
                                    covidDiagnoses[diagnose.name] = 0;
                                }

                                covidDiagnoses[diagnose.name]++;
                                // }
                            })
                        })

                    this.covidDiagnosesData.labels = Object.keys(covidDiagnoses)
                    this.covidDiagnosesData.datasets = [
                        {
                            data: Object.entries(covidDiagnoses).map(entry => entry[1]),
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56"
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56"
                            ]
                        }
                    ]

                    console.log(covidDiagnoses)
                })
            )
            .subscribe()

        this.patientService.getAllPatients()
            .pipe(
                first(),
                tap(patients => {
                    const patientStatusData = patients
                        .reduce((acc, curr, ind, arr) => {
                            if (curr.IsCovidActive) acc[0]++;
                            if (curr.IsCovidRecovered) acc[1]++;
                            if (curr.IsCovidDeceased) acc[2]++;

                            return acc;
                        }, new Array(3).fill(0));

                    this.patientStatusData.datasets = [
                        {
                            label: `Statistics for ${patients.length} patients`,
                            backgroundColor: 'rgba(179,181,198,0.2)',
                            borderColor: 'rgba(179,181,198,1)',
                            pointBackgroundColor: 'rgba(179,181,198,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(179,181,198,1)',
                            data: patientStatusData
                        }
                    ]
                })
            )
            .subscribe()
    }

}
