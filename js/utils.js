// Утилиты для работы с DOM и данными

function getCompletionClass(completion) {
    if (completion >= 160) return 'completion-high';
    if (completion < 120) return 'completion-low';
    return 'completion-medium';
}

function getStatusClass(status) {
    switch(status) {
        case 'approved': return 'approved';
        case 'revision': return 'revision';
        default: return 'pending';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'approved': return 'Согласовано';
        case 'revision': return 'Требует уточнения';
        default: return 'Не согласовано';
    }
}

function switchTab(tabId) {
    // Скрыть все вкладки
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Убрать активный класс со всех табов
    const tabs = document.getElementsByClassName('tab');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    
    // Показать выбранную вкладку
    document.getElementById(tabId).classList.add('active');
    
    // Активировать соответствующий таб
    event.currentTarget.classList.add('active');
}

function checkCompletionStatus() {
    const allManagersApproved = departments.every(dept => 
        dept.indicators.every(ind => ind.managerStatus === 'approved')
    );
    
    const allUrkndApproved = departments.every(dept => 
        dept.indicators.every(ind => ind.urkndStatus === 'approved')
    );
    
    const allNginApproved = departments.every(dept => 
        dept.nginStatus === 'approved' && dept.indicators.every(ind => !ind.nginComment)
    );
    
    if (allManagersApproved && allUrkndApproved && allNginApproved) {
        alert("Процесс утверждения KPI завершен! Все подразделения согласованы.");
    }
}

function refreshAllTables() {
    populateManagerTable();
    populateUrkndTable();
    populateNginDepartmentsTable();
    populateNginIndicatorsTable();
}