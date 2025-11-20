// Данные для примера
const departments = [
    {
        id: 1,
        name: "Бухгалтерия",
        avgScore: 150,
        nginStatus: "pending",
        nginGlobalComment: "",
        urkndStatus: "",
        indicators: [
            { id: "БУХ-001", name: "Скорость закрытия отчетности", completion: 180, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" },
            { id: "БУХ-002", name: "Качество ведения учета", completion: 140, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" },
            { id: "БУХ-003", name: "Своевременность налоговых платежей", completion: 130, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" }
        ]
    },
    {
        id: 2,
        name: "Отдел кадров",
        avgScore: 125,
        nginStatus: "pending",
        nginGlobalComment: "",
        urkndStatus: "",
        indicators: [
            { id: "КАД-001", name: "Срок подбора персонала", completion: 110, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" },
            { id: "КАД-002", name: "Качество адаптации новых сотрудников", completion: 140, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" },
            { id: "КАД-003", name: "Своевременность оформления документов", completion: 125, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" }
        ]
    },
    {
        id: 3,
        name: "IT-отдел",
        avgScore: 170,
        nginStatus: "pending",
        nginGlobalComment: "",
        urkndStatus: "",
        indicators: [
            { id: "ИТ-001", name: "Скорость решения заявок", completion: 190, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" },
            { id: "ИТ-002", name: "Стабильность работы систем", completion: 160, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" },
            { id: "ИТ-003", name: "Внедрение новых технологий", completion: 160, managerStatus: "approved", urkndStatus: "pending", nginComment: "", urkndComment: "" }
        ]
    }
];