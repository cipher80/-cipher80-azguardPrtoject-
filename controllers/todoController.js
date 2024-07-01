const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const createObjectCsvStringifier =
  require("csv-writer").createObjectCsvStringifier;
const todoService = require("../service/todoService");  

const upload = multer({dest:'uploads/'});

async function createTodoItem(req, res) {
  const { description, status } = req.body;
  try {
    if (!description) {
      return res.status(400).json({ message: "Description cannot be empty" });
    }
    const todo = await todoService.createTodoItem(description, status);
    res
      .status(201)
      .json({ message: "todo item created successfully", data: todo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateTodoItem(req, res) {
  try {
    const newData = req.body;
    const { id } = req.params;
    console.log("id = ", id);
    const item = await todoService.updateTodoItem(id, newData);
    res.status(201).json({ message: "Item updated successfully", data: item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteTodoItem(req, res) {
  const { id } = req.params;
  try {
    const deletedItem = await todoService.deleteTodoItem(id);
    res.status(201).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTodoItemById(req, res) {
  const { id } = req.params;
  try {
    const item = await todoService.getTodoItemById(id);
    res.status(200).json({ data: item });
  } catch (err) {
    const upload = multer({ dest: "uploads/" });
    res.status(500).json({ message: err.message });
  }
}

async function getAllTodoItems(req, res) {
  const { page = 1, pageSize = 5 } = req.query;
  try {
    const item = await todoService.getAllTodoItems(page, pageSize);
    res.status(201).json({ message: item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function filterTodoItemsByStatus(req, res) {
  const { status, page = 1, pageSize = 3 } = req.query;
  try {
    const filteredTodoItems = await todoService.filterTodoItemsByStatus(
      status,
      page,
      pageSize
    );
    res.json(filteredTodoItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function uploadTodoItems(req, res) {
  try {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ message: 'Error uploading file' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      if (!req.file.path) {
        console.error('File path is undefined');
        return res.status(500).json({ message: 'File path is undefined' });
      }
      console.log('File uploaded to:', req.file.path);


      const results = [];
      const stream = fs
        .createReadStream(req.file.path)
        .on('error', (err) => {
          console.error('Error reading CSV file:', err);
          return res.status(500).json({ message: 'Error reading CSV file' });
        })
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            const isValid = results.every(
              (item) => item.status === 'pending' || item.status === 'completed'
            );
            console.log('isValid =', isValid);
            if (!isValid) {
              if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
              }
              return res.status(400).json({ message: 'Invalid status value in CSV file' });
            }

            await todoService.uploadTodoItems(results);
            res
              .status(201)
              .json({ message: 'Todo items uploaded successfully' });
          } catch (error) {
            console.error('Error uploading todo items:', error);
            res.status(500).json({ message: 'Error uploading todo items' });
          } finally {
            if (fs.existsSync(req.file.path)) {
              fs.unlinkSync(req.file.path); 
            } else {
              console.error('File not found during cleanup:', req.file.path);
            }
          }
        });
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Error handling request' });
  }
}

async function downloadTodoList(req, res) {
  try {
    const todoItems = await todoService.downloadTodoList();

    if (todoItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No todo items found to download" });
    }

    const csvHeader = [
      { id: "id", title: "ID" },
      { id: "description", title: "Description" },
      { id: "status", title: "Status" },
    ];

    const csvStringifier = createObjectCsvStringifier({
      header: csvHeader,
    });

    const csvData =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(todoItems);

    const directoryPath = path.join(__dirname, "../downloads");
    const filePath = path.join(directoryPath, "todo_list.csv");

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log("Directory created:", directoryPath);
    }

    fs.writeFileSync(filePath, csvData);
    console.log("File saved successfully:", filePath);

    // Send success response to user
    res.status(200).json({ message: "Data downloaded successfully" });
  } catch (error) {
    console.error("Error downloading todo list:", error);
    res.status(500).json({ message: "Error downloading todo list" });
  }
}

module.exports = {
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
  getTodoItemById,
  getAllTodoItems,
  filterTodoItemsByStatus,
  uploadTodoItems,
  downloadTodoList,
};