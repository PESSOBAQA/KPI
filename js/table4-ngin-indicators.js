// Таблица 4: Для НГИН по отдельным показателям

function populateNginIndicatorsTable() {
    const tbody = document.getElementById('ngin-indicators-body');
    tbody.innerHTML = '';
    
    departments.forEach(dept => {
        // Заголовок подразделения
        const headerRow = document.createElement('tr');
        headerRow.className = 'department-header';
        headerRow.innerHTML = `<td colspan="7">${dept.name}</td>`;
        tbody.appendChild(headerRow);
        
        // Добавляем глобальный комментарий НГИН для подразделения
        if (dept.nginStatus === 'approved' && dept.nginGlobalComment) {
            const globalCommentRow = document.createElement('tr');
            globalCommentRow.innerHTML = `
                <td colspan="7" class="global-comment">
                    <strong>Общий комментарий НГИН:</strong> ${dept.nginGlobalComment}
                </td>
            `;
            tbody.appendChild(globalCommentRow);
        }
        
        // Показатели подразделения
        dept.indicators.forEach(indicator => {
            const row = document.createElement('tr');
            
            const completionClass = getCompletionClass(indicator.completion);
            
            // Определяем статус УРКНД
            const urkndStatusText = getStatusText(indicator.urkndStatus);
            const urkndStatusClass = getStatusClass(indicator.urkndStatus);
            
            row.innerHTML = `
                <td><span class="indicator-code">${indicator.id}</span> ${indicator.name}</td>
                <td class="${completionClass}">${indicator.completion}%</td>
                <td class="${getStatusClass(indicator.managerStatus)}">
                    ${getStatusText(indicator.managerStatus)}
                </td>
                <td class="${urkndStatusClass}">${urkndStatusText}</td>
                <td>
                    <textarea class="comment-input" placeholder="Комментарий НГИН..." 
                              onchange="updateNginComment(this, ${dept.id}, '${indicator.id}')">${indicator.nginComment || ''}</textarea>
                </td>
                <td>
                    <textarea class="comment-input" placeholder="Комментарий УРКНД..." 
                              onchange="updateUrkndComment(this, ${dept.id}, '${indicator.id}')">${indicator.urkndComment || ''}</textarea>
                </td>
                <td>
                    <select class="status-select" onchange="updateNginIndicatorStatus(this, ${dept.id}, '${indicator.id}')">
                        <option value="pending" ${indicator.nginStatus === 'pending' ? 'selected' : ''}>Не согласовано</option>
                        <option value="approved" ${indicator.nginStatus === 'approved' ? 'selected' : ''}>Согласовано</option>
                        <option value="revision" ${indicator.nginStatus === 'revision' ? 'selected' : ''}>Требует уточнения</option>
                    </select>
                </td>
            `;
            tbody.appendChild(row);
        });
    });
}

function updateNginIndicatorStatus(selectElement, deptId, indicatorId) {
    const status = selectElement.value;
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    indicator.nginStatus = status;
    selectElement.className = `status-select ${getStatusClass(status)}`;
    
    // Обновляем статус подразделения на основе всех показателей
    updateDepartmentNginStatus(deptId);
    
    refreshAllTables();
    checkCompletionStatus();
}

function updateNginComment(textarea, deptId, indicatorId) {
    const comment = textarea.value.trim();
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    indicator.nginComment = comment;
    
    // Если добавляется комментарий, автоматически ставим статус "Требует уточнения"
    if (comment && indicator.nginStatus !== 'approved') {
        indicator.nginStatus = 'revision';
    }
    
    // Обновляем статус подразделения
    updateDepartmentNginStatus(deptId);
    
    refreshAllTables();
    checkCompletionStatus();
}

function updateUrkndComment(textarea, deptId, indicatorId) {
    const comment = textarea.value.trim();
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    indicator.urkndComment = comment;
    
    checkCompletionStatus();
}