// Таблица 4: Для НГИН по отдельным показателям

function populateNginIndicatorsTable() {
    const tbody = document.getElementById('ngin-indicators-body');
    tbody.innerHTML = '';
    
    departments.forEach(dept => {
        // Заголовок подразделения
        const headerRow = document.createElement('tr');
        headerRow.className = 'department-header';
        headerRow.innerHTML = `<td colspan="6">${dept.name}</td>`;
        tbody.appendChild(headerRow);
        
        // Добавляем глобальный комментарий НГИН для подразделения
        if (dept.nginStatus === 'approved' && !dept.indicators.some(ind => ind.nginComment)) {
            const globalCommentRow = document.createElement('tr');
            globalCommentRow.innerHTML = `
                <td colspan="6" class="global-comment">
                    <strong>Общий комментарий НГИН:</strong> Все показатели подразделения согласованы
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
            
            // Определяем комментарий УРКНД
            let urkndCommentText = '-';
            let urkndCommentClass = 'pending';
            
            if (indicator.urkndComment) {
                urkndCommentText = indicator.urkndComment;
                urkndCommentClass = 'urknd-resolved';
            }
            
            // Определяем текст комментария НГИН
            let nginCommentText = indicator.nginComment;
            if (!nginCommentText && dept.nginStatus === 'approved') {
                nginCommentText = 'Показатель согласован';
            }
            
            row.innerHTML = `
                <td><span class="indicator-code">${indicator.id}</span> ${indicator.name}</td>
                <td class="${completionClass}">${indicator.completion}%</td>
                <td class="approved">Согласовано</td>
                <td class="${urkndStatusClass}">${urkndStatusText}</td>
                <td>
                    <textarea class="comment-input" placeholder="Оставить комментарий..." 
                              onchange="updateNginComment(this, ${dept.id}, '${indicator.id}')">${nginCommentText || ''}</textarea>
                </td>
                <td>
                    ${indicator.nginComment || dept.nginStatus === 'approved' ? 
                        `<textarea class="comment-input" placeholder="Комментарий УРКНД..." 
                                  onchange="updateUrkndIndicatorComment(this, ${dept.id}, '${indicator.id}')">${indicator.urkndComment || ''}</textarea>` : 
                        '-'}
                </td>
            `;
            tbody.appendChild(row);
        });
    });
}

function updateNginComment(textarea, deptId, indicatorId) {
    const comment = textarea.value.trim();
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    // Обновляем комментарий
    indicator.nginComment = comment;
    
    // Если добавляется комментарий, сбрасываем статус согласования подразделения
    if (comment && dept.nginStatus === 'approved') {
        dept.nginStatus = 'pending';
        dept.nginGlobalComment = '';
    }
    
    refreshAllTables();
    checkCompletionStatus();
}

function updateUrkndIndicatorComment(textarea, deptId, indicatorId) {
    const comment = textarea.value.trim();
    const dept = departments.find(d => d.id === deptId);
    const indicator = dept.indicators.find(ind => ind.id === indicatorId);
    
    // Обновляем комментарий УРКНД для показателя
    indicator.urkndComment = comment;
    
    checkCompletionStatus();
}