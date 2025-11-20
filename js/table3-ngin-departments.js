// Таблица 3: Для НГИН по подразделениям

function populateNginDepartmentsTable() {
    const tbody = document.getElementById('ngin-departments-body');
    tbody.innerHTML = '';
    
    departments.forEach(dept => {
        const row = document.createElement('tr');
        
        const completionClass = getCompletionClass(dept.avgScore);
        
        // Определяем статус УРКНД для подразделения
        const allUrkndApproved = dept.indicators.every(ind => ind.urkndStatus === 'approved');
        const urkndStatusText = allUrkndApproved ? 'Согласовано' : 'Не согласовано';
        const urkndStatusClass = allUrkndApproved ? 'approved' : 'pending';
        
        // Определяем статус НГИН для подразделения
        const nginStatusText = getNginDepartmentStatusText(dept);
        const nginStatusClass = getNginDepartmentStatusClass(dept);
        
        row.innerHTML = `
            <td>${dept.name}</td>
            <td class="${completionClass}">${dept.avgScore}%</td>
            <td class="${urkndStatusClass}">${urkndStatusText}</td>
            <td class="${nginStatusClass}">
                ${dept.nginStatus === 'approved' ? 
                    'Согласовано' : 
                    `<select class="status-select" onchange="updateNginDepartmentStatus(this, ${dept.id})">
                        <option value="pending" ${dept.nginStatus === 'pending' ? 'selected' : ''}>Не согласовано</option>
                        <option value="approved" ${dept.nginStatus === 'approved' ? 'selected' : ''}>Согласовано</option>
                    </select>`
                }
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateNginDepartmentStatus(selectElement, deptId) {
    const status = selectElement.value;
    const dept = departments.find(d => d.id === deptId);
    
    if (status === 'approved') {
        // Принудительное согласование всех показателей подразделения
        dept.nginStatus = 'approved';
        dept.indicators.forEach(indicator => {
            indicator.nginStatus = 'approved';
            if (!indicator.nginComment) {
                indicator.nginComment = 'Показатель согласован';
            }
        });
        dept.nginGlobalComment = 'Все показатели подразделения согласованы';
    } else {
        dept.nginStatus = 'pending';
        dept.nginGlobalComment = '';
    }
    
    refreshAllTables();
    checkCompletionStatus();
}