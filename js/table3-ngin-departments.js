// Таблица 3: Для НГИН по подразделениям

function populateNginDepartmentsTable() {
    const tbody = document.getElementById('ngin-departments-body');
    tbody.innerHTML = '';
    
    departments.forEach(dept => {
        const row = document.createElement('tr');
        
        const completionClass = getCompletionClass(dept.avgScore);
        
        // Проверяем, есть ли комментарии НГИН к показателям подразделения
        const indicatorsWithComments = dept.indicators.filter(ind => ind.nginComment);
        const hasNginComments = indicatorsWithComments.length > 0;
        
        // Определяем статус УРКНД для подразделения
        const allUrkndApproved = dept.indicators.every(ind => ind.urkndStatus === 'approved');
        const urkndStatusText = allUrkndApproved ? 'Согласовано' : 'Не согласовано';
        const urkndStatusClass = allUrkndApproved ? 'approved' : 'pending';
        
        // Определяем статус НГИН и комментарий УРКНД
        let nginStatusText = '';
        let nginStatusClass = '';
        let urkndCommentText = '-';
        let urkndCommentClass = 'pending';
        
        if (hasNginComments) {
            // Автоматический статус при наличии комментариев
            nginStatusText = 'Уточнение показателя';
            nginStatusClass = 'revision auto-status';
            
            // Добавляем коды показателей с комментариями
            if (indicatorsWithComments.length > 0) {
                nginStatusText += ' {';
                nginStatusText += indicatorsWithComments.map(ind => ind.id).join(', ');
                nginStatusText += '}';
            }
            
            // Проверяем комментарий УРКНД
            if (dept.urkndStatus) {
                urkndCommentText = dept.urkndStatus;
                urkndCommentClass = 'urknd-resolved';
            }
        } else {
            // Ручной выбор статуса НГИН
            nginStatusText = dept.nginStatus === 'approved' ? 'Согласовано' : 'Не согласовано';
            nginStatusClass = dept.nginStatus === 'approved' ? 'approved' : 'pending';
        }
        
        row.innerHTML = `
            <td>${dept.name}</td>
            <td class="${completionClass}">${dept.avgScore}%</td>
            <td class="${urkndStatusClass}">${urkndStatusText}</td>
            <td class="${nginStatusClass}">
                ${hasNginComments ? 
                    nginStatusText : 
                    `<select class="status-select" onchange="updateNginDepartmentStatus(this, ${dept.id})">
                        <option value="pending" ${dept.nginStatus === 'pending' ? 'selected' : ''}>Не согласовано</option>
                        <option value="approved" ${dept.nginStatus === 'approved' ? 'selected' : ''}>Согласовано</option>
                    </select>`
                }
            </td>
            <td>
                ${hasNginComments ? 
                    `<textarea class="comment-input" placeholder="Комментарий УРКНД..." 
                              onchange="updateUrkndDepartmentStatus(this, ${dept.id})">${dept.urkndStatus || ''}</textarea>` : 
                    '-'}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateNginDepartmentStatus(selectElement, deptId) {
    const status = selectElement.value;
    const dept = departments.find(d => d.id === deptId);
    
    // Обновляем статус НГИН для подразделения
    dept.nginStatus = status;
    
    // Если НГИН выбрал "Согласовано", удаляем все комментарии к показателям этого подразделения
    if (status === 'approved') {
        dept.indicators.forEach(indicator => {
            indicator.nginComment = '';
        });
        dept.nginGlobalComment = 'Все показатели подразделения согласованы';
    } else {
        dept.nginGlobalComment = '';
    }
    
    refreshAllTables();
    checkCompletionStatus();
}

function updateUrkndDepartmentStatus(textarea, deptId) {
    const comment = textarea.value.trim();
    const dept = departments.find(d => d.id === deptId);
    
    // Обновляем комментарий УРКНД для подразделения
    dept.urkndStatus = comment;
    
    checkCompletionStatus();
}