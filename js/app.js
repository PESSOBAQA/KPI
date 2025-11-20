// Главный файл приложения - инициализация

function initializeApp() {
    console.log('Инициализация системы KPI...');
    refreshAllTables();
}

// Обработчик загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Глобальные функции для доступа из HTML
window.switchTab = switchTab;
window.updateManagerStatus = updateManagerStatus;
window.updateUrkndStatus = updateUrkndStatus;
window.updateNginDepartmentStatus = updateNginDepartmentStatus;
window.updateUrkndDepartmentStatus = updateUrkndDepartmentStatus;
window.updateNginComment = updateNginComment;
window.updateUrkndIndicatorComment = updateUrkndIndicatorComment;