document.addEventListener('DOMContentLoaded', function() {
  var now = new Date(); 
  // change date for testing purposes 
  // var now = new Date('2025-03-03');

  // Insert date and time into HTML
  var datetime = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  document.getElementById("datetime").innerHTML = "Today's date: " + datetime;


    // assign active state to list item based on month and day 
  var month = now.getMonth()+1;
  var day = now.getDate();
  var activePeriod = '';

  // Set active period based on date
  if (month == 1 && day < 16) {
    activePeriod = 'Early January';
  } else if (month == 1 && day >= 16) {
    activePeriod = 'Late January';
  } else if (month == 2 && day < 16) {
    activePeriod = 'Early February';
  } else if (month == 3 && day >= 16) {
    activePeriod = 'Late February';
  } else if (month == 3 && day < 16) {
    activePeriod = 'Early March';
  } else if (month == 3 && day >= 16) {
    activePeriod = 'Late March';
  } else if (month == 4 && day < 16) {
    activePeriod = 'Early April';
  } else if (month == 4 && day >= 16) {
    activePeriod = 'Late April';
  } else if (month == 5 && day < 16) {
    activePeriod = 'Early May';
  } else if (month == 5 && day >= 16) {
    activePeriod = 'Late May';
  } else if (month == 6 && day < 16) {
    activePeriod = 'Early June';
  } else if (month == 6 && day >= 16) {
    activePeriod = 'Late June';
  } else if (month == 7 && day < 16) {
    activePeriod = 'Early July';
  } else if (month == 7 && day >= 16) {
    activePeriod = 'Late July';
  } else if (month == 8 && day < 16) {
    activePeriod = 'Early August';
  } else if (month == 8 && day >= 16) {
    activePeriod = 'Late August';
  } else if (month == 9 && day < 16) {
    activePeriod = 'Early September';
  } else if (month == 9 && day >= 16) {
    activePeriod = 'Late September';
  }else if (month == 10 && day < 16) {
    activePeriod = 'Early October';
  } else if (month == 10 && day >= 16) {
    activePeriod = 'Late October';
  } else if (month == 11 && day < 16) {
    activePeriod = 'Early November';
  } else if (month == 11 && day >= 16) {
    activePeriod = 'Late November';
  } else if (month == 12 && day < 16) {
    activePeriod = 'Early December';
  } else if (month == 12 && day >= 16) {
    activePeriod = 'Late December';
  } 

  // Set active class on the appropriate menu item
  options.forEach(option => {
    if (option.textContent.trim() === activePeriod) {
      // Remove active class from all options
      options.forEach(opt => {
        opt.classList.remove('active');
      });

      // Add active class to this option
      option.classList.add('active');

      // Update the selected text
      selected.textContent = activePeriod;
    }
  });
});

// menu stuff 
const select = document.querySelector('.select');
const caret = document.querySelector('.caret');
const menu = document.querySelector('.menu');
const options = document.querySelectorAll('.menu li');
const selected = document.querySelector('.selected'); 

select.addEventListener('click', () => {
  select.classList.toggle('select-clicked'); 
  caret.classList.toggle('caret-rotate'); 
  menu.classList.toggle('menu-open');
})

options.forEach(option => {
  option.addEventListener('click', () => {
    selected.innerText = option.innerText; 
    select.classList.remove('select-clicked'); 
    caret.classList.remove('caret-rotate'); 
    menu.classList.remove('menu-open');

  // remove active class from all option elements
  options.forEach(option => {
    option.classList.remove('active'); 
  });
  // add active class to clicked option element
  option.classList.add('active'); 
});
});

