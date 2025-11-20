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

// Функция для получения текста статуса НГИН для ПОДРАЗДЕЛЕНИЯ (Таблица 3)
function getNginDepartmentStatusText(dept) {
    if (dept.nginStatus === 'approved') {
        return 'Согласовано';
    }
    
    // Проверяем есть ли показатели с комментариями но без согласования
    const indicatorsWithComments = dept.indicators.filter(ind => 
        ind.nginComment && ind.nginStatus !== 'approved'
    );
    
    if (indicatorsWithComments.length > 0) {
        return `Уточнение показателя {${indicatorsWithComments.map(ind => ind.id).join(', ')}}`;
    }
    
    return 'Не согласовано';
}

function getNginDepartmentStatusClass(dept) {
    if (dept.nginStatus === 'approved') {
        return 'approved';
    }
    
    // Проверяем есть ли показатели с комментариями но без согласования
    const indicatorsWithComments = dept.indicators.filter(ind => 
        ind.nginComment && ind.nginStatus !== 'approved'
    );
    
    if (indicatorsWithComments.length > 0) {
        return 'revision auto-status';
    }
    
    return 'pending';
}

// Функция для получения текста статуса НГИН для ПОКАЗАТЕЛЯ (Таблицы 1 и 2)
function getNginIndicatorStatusText(indicator) {
    if (indicator.nginStatus === 'approved') {
        // Если согласовано, показываем статус + комментарий если есть
        return indicator.nginComment ? `Согласовано. ${indicator.nginComment}` : 'Согласовано';
    }
    
    if (indicator.nginStatus === 'revision' && indicator.nginComment) {
        // Если требует уточнения и есть комментарий
        return `Уточнение показателя. ${indicator.nginComment}`;
    }
    
    if (indicator.nginComment) {
        // Если есть комментарий но статус не установлен
        return `Уточнение показателя. ${indicator.nginComment}`;
    }
    
    return getStatusText(indicator.nginStatus);
}

function getNginIndicatorStatusClass(indicator) {
    if (indicator.nginStatus === 'approved') {
        return 'approved';
    }
    
    if (indicator.nginStatus === 'revision' || indicator.nginComment) {
        return 'revision';
    }
    
    return 'pending';
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
        dept.nginStatus === 'approved' && dept.indicators.every(ind => ind.nginStatus === 'approved')
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

function refreshAllTables() {
    populateManagerTable();
    populateUrkndTable();
    populateNginDepartmentsTable();
    populateNginIndicatorsTable();
    // Таблица 5 не обновляется автоматически, так как это справочные данные
}


// Функция для обновления статуса подразделения на основе показателей
function updateDepartmentNginStatus(deptId) {
    const dept = departments.find(d => d.id === deptId);
    
    // Проверяем все ли показатели согласованы
    const allIndicatorsApproved = dept.indicators.every(ind => ind.nginStatus === 'approved');
    
    if (allIndicatorsApproved) {
        dept.nginStatus = 'approved';
        dept.nginGlobalComment = 'Все показатели подразделения согласованы';
    } else {
        dept.nginStatus = 'pending';
        dept.nginGlobalComment = '';
    }
}