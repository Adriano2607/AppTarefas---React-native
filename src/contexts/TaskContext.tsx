import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../types/User";
import Toast from "react-native-root-toast";
import userJSON from "../utils/user.json"
import { dbExport as db } from "../utils/db";
import { Task } from "../types/Task";

type TaskContextProps = {
  getTasks:() => any;
  getTasksByCategory: (category: string) => any;
  getCompletedTasks: () => any;
  addTask: (taskInput: string, categoryValue: string) => any;
  removeTask: (id: number ) => any;
  doneTask: (id:number) => any;
  tasks: Task[];
  setTasks: (task: Task[]) => void ;
};

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskContext = createContext<TaskContextProps>(
  {} as TaskContextProps
);

export const TaskContextProvider = ({ children }: TaskProviderProps) => {

  const getTasks = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTasks(_array)
        }
      );
    });
  };

  const getTasksByCategory = (category: string) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0 AND category = ?;`,
        [category],
        (_, { rows: { _array } }) => {
            return _array
        }
      );
    });

    
  };

  const getCompletedTasks = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 1;`,
        [],
        (_, { rows: { _array } }) => {
          setTasks(_array)
        }
      );
    });
  };


  const addTask = (taskInput: string, categoryValue: string) => {
    if (taskInput !== "" && categoryValue) {
    
    db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO tasks (completed, title, category) VALUES (0, ?, ?);",
          [taskInput, categoryValue]
        );
        tx.executeSql(
          `SELECT * FROM tasks WHERE completed = 0;`,
          [],
          (_, { rows: { _array } }) => {
            return _array
          }
        );
      });
    }
  }

  const removeTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM tasks WHERE id = ?;", id);
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
          setTasks(_array)
        }
      );
    });
  };

  const doneTask = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE tasks SET completed = ? WHERE id = ? ;", [1, id]);
      tx.executeSql(
        `SELECT * FROM tasks WHERE completed = 0;`,
        [],
        (_, { rows: { _array } }) => {
            setTasks(_array)
        }
      );
    });
  };



  const [tasks, setTasks] = useState<Task[] | null>(null)

  return (
    <TaskContext.Provider
      value={{
        getTasks,
        getTasksByCategory,
        getCompletedTasks,
        addTask,
        removeTask,
        doneTask,
        tasks,
        setTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};