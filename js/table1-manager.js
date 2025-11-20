// Таблица 1: Для руководителей подразделений

function populateManagerTable() {
    const tbody = document.getElementById('manager-table-body');
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
            const urkndStatusText = getStatusText(indicator.urkndStatus);
            const urkndStatusClass = getStatusClass(indicator.urkndStatus);
            
            let nginStatusText = '-';
            let nginStatusClass = 'pending';
            
            if (indicator.nginComment) {
                nginStatusText = 'Уточнение';
                nginStatusClass = 'revision';
            } else if (dept.nginStatus === 'approved') {
                nginStatusText = 'Согласовано';
                nginStatusClass = 'approved';
            }
            
            row.innerHTML = `
                <td><span class="indicator-code">${indicator.id}</span> ${indicator.name}</td>
                <td class="${completionClass}">${indicator.completion}%</td>
                <td>
                    <select class="status-select" onchange="updateManagerStatus(this, ${dept.id}, '${indicator.id}')">
                        <option value="approved" ${indicator.managerStatus === 'approved' ? 'selected' : ''}>Согласовано</option>
                        <option value="revision" ${indicator.managerStatus === 'revision' ? 'selected' : ''}>Требует уточнения</option>
                    </select>
                </td>
                <td class="${urkndStatusClass}">${urkndStatusText}</td>
                <td class="${nginStatusClass}">${nginStatusText}</td>
            `;
            tbody.appendChild(row);
        });
    });
}

function updateManagerStatus(selectElement, deptId, indicatorId) {
    const status = selectElement.value;
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    indicator.managerStatus = status;
    
    if (status === 'approved') {
        selectElement.className = 'status-select approved';
    } else if (status === 'revision') {
        selectElement.className = 'status-select revision';
    }
    
    checkCompletionStatus();
}