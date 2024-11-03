const reminderForm = document.getElementById("reminder-form");
const reminderTitleInput = document.getElementById("reminder-title");
const reminderTimeInput = document.getElementById("reminder-time");
const reminderList = document.getElementById("reminder-list");

let reminders = [];

function renderReminders() {
    reminderList.innerHTML = "";

    reminders.forEach((reminder, index) => {
        const reminderItem = document.createElement("div");
        reminderItem.className = "reminder-item";
        
        reminderItem.innerHTML = `
            <span>${reminder.title} - ${new Date(reminder.time).toLocaleString()}</span>
            <div>
                <button class="edit-btn" onclick="editReminder(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
            </div>
        `;

        reminderList.appendChild(reminderItem);
    });
}

function addReminder(title, time) {
    const reminder = {
        title,
        time: new Date(time).getTime(),
        timeoutId: null
    };

    const delay = reminder.time - Date.now();
    if (delay > 0) {
        reminder.timeoutId = setTimeout(() => {
            alert(`Reminder: ${reminder.title}`);
            deleteReminder(reminders.indexOf(reminder));
        }, delay);
    }

    reminders.push(reminder);
    renderReminders();
}

function editReminder(index) {
    const reminder = reminders[index];
    reminderTitleInput.value = reminder.title;
    reminderTimeInput.value = new Date(reminder.time).toISOString().slice(0, 16);
    
    deleteReminder(index);  // Delete the old reminder before editing
}

function deleteReminder(index) {
    const reminder = reminders[index];
    if (reminder.timeoutId) {
        clearTimeout(reminder.timeoutId);
    }
    
    reminders.splice(index, 1);
    renderReminders();
}

reminderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const title = reminderTitleInput.value;
    const time = reminderTimeInput.value;
    
    if (title && time) {
        addReminder(title, time);
        reminderTitleInput.value = "";
        reminderTimeInput.value = "";
    }
});

// Initial render
renderReminders();