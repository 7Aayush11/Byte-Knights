class EnhancedCardSlider {
    constructor() {
      this.init();
      this.bindEvents();
      this.startAutoplay();
    }
  
    init() {
      this.sliderWrapper = document.querySelector('.slider-wrapper');
      this.cardContainer = document.querySelector('.card-container');
      this.cards = document.querySelectorAll('.card');
      this.nextBtn = document.querySelector('.slider-button-next');
      this.prevBtn = document.querySelector('.slider-button-prev');
      this.pagination = document.querySelector('.slider-pagination');
  
      this.currentIndex = 0;
      this.totalCards = this.cards.length;
      this.cardWidth = this.cards[0].offsetWidth;
      this.visibleCards = 3; // Number of visible cards
      
      // Initialize first three cards as visible
      this.updateVisibleCards();
      this.createPagination();
      this.updateSlider();
    }
  
    updateVisibleCards() {
      // Remove active class from all cards
      this.cards.forEach(card => card.classList.remove('active'));
      
      // Add active class to currently visible cards
      for(let i = 0; i < this.visibleCards; i++) {
        const index = (this.currentIndex + i) % this.totalCards;
        this.cards[index].classList.add('active');
      }
    }
  
    updateSlider() {
      const translateX = -this.currentIndex * (this.cardWidth + 24); // 24px for gap
      this.cardContainer.style.transform = `translateX(${translateX}px)`;
      
      // Update visible cards
      this.updateVisibleCards();
      
      // Update pagination
      const paginationBullets = document.querySelectorAll('.pagination-bullet');
      paginationBullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === Math.floor(this.currentIndex / this.visibleCards));
      });
    }
  
    next() {
      if (this.currentIndex < this.totalCards - this.visibleCards) {
        this.currentIndex++;
        this.updateSlider();
      } else {
        // Smooth return to first slide
        this.currentIndex = 0;
        this.updateSlider();
      }
    }
  
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateSlider();
      } else {
        // Smooth jump to last slide
        this.currentIndex = this.totalCards - this.visibleCards;
        this.updateSlider();
      }
    }
  
    createPagination() {
      const numberOfPages = Math.ceil(this.totalCards / this.visibleCards);
      this.pagination.innerHTML = '';
      
      for (let i = 0; i < numberOfPages; i++) {
        const bullet = document.createElement('span');
        bullet.classList.add('pagination-bullet');
        if (i === 0) bullet.classList.add('active');
        bullet.setAttribute('data-index', i);
        this.pagination.appendChild(bullet);
      }
    }
  
    bindEvents() {
      this.nextBtn.addEventListener('click', () => this.next());
      this.prevBtn.addEventListener('click', () => this.prev());
      
      // Add touch support
      let touchStartX = 0;
      let touchEndX = 0;
      
      this.sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
      });
      
      this.sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
          this.next();
        } else if (touchEndX - touchStartX > 50) {
          this.prev();
        }
      });
      
      // Add pagination click handlers
      document.querySelectorAll('.pagination-bullet').forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
          this.currentIndex = index * this.visibleCards;
          this.updateSlider();
        });
      });
    }
  }
  
  // Initialize the slider
  document.addEventListener('DOMContentLoaded', () => {
    new EnhancedCardSlider();
  });
  
  function openChatBox() {
    const chatboxContainer = document.getElementById('chatboxContainer');
    chatboxContainer.classList.remove('hidden');
  }
  
  // Optionally, you can add a close button to hide the chatbox
  function closeChatBox() {
    const chatboxContainer = document.getElementById('chatboxContainer');
    chatboxContainer.classList.add('hidden');
  }
  
  // DOM Elements
  const chatBox = document.getElementById('chatBox');
  const messageInput = document.getElementById('messageInput');
  const sendMessageBtn = document.getElementById('sendMessageBtn');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const emojiToggle = document.getElementById('emojiToggle');
  const emojiList = document.getElementById('emojiList');
  const imageUpload = document.getElementById('imageUpload');
  const typingIndicator = document.getElementById('typingIndicator');
  
  // Event Listeners
  sendMessageBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', handleTyping);
  clearChatBtn.addEventListener('click', clearChat);
  darkModeToggle.addEventListener('change', toggleDarkMode);
  emojiToggle.addEventListener('click', toggleEmojiList);
  emojiList.addEventListener('click', insertEmoji);
  imageUpload.addEventListener('change', handleImageUpload);
  
  let typingTimeout;
  
  // Functions
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
      addMessageToChat(message, 'self');
      messageInput.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
      
      // Simulate a response after a short delay
      simulateTyping();
      setTimeout(() => {
        const responses = [
          "That's interesting! Tell me more.",
          "I see. Have you considered this from another perspective?",
          "Great point! How does this relate to your previous experiences?",
          "I understand. What do you think the next steps should be?",
          "That's a unique viewpoint. Can you elaborate on that?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessageToChat(randomResponse, 'other');
        hideTypingIndicator();
      }, 2000);
    }
  }
  
  // ... (other functions remain the same) ...
  
  function clearChat() {
    if (confirm('Are you sure you want to clear the chat?')) {
      chatBox.innerHTML = '';
      localStorage.removeItem('chatHistory');
    }
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.classList.add('transitioning');
    setTimeout(() => {
      chatWindow.classList.remove('transitioning');
    }, 300)
  }
  
  function toggleEmojiList() {
    emojiList.classList.toggle('hidden');
  }
  
  function insertEmoji(e) {
    if (e.target.textContent.trim()) {
      messageInput.value += e.target.textContent;
      messageInput.focus();
      emojiList.classList.add('hidden');
    }
  }
  
  // ... (other functions remain the same) ...
  
  // Load chat history and dark mode preference when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadChatHistory();
    
    // Load dark mode preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
  });
  
  
  function addMessageToChat(message, sender, isImage = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    
    if (isImage) {
      const img = document.createElement('img');
      img.src = message;
      messageDiv.appendChild(img);
    } else {
      messageDiv.textContent = message;
    }
    
    // Add edit and delete buttons for 'self' messages
    if (sender === 'self') {
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('message-actions');
      
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.addEventListener('click', () => editMessage(messageDiv));
      
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
      deleteBtn.addEventListener('click', () => deleteMessage(messageDiv));
      
      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);
      messageDiv.appendChild(actionsDiv);
    }
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  
  
  setTimeout(() => {
      messageDiv.classList.add('pulse');
      setTimeout(() => {
        messageDiv.classList.remove('pulse');
      }, 300);
    }, 300);
  }
  
  function handleTyping(e) {
    if (e.key === 'Enter') {
      sendMessage();
    } else {
      // Show typing indicator for the other party
      showTypingIndicator();
      
      // Clear previous timeout and set a new one
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(hideTypingIndicator, 3000);
    }
  }
  
  function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
  }
  
  function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
  }
  
  function simulateTyping() {
    showTypingIndicator();
    setTimeout(hideTypingIndicator, 2000);
  }
  
  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        addMessageToChat(event.target.result, 'self', true);
      };
      reader.readAsDataURL(file);
    }
  }
  
  function editMessage(messageDiv) {
    const currentText = messageDiv.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        messageDiv.textContent = input.value;
        messageDiv.appendChild(messageDiv.querySelector('.message-actions'));
      }
    });
    
    messageDiv.textContent = '';
    messageDiv.appendChild(input);
    input.focus();
  }
  
  function deleteMessage(messageDiv) {
    if (confirm('Are you sure you want to delete this message?')) {
      messageDiv.remove();
    }
  }
  
  // ... (previous functions for clearChat, toggleDarkMode, toggleEmojiList, insertEmoji remain the same) ...
  
  // Save and load chat history
  function saveChatHistory() {
    const messages = Array.from(chatBox.children).map(msg => ({
      text: msg.querySelector('img') ? msg.querySelector('img').src : msg.textContent,
      sender: msg.classList.contains('self') ? 'self' : 'other',
      isImage: !!msg.querySelector('img')
    }));
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }
  
  function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    history.forEach(msg => addMessageToChat(msg.text, msg.sender, msg.isImage));
  }
  
  // Save chat history before unloading the page
  window.addEventListener('beforeunload', saveChatHistory);
  
  // Load chat history when the page loads
  document.addEventListener('DOMContentLoaded', loadChatHistory);
  
  
  function toggleEmojiList() {
      emojiList.classList.toggle('hidden');
      emojiList.classList.toggle('show');
    }
    
    function insertEmoji(e) {
      const clickedEmoji = e.target.textContent.trim();
      if (clickedEmoji && clickedEmoji.length === 2) {  // Most emojis are 2 characters long
        messageInput.value += clickedEmoji;
        messageInput.focus();
        emojiList.classList.add('hidden');
      }
    }
  
    function initializeEmojiList() {
      const emojis = ['😊', '😂', '🤔', '👍', '👎', '❤️', '🎉', '👋'];
      emojiList.innerHTML = '';
      emojis.forEach(emoji => {
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emoji;
        emojiSpan.style.cursor = 'pointer';
        emojiSpan.style.padding = '5px';
        emojiList.appendChild(emojiSpan);
      });
    }
    
    // Load chat history and dark mode preference when the page loads
    document.addEventListener('DOMContentLoaded', () => {
      loadChatHistory();
      
      // Load dark mode preference
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      }
    
      // Initialize emoji list
      initializeEmojiList();
    });
  
  
    function closeChatBox() {
      const chatboxContainer = document.getElementById('chatboxContainer');
      chatboxContainer.classList.add('hidden');
    }
    