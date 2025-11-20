// Таблица 2: Для УРКНД

function populateUrkndTable() {
    const tbody = document.getElementById('urknd-table-body');
    tbody.innerHTML = '';
    
    departments.forEach(dept => {
        // Заголовок подразделения
        const headerRow = document.createElement('tr');
        headerRow.className = 'department-header';
        headerRow.innerHTML = `<td colspan="5">${dept.name}</td>`;
        tbody.appendChild(headerRow);
        
        // Показатели подразделения
        dept.indicators.forEach(indicator => {
            const row = document.createElement('tr');
            
            const completionClass = getCompletionClass(indicator.completion);
            
            // Статус НГИН для показателя - ИСПРАВЛЕНО
            const nginStatusText = getNginIndicatorStatusText(indicator);
            const nginStatusClass = getNginIndicatorStatusClass(indicator);
            
            row.innerHTML = `
                <td><span class="indicator-code">${indicator.id}</span> ${indicator.name}</td>
                <td class="${completionClass}">${indicator.completion}%</td>
                <td class="${getStatusClass(indicator.managerStatus)}">
                    ${getStatusText(indicator.managerStatus)}
                </td>
                <td>
                    <select class="status-select" onchange="updateUrkndStatus(this, ${dept.id}, '${indicator.id}')">
                        <option value="pending" ${indicator.urkndStatus === 'pending' ? 'selected' : ''}>Не согласовано</option>
                        <option value="approved" ${indicator.urkndStatus === 'approved' ? 'selected' : ''}>Согласовано</option>
                        <option value="revision" ${indicator.urkndStatus === 'revision' ? 'selected' : ''}>Требует уточнения</option>
                    </select>
                </td>
                <td class="${nginStatusClass}">${nginStatusText}</td>
            `;
            tbody.appendChild(row);
        });
    });
}

function updateUrkndStatus(selectElement, deptId, indicatorId) {
    const status = selectElement.value;
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    indicator.urkndStatus = status;
    selectElement.className = `status-select ${getStatusClass(status)}`;
    
    refreshAllTables();
    checkCompletionStatus();
}