// 等待 DOM 完全載入後再執行
document.addEventListener('DOMContentLoaded', function() {
  // 獲取 modal 元素
  const modal = document.getElementById('posterModal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalCloseBtn = modal.querySelector('.modal-close');
  const modalImage = modal.querySelector('.modal-image');

  // 獲取所有 poster 項目
  const posterItems = document.querySelectorAll('.poster-item');

  // 點擊 poster 項目時打開 modal
  posterItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const imageSrc = this.getAttribute('data-image');
      const imageAlt = this.getAttribute('data-title');
      
      modalImage.src = imageSrc;
      modalImage.alt = imageAlt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // 防止背景滾動
    });
  });

  // 點擊背景或 × 按鈕關閉 modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // 恢復背景滾動
  }

  modalOverlay.addEventListener('click', closeModal);
  modalCloseBtn.addEventListener('click', closeModal);

  // 按 ESC 鍵也可以關閉 modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
