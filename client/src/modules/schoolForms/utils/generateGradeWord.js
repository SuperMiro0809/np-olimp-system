import { Paragraph, Document, Packer, AlignmentType, TextRun, Table, TableCell, TableRow, WidthType, PageOrientation, TextDirection } from "docx";
import { saveAs } from "file-saver";

const sumPoints = (grade) => {
    let sum = 0;
    let keys = [ 'acceptability', 'form', 'teachers', 'description', 'budget', 'students', 'declarations', 'letters', 'plan', 'schedule' ]

    keys.forEach((key) => {
        if(grade[key]) {
            sum += grade[key]
        }
    })

    return sum;
}

export default function generateGradeWord(groups, region) {
    const tHeaders = [
        '№ по ред на проекта',
        'Област',
        'Населено място',
        'Име на училището',
        'Учебен предмет и клас',
        'Допустимост',
        'Формуляр за кандидатстване',
        'Училищен екип',
        'Описание на проекта',
        'Бюджет',
        'Списък на учениците ( 3т. при 7 и 8 уч.; 2 т. – при 5 и 6 уч.; 1 т. – при 4 уч.)',
        'Декларации на родителите',
        'Мотивационни писма',
        'План за обучението',
        'График',
        'Общ брой точки',
        'Сума (за възнаграждения и  за административни разходи и за участие в олимпиади) лв.'
    ];
    const pointsValues = ['1', '1', '1', '6', '2', '3', '1', '1', '1', '1', '18'];
    const rows = groups.map((group, index) => (
        new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: (index + 1).toString(),
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: region,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: region,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: group.school_name,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.subject_name} - ${group.class}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.acceptability}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.form}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.teachers}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.description}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.budget}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.students}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.declarations}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.letters}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.plan}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `${group.grade.schedule}`,
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: sumPoints(group.grade).toString(),
                                size: 24
                            })
                        ]
                    })],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: (group.lessons * group.hourPrice + 30/100 * group.lessons * group.hourPrice).toFixed(2) + ' лв.',
                                size: 24
                            })
                        ]
                    })],
                }),
            ]
        })
    ));

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            orientation: PageOrientation.LANDSCAPE
                        },
                        margin: {
                            left: 1250,
                            right: 1250
                        }
                    }
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 100
                        },
                        children: [
                            new TextRun({
                                text: 'НАЦИОНАЛНА ПРОГРАМА „УЧЕНИЧЕСКИ ОЛИМПИАДИ И СЪСТЕЗАНИЯ” – 2022 г.',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 500
                        },
                        children: [
                            new TextRun({
                                text: 'Формуляр за оценяване на проекти – Модул „Осигуряване на обучение на талантливи ученици за участие в ученическите олимпиади“, 2022 г.',
                                italics: true,
                                size: 24
                            })
                        ]
                    }),
                    new Table({
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE
                        },
                        columnWidths: [3505, 5505],
                        rows: [
                            new TableRow({
                                height: {
                                    value: 3600,
                                },
                                children: tHeaders.map((header) => (
                                    new TableCell({
                                        width: {
                                            size: 3505,
                                            type: WidthType.DXA,
                                        },
                                        textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: header,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    })
                                ))
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.LEFT,
                                            children: [
                                                new TextRun({
                                                    text: 'Критерии',
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    }),
                                    ...[...Array(10).keys()].map((i) => (
                                        new TableCell({
                                            width: {
                                                size: 3505,
                                                type: WidthType.DXA,
                                            },
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: (i + 1).toString(),
                                                        size: 24,
                                                        italics: true
                                                    })
                                                ]
                                            })],
                                        })
                                    )),
                                    ...[...Array(2).keys()].map((i) => (
                                        new TableCell({
                                            width: {
                                                size: 3505,
                                                type: WidthType.DXA,
                                            },
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: '',
                                                        size: 24
                                                    })
                                                ]
                                            })],
                                        })
                                    ))
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        columnSpan: 5,
                                        width: {
                                            size: 3505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.LEFT,
                                            children: [
                                                new TextRun({
                                                    text: 'Максимален брой точки',
                                                    size: 24,
                                                    bold: true
                                                })
                                            ]
                                        })],
                                    }),
                                    ...pointsValues.map((el) => (
                                        new TableCell({
                                            width: {
                                                size: 3505,
                                                type: WidthType.DXA,
                                            },
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: el,
                                                        size: 24,
                                                        bold: true
                                                    })
                                                ]
                                            })],
                                        })
                                    )),
                                    new TableCell({
                                        width: {
                                            size: 3505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: '',
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    })
                                ]
                            }),
                            ...rows
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            before: 500
                        },
                        children: [
                            new TextRun({
                                text: 'Дата:…………….Председател: …………                       Членове на комисията:       1…………………        2…………………',
                                italics: true,
                                size: 24
                            })
                        ]
                    }),
                ]
            }
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `olimp_otsenyavane.docx`);
    });
}