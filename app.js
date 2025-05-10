// Replace with your Firebase config later
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('taskInput').value;
  const assignee = document.getElementById('assigneeInput').value;
  const due = document.getElementById('dueInput').value;

  await db.collection('tasks').add({ title, assignee, due });
  taskForm.reset();
});

function loadTasks() {
  db.collection('tasks').onSnapshot(snapshot => {
    taskList.innerHTML = '';
    snapshot.forEach(doc => {
      const task = doc.data();
      const li = document.createElement('li');
      li.className = "p-2 border-b";
      li.innerHTML = `
        <strong>${task.title}</strong> - ${task.assignee}<br>
        <small>${new Date(task.due).toLocaleString()}</small>
        <button class="text-red-500 ml-2" onclick="deleteTask('${doc.id}')">Delete</button>
      `;
      taskList.appendChild(li);
    });
  });
}

async function deleteTask(id) {
  await db.collection('tasks').doc(id).delete();
}

loadTasks();
