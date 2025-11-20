// Таблица 5: Исходные данные и справочные материалы

// Данные для исходных отчетов по каждому показателю
const sourceData = {
    "БУХ-001": {
        name: "Скорость закрытия отчетности",
        description: "Время подготовки и сдачи ежемесячной финансовой отчетности",
        target: "30 дней",
        reports: [
            {
                period: "Январь 2024",
                value: "45 дней",
                status: "metric-poor",
                details: "Задержка из-за обновления учетной системы",
                reference: ""
            },
            {
                period: "Февраль 2024", 
                value: "33 дня",
                status: "metric-average",
                details: "Частичная оптимизация процессов",
                reference: ""
            },
            {
                period: "Март 2024",
                value: "20 дней",
                status: "metric-good", 
                details: "Внедрение автоматизированных отчетов",
                reference: "https://cloud.dit.mos.ru/apps/ditdocuments/s/KjkZDXxx6rBybzo?fileId=283154114"
            }
        ]
    },
    "БУХ-002": {
        name: "Качество ведения учета", 
        description: "Процент ошибок в бухгалтерском учете",
        target: "Не более 2%",
        reports: [
            {
                period: "I квартал 2024",
                value: "3.2%",
                status: "metric-poor",
                details: "Обнаружены ошибки в учете ОС",
                reference: ""
            },
            {
                period: "II квартал 2024",
                value: "1.8%", 
                status: "metric-good",
                details: "Внедрение двойной проверки документов",
                reference: ""
            }
        ]
    },
    "БУХ-003": {
        name: "Своевременность налоговых платежей",
        description: "Соблюдение сроков уплаты налогов и сборов",
        target: "100% своевременность",
        reports: [
            {
                period: "2024 год",
                value: "100%",
                status: "metric-good",
                details: "Все платежи выполнены в установленные сроки",
                reference: ""
            }
        ]
    },
    "КАД-001": {
        name: "Срок подбора персонала",
        description: "Среднее время закрытия вакансии",
        target: "45 дней",
        reports: [
            {
                period: "Январь-Март 2024",
                value: "60 дней", 
                status: "metric-poor",
                details: "Длительный поиск IT-специалистов",
                reference: ""
            },
            {
                period: "Апрель-Июнь 2024",
                value: "35 дней",
                status: "metric-good",
                details: "Успешное использование хантинговых агентств",
                reference: ""
            }
        ]
    },
    "КАД-002": {
        name: "Качество адаптации новых сотрудников",
        description: "Процент сотрудников, успешно прошедших испытательный срок",
        target: "85%",
        reports: [
            {
                period: "2024 год",
                value: "92%",
                status: "metric-good",
                details: "Внедрение программы наставничества",
                reference: ""
            }
        ]
    },
    "КАД-003": {
        name: "Своевременность оформления документов",
        description: "Соблюдение сроков кадрового документооборота",
        target: "95%",
        reports: [
            {
                period: "I полугодие 2024",
                value: "97%",
                status: "metric-good", 
                details: "Автоматизация кадровых процессов",
                reference: ""
            }
        ]
    },
    "ИТ-001": {
        name: "Скорость решения заявок",
        description: "Среднее время решения IT-заявок пользователей",
        target: "4 часа",
        reports: [
            {
                period: "Январь 2024",
                value: "6.5 часов",
                status: "metric-poor",
                details: "Пиковая нагрузка после новогодних праздников",
                reference: ""
            },
            {
                period: "Февраль 2024",
                value: "3.2 часа",
                status: "metric-good",
                details: "Оптимизация процессов и увеличение штата",
                reference: ""
            },
            {
                period: "Март 2024",
                value: "2.8 часа",
                status: "metric-good",
                details: "Внедрение системы приоритетов",
                reference: ""
            }
        ]
    },
    "ИТ-002": {
        name: "Стабильность работы систем",
        description: "Время бесперебойной работы ключевых систем",
        target: "99.5%",
        reports: [
            {
                period: "2024 год",
                value: "99.8%",
                status: "metric-good",
                details: "Плановые работы проводились в нерабочее время",
                reference: ""
            }
        ]
    },
    "ИТ-003": {
        name: "Внедрение новых технологий",
        description: "Количество успешно внедренных IT-проектов",
        target: "5 проектов в квартал",
        reports: [
            {
                period: "I квартал 2024",
                value: "6 проектов",
                status: "metric-good",
                details: "CRM система, мобильное приложение, облачное хранилище",
                reference: ""
            },
            {
                period: "II квартал 2024", 
                value: "4 проекта",
                status: "metric-average",
                details: "BI система, система электронного документооборота",
                reference: ""
            }
        ]
    }
};

function switchIndicatorTab(indicatorId) {
    // Убрать активный класс со всех вкладок показателей
    const indicatorTabs = document.querySelectorAll('.indicator-tab');
    indicatorTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Активировать выбранную вкладку
    event.target.classList.add('active');
    
    // Показать данные выбранного показателя
    showIndicatorData(indicatorId);
}

function showIndicatorData(indicatorId) {
    const contentDiv = document.getElementById('source-data-content');
    const data = sourceData[indicatorId];
    
    if (!data) {
        contentDiv.innerHTML = '<p>Данные для выбранного показателя не найдены.</p>';
        return;
    }
    
    let html = `
        <div class="indicator-description">
            <h3>${data.name}</h3>
            <p><strong>Описание:</strong> ${data.description}</p>
            <p><strong>Целевое значение:</strong> ${data.target}</p>
        </div>
        
        <table class="source-data-table">
            <thead>
                <tr>
                    <th>Период</th>
                    <th>Значение</th>
                    <th>Детали</th>
                    <th>Справка</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.reports.forEach(report => {
        html += `
            <tr>
                <td>${report.period}</td>
                <td class="${report.status} metric-value">${report.value}</td>
                <td>${report.details}</td>
                <td>
                    ${report.reference ? 
                        `<a href="${report.reference}" target="_blank" class="external-link">https://cloud.dit.mos.ru/apps/ditdocuments/s/KjkZDXxx6rBybzo?fileId=283154114</a>` : 
                        '—'
                    }
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    contentDiv.innerHTML = html;
}

function populateSourceDataTable() {
    // Показать данные первого показателя по умолчанию
    showIndicatorData('БУХ-001');
}