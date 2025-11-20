// Главный файл приложения - инициализация

function initializeApp() {
    console.log('Инициализация системы KPI...');
    refreshAllTables();
    populateSourceDataTable();
}

// Обработчик загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Глобальные функции для доступа из HTML
window.switchTab = switchTab;
window.switchIndicatorTab = switchIndicatorTab;
window.updateManagerStatus = updateManagerStatus;
window.updateUrkndStatus = updateUrkndStatus;
window.updateNginDepartmentStatus = updateNginDepartmentStatus;
window.updateNginIndicatorStatus = updateNginIndicatorStatus;
window.updateNginComment = updateNginComment;
window.updateUrkndComment = updateUrkndComment;